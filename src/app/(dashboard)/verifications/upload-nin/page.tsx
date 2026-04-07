"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  Download,
  Play,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import * as XLSX from "xlsx";
import { useNinByPhone } from "@/hooks/useNINByPhone";
import { formatDate } from "@/lib/utils";
import { NinDetailsModal } from "@/components/verifications/nin-details-modal";
import type { BulkRetrievalRow } from "@/types/bulk-nin.types";

export default function BulkNINRetrievalPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<BulkRetrievalRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ processed: 0, total: 0 });
  const [selectedRow, setSelectedRow] = useState<BulkRetrievalRow | null>(null);
  const { mutateAsync: lookupNIN } = useNinByPhone();

  // Helper: compare row data with API response
  const isMatch = (row: BulkRetrievalRow, apiData: any) => {
    const rowNameMatch =
      row.firstName.toLowerCase() === apiData.first_name?.toLowerCase() &&
      row.lastName.toLowerCase() === apiData.last_name?.toLowerCase();
    const rowNameWithMiddle =
      row.middleName &&
      row.firstName.toLowerCase() === apiData.first_name?.toLowerCase() &&
      row.middleName.toLowerCase() === apiData.middle_name?.toLowerCase() &&
      row.lastName.toLowerCase() === apiData.last_name?.toLowerCase();
    const dobMatch = row.dateOfBirth === apiData.date_of_birth;
    const genderMatch =
      row.gender.toLowerCase() === apiData.gender?.toLowerCase();
    const phoneMatch = row.phone === apiData.phone_number;
    return (
      (rowNameMatch || rowNameWithMiddle) &&
      dobMatch &&
      genderMatch &&
      phoneMatch
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(null);
    setRows([]);
    setProgress({ processed: 0, total: 0 });

    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (!(data instanceof ArrayBuffer)) return;
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet) as any[];
      if (json.length === 0) {
        alert("File is empty");
        return;
      }
      const parsedRows: BulkRetrievalRow[] = json.map((row, idx) => ({
        id: crypto.randomUUID(),
        rowNumber: idx + 1,
        lastName: row["Last Name"] || row["last_name"] || "",
        firstName: row["First Name"] || row["first_name"] || "",
        middleName: row["Middle Name"] || row["middle_name"] || "",
        dateOfBirth: (() => {
          let val = row["Date of Birth"] ?? row["dob"] ?? "";
          if (typeof val === "number" && !isNaN(val)) {
            // Excel serial date to YYYY-MM-DD
            const date = new Date((val - 25569) * 86400000);
            if (!isNaN(date.getTime())) {
              val = date.toISOString().slice(0, 10);
            }
          }
          return String(val);
        })(),
        gender: row["Gender"] || row["gender"] || "",
        phone: (() => {
          let val = row["Phone"] ?? row["phone"] ?? "";
          if (typeof val === "number") {
            val = val.toString();
            if (val.length === 10) val = "0" + val;
          }
          return String(val);
        })(),
        matchStatus: "pending",
      }));
      setRows(parsedRows);
      setProgress({ processed: 0, total: parsedRows.length });
    };
    reader.readAsArrayBuffer(uploadedFile);

    e.target.value = "";
  };

  const startProcessing = async () => {
    setIsProcessing(true);
    const updatedRows = [...rows];
    for (let i = 0; i < updatedRows.length; i++) {
      const row = updatedRows[i];
      row.matchStatus = "processing";
      setRows([...updatedRows]);
      try {
        const result = await lookupNIN(row.phone);
        if (result.success && result.data) {
          const apiData = result.data;
          const match = isMatch(row, apiData);
          row.matchedDetails = {
            firstName: apiData.first_name,
            lastName: apiData.last_name,
            middleName: apiData.middle_name,
            dateOfBirth: apiData.date_of_birth,
            gender: apiData.gender,
            phone: apiData.phone_number,
            photo: apiData.photo,
            nin: apiData.nin,
          };
          if (match) {
            row.nin = apiData.nin;
            row.matchStatus = "matched";
          } else {
            row.matchStatus = "no_match";
          }
        } else if (result.service_down) {
          row.matchStatus = "not_found";
          row.matchedDetails = undefined;
        } else {
          row.matchStatus = "not_found";
        }
      } catch {
        row.matchStatus = "not_found";
      }
      row.processedAt = new Date();
      setRows([...updatedRows]);
      setProgress({ processed: i + 1, total: updatedRows.length });
    }
    setIsProcessing(false);
  };

  const exportResults = () => {
    const exportData = rows.map((row) => ({
      Row: row.rowNumber,
      "Last Name": row.lastName,
      "First Name": row.firstName,
      "Middle Name": row.middleName || "",
      DOB: row.dateOfBirth,
      Gender: row.gender,
      Phone: row.phone,
      NIN: row.nin || "",
      "Match Status":
        row.matchStatus === "matched"
          ? "Matched"
          : row.matchStatus === "no_match"
            ? "No Match"
            : "Not Found",
      "Processed At": row.processedAt ? formatDate(row.processedAt) : "",
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NIN Retrieval Results");
    XLSX.writeFile(
      wb,
      `nin_retrieval_${new Date().toISOString().slice(0, 19)}.xlsx`,
    );
  };

  const stats = {
    total: rows.length,
    matched: rows.filter((r) => r.matchStatus === "matched").length,
    noMatch: rows.filter((r) => r.matchStatus === "no_match").length,
    notFound: rows.filter((r) => r.matchStatus === "not_found").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Bulk NIN Retrieval</h1>
          <p className="text-gray-600">
            Upload an Excel file with personal details to retrieve NINs via
            phone number.
          </p>
        </div>
        {rows.length > 0 && (
          <Button onClick={exportResults} variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Results
          </Button>
        )}
      </div>

      {/* File upload */}
      <Card className="p-6 border-dashed border-2">
        <div className="flex flex-col items-center gap-4">
          <FileSpreadsheet className="w-12 h-12 text-teal-600" />
          <p className="text-sm text-gray-600">
            Upload Excel/CSV with columns:{" "}
            <strong>
              Last Name, First Name, Middle Name (optional), Date of Birth,
              Gender, Phone
            </strong>
          </p>
          <label className="cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" /> Choose File
            </Button>
          </label>
          {file && (
            <p className="text-sm text-gray-500">
              📄 {file.name} – {rows.length} rows loaded
            </p>
          )}
        </div>
      </Card>

      {/* Stats and Process button */}
      {rows.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Badge>Total: {stats.total}</Badge>
            <Badge className="bg-green-100 text-green-700">
              ✅ Matched: {stats.matched}
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-700">
              ⚠️ No Match: {stats.noMatch}
            </Badge>
            <Badge className="bg-red-100 text-red-700">
              ❌ Not Found: {stats.notFound}
            </Badge>
          </div>
          {progress.processed < stats.total && !isProcessing && (
            <Button
              onClick={startProcessing}
              className="gap-2 bg-teal-600 hover:bg-teal-700"
            >
              <Play className="w-4 h-4" /> Start Retrieval
            </Button>
          )}
          {isProcessing && (
            <div className="w-64">
              <Progress value={(progress.processed / progress.total) * 100} />
            </div>
          )}
        </div>
      )}

      {/* Results Table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto border rounded-lg shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">Row</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Middle Name</th>
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">NIN</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Processed At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{row.rowNumber}</td>
                  <td className="px-4 py-3">{row.lastName}</td>
                  <td className="px-4 py-3">{row.firstName}</td>
                  <td className="px-4 py-3">{row.middleName || "-"}</td>
                  <td className="px-4 py-3">{row.dateOfBirth}</td>
                  <td className="px-4 py-3">{row.gender}</td>
                  <td className="px-4 py-3">{row.phone}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {row.nin || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {row.matchStatus === "matched" && (
                      <Badge className="bg-green-100 text-green-700">
                        Matched
                      </Badge>
                    )}
                    {row.matchStatus === "no_match" && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        No Match
                      </Badge>
                    )}
                    {row.matchStatus === "not_found" && (
                      <Badge className="bg-red-100 text-red-700">
                        Not Found
                      </Badge>
                    )}
                    {row.matchStatus === "processing" && (
                      <Badge className="bg-blue-100 text-blue-700">
                        Processing
                      </Badge>
                    )}
                    {row.matchStatus === "pending" && (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {row.processedAt ? formatDate(row.processedAt) : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {row.matchedDetails && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRow(row)}
                        className="text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NinDetailsModal
        row={selectedRow}
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </div>
  );
}

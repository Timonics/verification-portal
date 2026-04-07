"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Download,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNinVerification } from "@/hooks/useNINVerification";
import * as XLSX from "xlsx";
import type { BulkNinRecord, BulkNinProgress } from "@/types/bulk-nin.types";

export default function BulkNINVerificationPage() {
  const { mutateAsync: verifyNIN } = useNinVerification();
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<BulkNinRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<BulkNinProgress | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setUploadError(null);
    setFile(uploadedFile);
    setRecords([]);
    setProgress(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        }) as string[][];

        if (rows.length < 2) {
          setUploadError(
            "File must contain at least one NIN (header + data row)",
          );
          return;
        }

        const headerRow = rows[0];
        const ninColumnIndex = headerRow.findIndex((col) =>
          col?.toString().toLowerCase().includes("nin"),
        );

        if (ninColumnIndex === -1) {
          setUploadError(
            'File must contain a column named "NIN" (case-insensitive)',
          );
          return;
        }

        const ninRecords: BulkNinRecord[] = rows
          .slice(1)
          .map((row, idx) => ({
            row: idx + 2,
            nin:
              row[ninColumnIndex]?.toString().trim().replace(/\D/g, "") || "",
            status: "pending" as const,
            data: undefined,
            error: undefined,
          }))
          .filter((r) => r.nin.length === 11);

        if (ninRecords.length === 0) {
          setUploadError("No valid 11‑digit NINs found in the file");
          return;
        }

        setRecords(ninRecords);
      } catch (err) {
        setUploadError(
          "Failed to parse file. Please upload a valid Excel/CSV file.",
        );
      }
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const startVerification = async () => {
    if (records.length === 0) return;
    setIsProcessing(true);
    setProgress({
      total: records.length,
      processed: 0,
      succeeded: 0,
      failed: 0,
      currentBatch: 0,
    });

    // Process in batches of 5 to avoid rate limits
    const batchSize = 5;
    const updatedRecords = [...records];

    for (let i = 0; i < updatedRecords.length; i += batchSize) {
      const batch = updatedRecords.slice(i, i + batchSize);
      const batchPromises = batch.map(async (record, idx) => {
        const recordIndex = i + idx;
        updatedRecords[recordIndex].status = "processing";
        setRecords([...updatedRecords]);
        setProgress((prev) => ({
          ...prev!,
          currentBatch: Math.floor(recordIndex / batchSize) + 1,
        }));

        try {
          const result = await verifyNIN(record.nin);
          if (result.success && result.data) {
            updatedRecords[recordIndex] = {
              ...record,
              status: "success",
              data: {
                first_name: result.data.first_name,
                last_name: result.data.last_name,
                middle_name: result.data.middle_name,
                date_of_birth: result.data.date_of_birth,
                phone_number: result.data.phone_number,
                gender: result.data.gender,
              },
            };
            setProgress((prev) => ({
              ...prev!,
              succeeded: prev!.succeeded + 1,
            }));
          } else {
            updatedRecords[recordIndex] = {
              ...record,
              status: "failed",
              error: result.message || "Verification failed",
            };
            setProgress((prev) => ({ ...prev!, failed: prev!.failed + 1 }));
          }
        } catch (err: any) {
          updatedRecords[recordIndex] = {
            ...record,
            status: "failed",
            error: err.message || "Request error",
          };
          setProgress((prev) => ({ ...prev!, failed: prev!.failed + 1 }));
        } finally {
          // Status already set in try/catch – no need to change it here.
          setRecords([...updatedRecords]);
          setProgress((prev) => ({ ...prev!, processed: prev!.processed + 1 }));
        }
      });
      await Promise.all(batchPromises);
      // Small delay between batches
      if (i + batchSize < updatedRecords.length)
        await new Promise((r) => setTimeout(r, 500));
    }

    setIsProcessing(false);
  };

  const downloadResults = () => {
    const headers = [
      "Row",
      "NIN",
      "Status",
      "First Name",
      "Last Name",
      "Middle Name",
      "Date of Birth",
      "Phone Number",
      "Gender",
      "Error",
    ];
    const rows = records.map((record) => [
      record.row,
      record.nin,
      record.status,
      record.data?.first_name || "",
      record.data?.last_name || "",
      record.data?.middle_name || "",
      record.data?.date_of_birth || "",
      record.data?.phone_number || "",
      record.data?.gender || "",
      record.error || "",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NIN Verification Results");
    XLSX.writeFile(
      wb,
      `nin_bulk_results_${new Date().toISOString().slice(0, 19)}.xlsx`,
    );
  };

  const clearAll = () => {
    setFile(null);
    setRecords([]);
    setProgress(null);
    setUploadError(null);
  };

  const stats = {
    total: records.length,
    succeeded: records.filter((r) => r.status === "success").length,
    failed: records.filter((r) => r.status === "failed").length,
    pending: records.filter((r) => r.status === "pending").length,
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bulk NIN Verification
        </h1>
        <p className="text-gray-600 mt-1">
          Upload an Excel/CSV file with NINs to verify them in batch.
        </p>
      </div>

      {/* File Upload Section */}
      <Card className="p-6 mb-8 border-dashed border-2 border-gray-300 bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-4">
          <FileSpreadsheet className="w-12 h-12 text-teal-600" />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Upload a file with a column named <strong>"NIN"</strong>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: .xlsx, .xls, .csv
            </p>
          </div>
          <div className="flex gap-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" /> Choose File
              </Button>
            </label>
            {file && (
              <Button
                variant="ghost"
                onClick={clearAll}
                disabled={isProcessing}
              >
                <Trash2 className="w-4 h-4" /> Clear
              </Button>
            )}
          </div>
          {uploadError && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
              <AlertCircle className="w-4 h-4" /> {uploadError}
            </div>
          )}
          {file && !uploadError && (
            <div className="text-sm text-gray-600">
              📄 {file.name} – {records.length} valid NIN(s) found
            </div>
          )}
        </div>
      </Card>

      {/* Progress & Actions */}
      {records.length > 0 && (
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-4">
              <Badge variant="outline" className="bg-gray-100">
                Total: {stats.total}
              </Badge>
              <Badge className="bg-green-100 text-green-700">
                ✅ Succeeded: {stats.succeeded}
              </Badge>
              <Badge className="bg-red-100 text-red-700">
                ❌ Failed: {stats.failed}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700">
                ⏳ Pending: {stats.pending}
              </Badge>
            </div>
            <div className="flex gap-3">
              {!isProcessing && stats.total > 0 && stats.pending > 0 && (
                <Button
                  onClick={startVerification}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Start Verification
                </Button>
              )}
              {stats.succeeded + stats.failed === stats.total &&
                stats.total > 0 && (
                  <Button
                    variant="outline"
                    onClick={downloadResults}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Results
                  </Button>
                )}
            </div>
          </div>

          {progress && isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Processing: {progress.processed} / {progress.total}
                </span>
                <span>
                  ✅ {progress.succeeded} | ❌ {progress.failed}
                </span>
              </div>
              <Progress
                value={(progress.processed / progress.total) * 100}
                className="h-2"
              />
            </div>
          )}
        </div>
      )}

      {/* Results Table */}
      {records.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Row</th>
                <th className="px-4 py-3 text-left">NIN</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">First Name</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">DOB</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Error</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.map((record, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{record.row}</td>
                  <td className="px-4 py-2 font-mono">{record.nin}</td>
                  <td className="px-4 py-2">
                    {record.status === "success" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {record.status === "failed" && (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    {record.status === "processing" && (
                      <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    {record.status === "pending" && (
                      <div className="w-4 h-4 rounded-full bg-gray-300" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {record.data?.first_name || "-"}
                  </td>
                  <td className="px-4 py-2">{record.data?.last_name || "-"}</td>
                  <td className="px-4 py-2">
                    {record.data?.date_of_birth || "-"}
                  </td>
                  <td className="px-4 py-2">
                    {record.data?.phone_number || "-"}
                  </td>
                  <td className="px-4 py-2 text-red-600 text-xs">
                    {record.error || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

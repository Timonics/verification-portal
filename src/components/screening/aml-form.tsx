"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  User,
  Building2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EntityType, AmlRequest } from "@/types/aml.types";

interface AmlFormProps {
  onSubmit: (data: AmlRequest) => void;
  isLoading: boolean;
  onReset: () => void;
  error?: string;
}

export function AmlForm({
  onSubmit,
  isLoading,
  onReset,
  error: externalError,
}: AmlFormProps) {
  const [entityType, setEntityType] = useState<EntityType>("individual");

  // Individual fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");

  // Organization fields
  const [orgName, setOrgName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [country, setCountry] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (entityType === "individual") {
      if (!firstName || !lastName) {
        setError("First name and last name are required");
        return;
      }
      onSubmit({
        names: `${firstName} ${lastName}`,
        schema: "individual",
        date_of_birth: dob || undefined,
        nationality: nationality || undefined,
        gender: gender,
      });
    } else {
      if (!orgName) {
        setError("Organization name is required");
        return;
      }
      onSubmit({
        name: orgName,
        schema: "organization",
        registration_number: regNumber || undefined,
        country: country || undefined,
      });
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setNationality("");
    setGender("male");
    setOrgName("");
    setRegNumber("");
    setCountry("");
    setError("");
    onReset();
  };

  const displayError = externalError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Shield className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          AML / PEP Screening
        </h2>
      </div>

      {/* Entity Type Toggle */}
      <div>
        <Label className="text-gray-700 font-medium mb-2 block">
          Entity Type
        </Label>
        <RadioGroup
          value={entityType}
          onValueChange={(v) => setEntityType(v as EntityType)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label
              htmlFor="individual"
              className="cursor-pointer flex items-center gap-1"
            >
              <User className="w-4 h-4" /> Individual
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="organization" id="organization" />
            <Label
              htmlFor="organization"
              className="cursor-pointer flex items-center gap-1"
            >
              <Building2 className="w-4 h-4" /> Organization
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Individual Form */}
      {entityType === "individual" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name *</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                placeholder="John"
              />
            </div>
            <div>
              <Label>Last Name *</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <Label>Date of Birth (YYYY-MM-DD)</Label>
            <Input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              disabled={isLoading}
              placeholder="1990-01-01"
            />
          </div>
          <div>
            <Label>Nationality (e.g., NG)</Label>
            <Input
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              disabled={isLoading}
              placeholder="NG"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={gender}
              onValueChange={(v) => setGender(v as "male" | "female")}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {/* Organization Form */}
      {entityType === "organization" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4"
        >
          <div>
            <Label>Organization Name *</Label>
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              disabled={isLoading}
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <Label>Registration Number (e.g., RC1234567)</Label>
            <Input
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              disabled={isLoading}
              placeholder="RC1234567"
            />
          </div>
          <div>
            <Label>Country of Incorporation</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={isLoading}
              placeholder="NG"
            />
          </div>
        </motion.div>
      )}

      {displayError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {displayError}
        </p>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Screening...</span>
            </div>
          ) : (
            <>
              Run AML Screening
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}

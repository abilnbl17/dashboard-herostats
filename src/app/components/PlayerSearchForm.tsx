"use client";

import { Button, Card, Input } from "@heroui/react";
import React, { useState } from "react";

interface PlayerSearchFormProps {
  onSearch: (accountId: string) => void;
  isLoading: boolean;
}

const PlayerSearchForm = ({ onSearch, isLoading }: PlayerSearchFormProps) => {
  const [accountId, setAccountId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pastikan input tidak kosong
    if (accountId.trim()) {
      onSearch(accountId.trim());
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Cari Saran Hero Untuk Pemain
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Masukkan ID Akun Pemain"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !accountId.trim()}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Mencari ... " : "Cari Hero"}
        </Button>
      </form>
    </Card>
  );
};
export default PlayerSearchForm;

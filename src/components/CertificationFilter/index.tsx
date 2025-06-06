// src/components/CertificationFilter/index.tsx
"use client";

import React from "react";

interface Props {
  selectedCertifications: string[];
  onChange: (values: string[]) => void;
}

const CERTIFICATIONS = [
  { label: "Sem classificação", value: "none" },
  { label: "Adulto (+18)", value: "adult" },
  { label: "BR: Livre", value: "L" },
  { label: "BR: 10 anos", value: "10" },
  { label: "BR: 12 anos", value: "12" },
  { label: "BR: 14 anos", value: "14" },
  { label: "BR: 16 anos", value: "16" },
  { label: "BR: 18 anos", value: "18" },
  { label: "US: G", value: "G" },
  { label: "US: PG", value: "PG" },
  { label: "US: PG-13", value: "PG-13" },
  { label: "US: R", value: "R" },
  { label: "US: NC-17", value: "NC-17" },
];

export default function CertificationFilter({
  selectedCertifications,
  onChange,
}: Props) {
  const toggleSelection = (value: string) => {
    const updated = selectedCertifications.includes(value)
      ? selectedCertifications.filter((v) => v !== value)
      : [...selectedCertifications, value];

    onChange(updated);
  };

  return (
    <div className="text-white space-y-2">
      <p className="font-semibold">Filtrar por faixa etária:</p>
      <div className="flex flex-wrap gap-2">
        {CERTIFICATIONS.map((cert) => (
          <label
            key={cert.value}
            className="flex items-center gap-1 cursor-pointer"
          >
            <input
              checked={selectedCertifications.includes(cert.value)}
              type="checkbox"
              value={cert.value}
              onChange={() => toggleSelection(cert.value)}
            />
            {cert.label}
          </label>
        ))}
      </div>
    </div>
  );
}

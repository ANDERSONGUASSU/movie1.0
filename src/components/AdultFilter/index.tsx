// src/components/AdultFilter/index.tsx
"use client";

import React from "react";

interface AdultFilterProps {
  showAdult: boolean;
  onToggle: (checked: boolean) => void;
}

export default function AdultFilter({ showAdult, onToggle }: AdultFilterProps) {
  return (
    <div className="flex items-center gap-2 text-white">
      <label htmlFor="adult-toggle">Mostrar filmes adultos</label>
      <input
        checked={showAdult}
        className="w-4 h-4"
        id="adult-toggle"
        type="checkbox"
        onChange={(e) => onToggle(e.target.checked)}
      />
    </div>
  );
}

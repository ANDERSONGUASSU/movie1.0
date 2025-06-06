// src/components/Filter/index.tsx
import React from "react";

interface Props {
  year: number | null;
  onYearChange: (year: number | null) => void;
}

export default function YearSelector({ year, onYearChange }: Props) {
  const [inputValue, setInputValue] = React.useState(year?.toString() || "");

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);

    const parsed = parseInt(value, 10);

    if (
      !isNaN(parsed) &&
      parsed >= 1900 &&
      parsed <= new Date().getFullYear()
    ) {
      onYearChange(parsed);
    } else if (value === "") {
      onYearChange(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <label className="text-white" htmlFor="year">
        Ano:
      </label>
      <input
        id="year"
        placeholder="Ex: 2025"
        type="number"
        value={inputValue}
        onChange={handleYearChange}
      />
    </div>
  );
}

import React from "react";
import { Select, SelectItem } from "@heroui/select";

interface Props {
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const sortOptions = [
  { value: "popularity.desc", label: "Popularidade (↓)" },
  { value: "popularity.asc", label: "Popularidade (↑)" },
  { value: "release_date.desc", label: "Data de Lançamento (↓)" },
  { value: "release_date.asc", label: "Data de Lançamento (↑)" },
  { value: "revenue.desc", label: "Receita (↓)" },
  { value: "revenue.asc", label: "Receita (↑)" },
  { value: "original_title.asc", label: "Título (A-Z)" },
  { value: "original_title.desc", label: "Título (Z-A)" },
  { value: "vote_average.desc", label: "Nota (↓)" },
  { value: "vote_average.asc", label: "Nota (↑)" },
];

export default function OrderSelector({ sortBy, onSortByChange }: Props) {
  return (
    <Select
      label="Ordenar por"
      selectedKeys={[sortBy]}
      onSelectionChange={(keys) =>
        onSortByChange(String(Array.from(keys)[0] ?? ""))
      }
    >
      {sortOptions.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}

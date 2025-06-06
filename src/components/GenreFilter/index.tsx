// src/components/GenreFilter/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  selectedGenres: number[];
  onChange: (genres: number[]) => void;
}

export default function GenreFilter({ selectedGenres, onChange }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "6ecbcf4cfd936091028f5873b5c422be",
          language: "pt-BR",
        },
      })
      .then((res) => setGenres(res.data.genres))
      .catch(() => console.error("Erro ao carregar gêneros"));
  }, []);

  const toggleGenre = (id: number) => {
    const updated = selectedGenres.includes(id)
      ? selectedGenres.filter((g) => g !== id)
      : [...selectedGenres, id];

    onChange(updated);
  };

  return (
    <div className="text-white space-y-2">
      <p className="font-semibold">Filtrar por gênero:</p>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <label
            key={genre.id}
            className="flex items-center gap-1 cursor-pointer"
          >
            <input
              checked={selectedGenres.includes(genre.id)}
              type="checkbox"
              onChange={() => toggleGenre(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>
    </div>
  );
}

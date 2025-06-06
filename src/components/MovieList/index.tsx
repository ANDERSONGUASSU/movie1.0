// src/components/MovieList/index.tsx
"use client";
import type { Movie, MovieApiResponse } from "@/src/types/Movie";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import MovieCard from "../MovieCard";
import YearSelector from "../YearSelector";
import AdultFilter from "../AdultFilter";
import CertificationFilter from "../CertificationFilter";
import GenreFilter from "../GenreFilter";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [showAdult, setShowAdult] = useState(false);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [genres, setGenres] = useState<number[]>([]);

  const getMovies = async () => {
    try {
      const response = await axios.get<MovieApiResponse>(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "6ecbcf4cfd936091028f5873b5c422be",
            language: "pt-BR",
            include_adult: showAdult,
            ...(genres.length > 0 && { with_genres: genres.join(",") }),
            ...(year && {
              primary_release_year: year,
            }),
          },
        },
      );
      const moviesWithCertification = await Promise.all(
        response.data.results.map(async (movie) => {
          try {
            const certRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`,
              {
                params: {
                  api_key: "6ecbcf4cfd936091028f5873b5c422be",
                  language: "pt-BR",
                },
              },
            );
            const br = certRes.data.results.find(
              (r: any) => r.iso_3166_1 === "BR",
            );

            const us = certRes.data.results.find(
              (r: any) => r.iso_3166_1 === "US",
            );

            const brCert = br?.release_dates?.[0]?.certification;
            const usCert = us?.release_dates?.[0]?.certification;

            return {
              ...movie,
              certification: brCert || usCert || null,
            };
          } catch {
            return {
              ...movie,
              certification: null,
            };
          }
        }),
      );
      const filtered = moviesWithCertification.filter((movie) => {
        if (certifications.length === 0) return true;

        const cert = movie.certification;

        const isUnrated = cert === null || cert === "";
        const isAdult = cert === "18" || cert === "R" || cert === "NC-17";

        // Se "none" estiver selecionado e o filme não tiver classificação
        if (certifications.includes("none") && isUnrated) return true;

        // Se "adult" estiver selecionado e o filme for adulto
        if (certifications.includes("adult") && isAdult) return true;

        // Se for uma classificação marcada (ex: "L", "PG-13", etc)
        return certifications.includes(cert);
      });

      setMovies(filtered);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Erro ao carregar os filmes. Tente novamente mais tarde.");

        return;
      }
    }
  };

  useEffect(() => {
    getMovies();
  }, [year, showAdult, certifications, genres]);

  return (
    <div>
      <YearSelector year={year} onYearChange={setYear} />
      <AdultFilter showAdult={showAdult} onToggle={setShowAdult} />
      <CertificationFilter
        selectedCertifications={certifications}
        onChange={setCertifications}
      />
      <GenreFilter selectedGenres={genres} onChange={setGenres} />

      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      <ul className="bg-gray-900 flex flex-wrap gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

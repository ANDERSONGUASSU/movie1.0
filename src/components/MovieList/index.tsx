// src/components/MovieList/index.tsx
"use client";
import type { Movie, MovieApiResponse } from "@/src/types/Movie";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import MovieCard from "../MovieCard";
import Filters from "../Filters";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [showAdult, setShowAdult] = useState(false);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [genres, setGenres] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  const getMovies = async () => {
    try {
      const response = await axios.get<MovieApiResponse>(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "6ecbcf4cfd936091028f5873b5c422be",
            language: "pt-BR",
            include_adult: showAdult,
            sort_by: sortBy,
            page,
            ...(genres.length > 0 && { with_genres: genres.join(",") }),
            ...(year && {
              primary_release_year: year,
            }),
            ...(sortBy === "vote_average.desc" && { "vote_count.gte": 100 }),
          },
        },
      );

      setTotalPages(response.data.total_pages);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [year, showAdult, certifications, genres, page, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [year, showAdult, certifications, genres, sortBy]);

  return (
    <div>
      <Filters
        certifications={certifications}
        genres={genres}
        setCertifications={setCertifications}
        setGenres={setGenres}
        setShowAdult={setShowAdult}
        setSortBy={setSortBy}
        setYear={setYear}
        showAdult={showAdult}
        sortBy={sortBy}
        year={year}
      />

      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      <ul className="bg-gray-900 flex flex-wrap gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        <span className="text-white">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

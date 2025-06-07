// src/components/MovieCard/index.tsx
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

import StarRating from "../StarRating";

import { Movie } from "@/src/types/Movie";

export interface Props {
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const { movie } = props;

  return (
    <>
      <li>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid gird-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center h-96">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt={movie.title}
                  className="object-cover"
                  height="100%"
                  shadow="md"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  width="100%"
                />
              </div>
              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {movie.title}
                    </h1>
                    {movie.certification && (
                      <span className="inline-block py-1 text-white rounded text-sm bg-red-600 px-2 max-w-20 text-center mb-2">
                        {movie.certification}
                      </span>
                    )}
                    <StarRating rating={movie.vote_average} />
                    <p>
                      {new Date(movie.release_date).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-yellow-200 text-xl mt-2 line-clamp-4 overflow-hidden">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </li>
    </>
  );
}

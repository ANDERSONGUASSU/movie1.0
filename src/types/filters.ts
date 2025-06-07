export interface FiltersProps {
  year: number | null;
  setYear: (year: number | null) => void;
  showAdult: boolean;
  setShowAdult: (value: boolean) => void;
  certifications: string[];
  setCertifications: (certs: string[]) => void;
  genres: number[];
  setGenres: (genres: number[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

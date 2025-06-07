"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

import YearSelector from "../YearSelector";
import AdultFilter from "../AdultFilter";
import CertificationFilter from "../CertificationFilter";
import GenreFilter from "../GenreFilter";
import { FiltersProps } from "../../types/filters";
import OrderSelector from "../OrderSelector";

export default function Filters({
  year,
  setYear,
  showAdult,
  setShowAdult,
  certifications,
  setCertifications,
  genres,
  setGenres,
  sortBy,
  setSortBy,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="mb-4 mt-4"
        variant="flat"
        onPress={() => setIsOpen(true)}
      >
        Filtros
      </Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent>
          <DrawerHeader>Filtros</DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col gap-4">
              <OrderSelector sortBy={sortBy} onSortByChange={setSortBy} />
              <YearSelector year={year} onYearChange={setYear} />
              <AdultFilter showAdult={showAdult} onToggle={setShowAdult} />
              <CertificationFilter
                selectedCertifications={certifications}
                onChange={setCertifications}
              />
              <GenreFilter selectedGenres={genres} onChange={setGenres} />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button color="primary" onPress={() => setIsOpen(false)}>
              Aplicar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

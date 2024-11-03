import SearchBar from "./components/search-bar";
import FilterChips from "./components/filter-chips";
import PokemonList from "./components/pokemon-list";
import { Suspense } from "react";
import React from "react";

export default function Home() {
  return (
    <Suspense>
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pokédex</h1>
          <SearchBar />
          <FilterChips />
        </header>
        <PokemonList />
      </div>
    </main>
    </Suspense>
  );
}
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "usehooks-ts";

interface Pokemon {
  types: any;
  name: string;
  url: string;
}

interface PokemonResponse {
  types: any;
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonDetails {
  types: PokemonType[];
}

export function usePokemonSearch(searchTerm: string, limit = 12) {
  const debouncedSearch = useDebounce(searchTerm, 300);

  return useInfiniteQuery<PokemonResponse>({
    queryKey: ["pokemon", debouncedSearch],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Filter by search term
      const filteredResults = data.results.filter((p: Pokemon) =>
        p.name.includes(debouncedSearch)
      );

      // Get detailed information for type filtering
      const detailedResults = await Promise.all(
        filteredResults.map(async (pokemon: Pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details: PokemonDetails = await detailsResponse.json();
          return {
            ...pokemon,
            types: details.types.map(t => t.type.name)
          };
        })
      );

      return {
        ...data,
        results: detailedResults,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined;
      return pages.length * limit;
    },
    initialPageParam: 0,
  });
}
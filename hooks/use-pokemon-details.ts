"use client";

import { useQuery } from "@tanstack/react-query";

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export function usePokemonDetails(name: string, url: string, enabled = true) {
  return useQuery<PokemonDetails>({
    queryKey: ["pokemon-details", name],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled,
  });
}
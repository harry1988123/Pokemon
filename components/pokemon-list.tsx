"use client";

import styled from 'styled-components';
import { useSearchParams } from "next/navigation";
import PokemonCard from "./pokemon-card";
import { useInView } from "react-intersection-observer";
import { Suspense, useEffect } from "react";
import { usePokemonSearch } from "@/hooks/use-pokemon-search";
import React from 'react';

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingGrid = styled(Grid)`
  > div {
    height: 360px;
    background-color: var(--muted);
    border-radius: var(--radius);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--muted-foreground);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--muted-foreground);
  }
`;

export default function PokemonList() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePokemonSearch(searchTerm);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <LoadingGrid>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} />
        ))}
      </LoadingGrid>
    );
  }

  const pokemon = data?.pages.flatMap((page) => page.results) ?? [];

  if (pokemon.length === 0) {
    return (
      <NoResults>
        <h2>No Pokémon found</h2>
        <p>Try searching with a different term</p>
      </NoResults>
    );
  }

  return (
    <Suspense>
    <Grid>
      {pokemon.map((p, index) => (
        <PokemonCard key={p.name + index} name={p.name} url={p.url} />
      ))}
      <div ref={ref} style={{ height: '2.5rem' }} />
    </Grid>
    </Suspense>
  );
}
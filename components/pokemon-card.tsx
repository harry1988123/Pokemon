"use client";

import Image from "next/image";
import { useState } from "react";
import PokemonDetailsDialog from "./pokemon-details-dialog";
import { usePokemonDetails } from "@/hooks/use-pokemon-details";
import { typeColors } from "@/lib/constants";

export default function PokemonCard({ name, url }: { name: string; url: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: details, isLoading } = usePokemonDetails(name, url);

  if (isLoading || !details) {
    return (
      <div className="h-[360px] rounded-lg bg-muted animate-pulse" />
    );
  }

  const mainType = details.types[0]?.type.name || "normal";
  const typeColor = typeColors[mainType];

  return (
    <>
      <div 
        className={`group h-[360px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1`}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className={`h-full bg-gradient-to-br ${typeColor.gradient[0]} ${typeColor.gradient[1]} p-6`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold capitalize mb-2 text-white">{name}</h2>
              <div className="flex flex-wrap gap-2">
                {details.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`${typeColors[type.type.name].light} bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-lg font-bold text-white/80">
              #{details.id.toString().padStart(3, "0")}
            </span>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <div className="relative w-48 h-48 transition-transform duration-300 group-hover:scale-110">
              {details.sprites.other["official-artwork"].front_default && (
                <Image
                  src={details.sprites.other["official-artwork"].front_default}
                  alt={name}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={details.id <= 20}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <PokemonDetailsDialog
        name={name}
        url={url}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
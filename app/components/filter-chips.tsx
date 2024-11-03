"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { X } from "lucide-react";
import { typeColors } from "@/lib/constants";

const pokemonTypes = Object.keys(typeColors);

export default function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTypes = searchParams.get("types")?.split(",").filter(Boolean) ?? [];

  const toggleType = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams);
      const currentTypes = params.get("types")?.split(",").filter(Boolean) ?? [];
      
      if (currentTypes.includes(type)) {
        const newTypes = currentTypes.filter(t => t !== type);
        if (newTypes.length > 0) {
          params.set("types", newTypes.join(","));
        } else {
          params.delete("types");
        }
      } else {
        const newTypes = [...currentTypes, type];
        params.set("types", newTypes.join(","));
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Suspense>
    <div className="w-full max-w-3xl mx-auto mt-4">
      <div className="flex flex-wrap gap-2">
        {pokemonTypes.map((type) => {
          const isActive = activeTypes.includes(type);
          const typeColor = typeColors[type];
          
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                transition-all duration-200 hover:ring-2 hover:ring-offset-2
                ${isActive 
                  ? `${typeColor.medium} text-white hover:ring-${type}-400/50`
                  : `bg-secondary text-secondary-foreground hover:ring-secondary/30`
                }
              `}
            >
              {type}
              {isActive && (
                <X className="w-3 h-3" />
              )}
            </button>
          );
        })}
      </div>
    </div>
    </Suspense>
  );
}
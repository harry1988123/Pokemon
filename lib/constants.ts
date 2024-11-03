interface TypeColors {
  light: string;
  medium: string;
  gradient: string[];
}

export const typeColors: Record<string, TypeColors> = {
  normal: {
    light: "bg-neutral-200",
    medium: "bg-neutral-400",
    gradient: ["from-neutral-200", "to-neutral-400"]
  },
  fire: {
    light: "bg-orange-300",
    medium: "bg-orange-500",
    gradient: ["from-orange-400", "to-red-500"]
  },
  water: {
    light: "bg-blue-300",
    medium: "bg-blue-500",
    gradient: ["from-blue-400", "to-blue-600"]
  },
  electric: {
    light: "bg-yellow-200",
    medium: "bg-yellow-400",
    gradient: ["from-yellow-300", "to-yellow-500"]
  },
  grass: {
    light: "bg-green-300",
    medium: "bg-green-500",
    gradient: ["from-green-400", "to-emerald-500"]
  },
  ice: {
    light: "bg-cyan-200",
    medium: "bg-cyan-400",
    gradient: ["from-cyan-300", "to-cyan-500"]
  },
  fighting: {
    light: "bg-red-300",
    medium: "bg-red-500",
    gradient: ["from-red-400", "to-red-600"]
  },
  poison: {
    light: "bg-purple-300",
    medium: "bg-purple-500",
    gradient: ["from-purple-400", "to-purple-600"]
  },
  ground: {
    light: "bg-amber-200",
    medium: "bg-amber-600",
    gradient: ["from-amber-400", "to-amber-700"]
  },
  flying: {
    light: "bg-indigo-200",
    medium: "bg-indigo-400",
    gradient: ["from-indigo-300", "to-indigo-500"]
  },
  psychic: {
    light: "bg-pink-300",
    medium: "bg-pink-500",
    gradient: ["from-pink-400", "to-pink-600"]
  },
  bug: {
    light: "bg-lime-300",
    medium: "bg-lime-500",
    gradient: ["from-lime-400", "to-lime-600"]
  },
  rock: {
    light: "bg-stone-300",
    medium: "bg-stone-500",
    gradient: ["from-stone-400", "to-stone-600"]
  },
  ghost: {
    light: "bg-purple-300",
    medium: "bg-purple-600",
    gradient: ["from-purple-500", "to-purple-800"]
  },
  dragon: {
    light: "bg-violet-300",
    medium: "bg-violet-600",
    gradient: ["from-violet-500", "to-violet-800"]
  },
  dark: {
    light: "bg-neutral-400",
    medium: "bg-neutral-700",
    gradient: ["from-neutral-600", "to-neutral-900"]
  },
  steel: {
    light: "bg-slate-300",
    medium: "bg-slate-500",
    gradient: ["from-slate-400", "to-slate-600"]
  },
  fairy: {
    light: "bg-pink-200",
    medium: "bg-pink-400",
    gradient: ["from-pink-300", "to-pink-500"]
  }
};
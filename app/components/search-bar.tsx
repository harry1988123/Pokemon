"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useTransition } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Pokémon... (⌘K)"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search Pokémon"
        className="w-full h-12 pl-12 pr-12 text-lg rounded-full border-2 border-border bg-background text-foreground transition-all hover:border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden h-7 px-2 items-center gap-1 rounded border border-border bg-muted text-muted-foreground font-mono text-sm pointer-events-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
}
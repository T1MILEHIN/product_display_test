'use client'
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ) => {
    return (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func(...args), wait);
    };
  };

  // Memoized debounced function
  const debouncedUpdateParams = useCallback(
    debounce((query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set('search', query.trim());
      } else {
        params.delete('search');
      }

      router.push(`/?${params.toString()}`, { scroll: false });
    }, 300),
    [searchParams, router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedUpdateParams(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear any pending debounced calls and update immediately
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search products, categories, or descriptions..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md border">
          Press Enter to search for &apos;{searchQuery}&apos;
        </div>
      )}
    </form>
  );
};

export default SearchBar;
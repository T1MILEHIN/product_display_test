'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: Array<string>;
}

export const FilterCategory = ({ categories }: CategoryFilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedCategory = searchParams.get('category');

    const handleCategoryChange = (category: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category && category !== "All") {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        router.replace(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">Categories</h2>
                {selectedCategory && (
                    <Badge variant="secondary" className="capitalize">
                        {selectedCategory}
                    </Badge>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <Button
                    variant={!selectedCategory ? 'default' : 'outline'}
                    onClick={() => handleCategoryChange("All")}
                    className="transition-all duration-200 hover:shadow-sm"
                >
                    All Products
                </Button>

                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => handleCategoryChange(category)}
                        className="capitalize transition-all duration-200 hover:shadow-sm"
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
};
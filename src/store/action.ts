import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface SearchState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    allProducts: Product[];
    filteredProducts: Product[];
    setAllProducts: (products: Product[]) => void;
    filterProducts: () => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    applyFilters: (products: Product[], query: string, category: string) => Product[];
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set, get) => ({
            searchQuery: '',
            selectedCategory: 'all',
            allProducts: [],
            filteredProducts: [],
            isLoading: false,

            setSearchQuery: (query: string) => {
                set({ searchQuery: query });
                get().filterProducts();
            },

            clearSearch: () => {
                set({ searchQuery: '' });
                get().filterProducts();
            },

            setSelectedCategory: (category: string) => {
                set({ selectedCategory: category });
                get().filterProducts();
            },

            setAllProducts: (products: Product[]) => {
                set({ allProducts: products });
                get().filterProducts();
            },

            setIsLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            filterProducts: () => {
                const { allProducts, searchQuery, selectedCategory, applyFilters } = get();
                const filtered = applyFilters(allProducts, searchQuery, selectedCategory);
                set({ filteredProducts: filtered });
            },

            applyFilters: (products: Product[], query: string, category: string) => {
                let filtered = products;


                if (category && category.toLowerCase() !== 'all') {
                    filtered = filtered.filter(
                        (product) => product.category.toLowerCase() === category.toLowerCase()
                    );
                }

                if (query.trim()) {
                    const searchTerm = query.toLowerCase().trim();
                    filtered = filtered.filter(
                        (product) =>
                            product.title.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.category.toLowerCase().includes(searchTerm)
                    );
                }

                return filtered;
            },
        }),
        {
            name: 'search-store',
            partialize: (state) => ({
                searchQuery: state.searchQuery,
                selectedCategory: state.selectedCategory,
            }),
        }
    )
);
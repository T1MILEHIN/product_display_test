import { FilterCategory } from "@/components/filterProducts";
import SearchBar from "@/components/searchBar";
import ProductDisplay from "@/components/productDisplay";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

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

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedCategory = resolvedSearchParams?.category as string | undefined;
  const searchCategory = resolvedSearchParams?.search as string | undefined;

  const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await categoryRes.json();

  const productUrl =
    selectedCategory && selectedCategory.toLowerCase() !== "all"
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

  const productRes = await fetch(productUrl);
  const products = await productRes.json();

  const filteredProducts = searchCategory
    ? products.filter((product: Product) =>
      product.title.toLowerCase().includes(searchCategory.toLowerCase()) ||
      product.description.toLowerCase().includes(searchCategory.toLowerCase()) ||
      product.category.toLowerCase().includes(searchCategory.toLowerCase())
    )
    : products;

  return (
    <div className="min-h-screen pb-20 gap-16 sm:p-16 p-4">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-blue-500 bg-clip-text text-transparent">
          Premium Collection
        </h1>
        <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${montserrat.className}`}>
          Discover our curated selection of high-quality products across electronics, jewelry, and fashion
        </p>
        <div className="flex items-center md:flex-row flex-col justify-center gap-2 text-sm text-muted-foreground">
          <span>{products.length} products</span>
          <span>•</span>
          <span>Free shipping worldwide</span>
          <span>•</span>
          <span>30-day returns</span>
        </div>
      </div>

      <div>
        <SearchBar />
      </div>

      <div className="my-4">
        <FilterCategory categories={categories} />
      </div>

      <div className="flex items-center md:flex-row flex-col justify-center gap-2 text-sm text-muted-foreground mb-8">
        <span>{filteredProducts.length} products</span>
        {searchCategory && (
          <>
            <span>•</span>
            <span>filtered by &apos;{searchCategory}&apos;</span>
          </>
        )}
        <span>•</span>
        <span>Free shipping worldwide</span>
        <span>•</span>
        <span>30-day returns</span>
      </div>


      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductDisplay key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchCategory
                ? `No products match "${searchCategory}". Try a different search term.`
                : "No products found in this category."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

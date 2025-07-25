import { FilterCategory } from "@/components/filterProducts";
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

export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
  const selectedCategory = searchParams.category;
  const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await categoryRes.json();

  const productUrl =
    selectedCategory && selectedCategory !== "All"
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

  const productRes = await fetch(productUrl);
  const products = await productRes.json();

  return (
    <div className="min-h-screen pb-20 gap-16 sm:p-20 p-4">
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

      <div className="my-4">
        <FilterCategory categories={categories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
          <ProductDisplay key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

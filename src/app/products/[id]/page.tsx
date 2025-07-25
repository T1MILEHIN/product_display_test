import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/productDetail";

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

export async function generateStaticParams() {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return products.map((product: Product) => ({
        id: product.id.toString(),
    }));
}

const Page = async ({ params }: { params: { id: string } }) => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const product = await response.json();

    return (
        <main className="container mx-auto px-6 py-8">
            <Link href={"/"}>
                <Button variant="ghost" className="mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shop
                </Button>
            </Link>

            <ProductDetail product={product} />
        </main>
    );
};

export default Page;

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductDetail from "@/components/productDetail";

interface PageProps {
    params: {
        id: string;
    }
}

const page = async({ params }: PageProps) => {
    const response  = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product data");
    }
    
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
    )
}

export default page;
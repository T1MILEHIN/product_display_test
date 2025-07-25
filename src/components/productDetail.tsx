import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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

const ProductDetail = ({ product }: { product: Product }) => {
    return (
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
                <div className="aspect-square bg-card rounded-xl overflow-hidden shadow-elegant">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <Badge variant="secondary" className="mb-3">
                        {product.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {product.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating.rate)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                        }`}
                                />
                            ))}
                            <span className="text-sm text-muted-foreground ml-2">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-6">
                        ${product.price}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="flex gap-4 pt-6">
                    <Button className="flex-1">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
                    <Button variant="outline">
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>

                <div className="border-t pt-6 space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Free shipping</span>
                        <span>On orders over $50</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Returns</span>
                        <span>30-day return policy</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Warranty</span>
                        <span>1-year manufacturer warranty</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
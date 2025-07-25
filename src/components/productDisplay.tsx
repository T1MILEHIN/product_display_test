"use client"
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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

interface ProductCardProps {
    product: Product;
}

const StarRating = ({ rating, count }: { rating: number; count: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-rating text-rating text-[#ffd700]" fill="#ffd700" />
                ))}
                {hasHalfStar && <StarHalf className="w-4 h-4 text-[#ffd700]" fill="#ffd700" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-slate-200" />
                ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">({count})</span>
        </div>
    );
};

const ProductDisplay = ({ product }: ProductCardProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <Link href={`/products/${product.id}`} className="group">
            <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{delay: 0.01 * product.id}} layout>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-border/50 bg-gradient-card backdrop-blur-sm animate-fade-in">
                    <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={500}
                                height={400}
                                className="w-full h-64 object-contain bg-white p-4 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Details
                            </div>
                        </div>
                        <div className="p-3 space-y-3">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground capitalize font-medium">
                                    {product.category}
                                </p>
                                <h3 className="font-semibold text-foreground line-clamp-1 leading-tight">
                                    {product.title}
                                </h3>
                                <p className={`text-sm text-muted-foreground line-clamp-2 ${montserrat.className}`}>
                                    {product.description}
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-price">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <StarRating rating={product.rating.rate} count={product.rating.count} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}

export default ProductDisplay
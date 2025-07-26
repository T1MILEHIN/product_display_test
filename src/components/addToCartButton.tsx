"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/contexts/cartContext";

type AddToCartButtonProps = {
    id: string | number;
};

const AddToCartButton = ({ id }: AddToCartButtonProps) => {
    const { addToCart } = useCartContext() as { addToCart: (id: string | number) => void };
    return (
        <Button onClick={() => addToCart(id)} className="flex-1">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
        </Button>
    );
};

export default AddToCartButton
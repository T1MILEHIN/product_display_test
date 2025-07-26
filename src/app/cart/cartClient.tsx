"use client";
import { useCartContext } from "@/contexts/cartContext";
import ProductDisplay from "@/components/productDisplay";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

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

interface CartClientProps {
    products: Product[];
}

const CartClient = ({ products }: CartClientProps) => {
    const { cartItem, removeCartItem, clearCart } = useCartContext() as { cartItem: number[], removeCartItem: (id: number) => void, clearCart: () => void };

    const cartProducts = useMemo(() => {
        return products.filter(product =>
            cartItem.some(item => item === product.id)
        );
    }, [products, cartItem]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Cart Items</h2>
            {cartItem.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-4xl mb-4">🛒</div>
                    <p className="text-lg text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Add some products to get started!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {cartItem.length > 0 && (
                            <button
                                onClick={() => clearCart()}
                                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        {cartItem.length} item{cartItem.length !== 1 ? 's' : ''} in your cart
                    </p>
                    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cartProducts.map((product) => (
                            <div key={product.id} className="">
                                <ProductDisplay product={product} />
                                <Button onClick={() => removeCartItem(product.id)} className="bg-red-500 w-full text-white">Remove</Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartClient;
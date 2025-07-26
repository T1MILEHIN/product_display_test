"use client"
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster, toast } from 'sonner';

export const CartContext = createContext({});

import { ReactNode } from "react";

type CartProviderProps = {
    children: ReactNode;
};

interface CartItem {
    id: string | number;
}

interface CartData {
    id: string | number;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItem, setCartItem] = useState(() => {
        if (typeof window !== 'undefined' && localStorage) {
            try {
                const storedCart = localStorage.getItem("cart-item");
                return storedCart ? JSON.parse(storedCart) : [];
            } catch (error) {
                console.error("Error parsing cart data from localStorage:", error);
                return [];
            }
        }
        return [];
    });

    const addToCart = (data: CartData) => {
        if (!data) {
            toast.error(`Please enter the quantity that you want`);
            return;
        }
        if (!cartItem.some((item: CartItem) => item === data)) {
            setCartItem((prev: CartItem[]) => [...prev, data]);
            toast.success(`Successfully added to cart`, {
                icon: <FaCheck color="green" />
            });
        } else {
            toast.error(`This item is already in your cart`);
        }
    };
    const removeCartItem = (id :CartData)=> {
        setCartItem(
            (prev: CartItem[]) => prev.filter((item: CartItem) => item !== id)
        );
        toast.success(`item removed from cart`)
    }
    const clearCart = () => {
        setCartItem([]);
        toast.success(`Cart cleared`);
    }
    useEffect(() => {
        localStorage.setItem("cart-item", JSON.stringify(cartItem));
    }, [cartItem]);

    return (
        <CartContext.Provider value={{ cartItem, removeCartItem, setCartItem, addToCart, clearCart }}>
            <Toaster position="top-center" />
            <div className="relative">
                <>
                    {children}
                </>
            </div>
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}

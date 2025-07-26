import CartClient from "./cartClient";

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

const Page = async () => {
    const products = await fetch("https://fakestoreapi.com/products");
    const productsData: Product[] = await products.json();

    return <CartClient products={productsData} />
};

export default Page
"use client"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const error = () => {
    return (
        <div className="min-h-screen bg-gradient-subtle">
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
                <Link href={"/"}>
                    <Button>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shop
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default error;
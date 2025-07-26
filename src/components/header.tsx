import { ShoppingBag, Sparkles } from "lucide-react";
import ThemeToggler from "./themeToggler";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <div className="p-2 text-blue-500 rounded-lg shadow-glow">
                                <Sparkles className="w-6 h-6 text-black dark:text-white" />
                            </div>
                            <span className="text-blue-500">
                                TIMI STORE
                            </span>
                        </div>
                    </div>

                    <div>
                        <ThemeToggler />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm">Not Like Temu 😂</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
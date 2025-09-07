import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
    const { itemCount } = useCart();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">E</span>
                    </div>
                    <span className="text-xl font-bold">EcomStore</span>
                </Link>

                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-10 pr-4"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-4">
                    {/* Mobile menu button */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/products">
                            <Button variant="ghost">Products</Button>
                        </Link>
                        <Link to="/categories">
                            <Button variant="ghost">Categories</Button>
                        </Link>
                    </div>

                    {/* User actions */}
                    <div className="flex items-center space-x-2">
                        <Link to="/account">
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Mobile search bar */}
            <div className="md:hidden border-t px-4 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-10 pr-4"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;

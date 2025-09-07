import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ProductList from '../components/product/ProductList';
import { products } from '../data/products';
import { categories } from '../data/categories';

const CategoryProductsPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState('name');

    const category = categories.find(c => c.name.toLowerCase() === categoryName?.toLowerCase());
    const categoryDisplayName = categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);

    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesCategory = product.category.toLowerCase() === categoryName?.toLowerCase();
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesCategory && matchesSearch && matchesPrice;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [categoryName, searchTerm, priceRange, sortBy]);

    if (!category && categoryName) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The category you're looking for doesn't exist.
                </p>
                <Link to="/categories">
                    <Button>Browse All Categories</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-6">
                <Link to="/" className="text-muted-foreground hover:text-primary">
                    Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link to="/categories" className="text-muted-foreground hover:text-primary">
                    Categories
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground">{categoryDisplayName}</span>
            </nav>

            {/* Back Button */}
            <Link to="/categories" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
            </Link>

            {/* Category Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{categoryDisplayName}</h1>
                {category && (
                    <p className="text-muted-foreground text-lg">
                        {category.description}
                    </p>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:w-64 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center">
                                <SlidersHorizontal className="h-5 w-5 mr-2" />
                                Filters
                            </h3>

                            {/* Search */}
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-medium">Search in {categoryDisplayName}</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-medium">Price Range</label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        />
                                        <span>-</span>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Sort By</label>
                                <select
                                    className="w-full p-2 border border-input rounded-md bg-background"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                {/* Products Grid */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-muted-foreground">
                            {filteredProducts.length} products found in {categoryDisplayName}
                        </span>
                    </div>

                    <ProductList products={filteredProducts} />

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg mb-4">
                                No products found in this category with your current filters.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm('');
                                    setPriceRange([0, 1000]);
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CategoryProductsPage;

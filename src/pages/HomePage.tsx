import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ProductList from '../components/product/ProductList';
import { products } from '../data/products';
import { categories } from '../data/categories';

const HomePage: React.FC = () => {
    const featuredProducts = products.slice(0, 8);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Welcome to <span className="text-primary">EcomStore</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Discover amazing products at unbeatable prices. Quality, style, and value all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products">
                            <Button size="lg" className="w-full sm:w-auto">
                                Shop Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/categories">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Browse Categories
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center p-6">
                        <CardContent className="space-y-4">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Truck className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Free Shipping</h3>
                            <p className="text-muted-foreground">
                                Free shipping on all orders over $50. Fast and reliable delivery.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6">
                        <CardContent className="space-y-4">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Secure Payment</h3>
                            <p className="text-muted-foreground">
                                Your payment information is secure with our encrypted checkout.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6">
                        <CardContent className="space-y-4">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Headphones className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">24/7 Support</h3>
                            <p className="text-muted-foreground">
                                Our customer support team is here to help you anytime.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-muted-foreground text-lg">
                        Find exactly what you're looking for
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
                    {categories.slice(0, 7).map((category) => (
                        <Link
                            key={category.id}
                            to={`/category/${category.name.toLowerCase()}`}
                            className="group text-center"
                        >
                            <div className="aspect-square rounded-full overflow-hidden mb-3 mx-auto w-20 h-20 md:w-24 md:h-24">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="text-center">
                    <Link to="/categories">
                        <Button variant="outline">
                            View All Categories
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
                    <p className="text-muted-foreground text-lg">
                        Check out our most popular items
                    </p>
                </div>
                <ProductList products={featuredProducts} />
                <div className="text-center mt-12">
                    <Link to="/products">
                        <Button variant="outline" size="lg">
                            View All Products
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-muted/50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter and be the first to know about new products,
                        exclusive deals, and special offers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
                        />
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The product you're looking for doesn't exist.
                </p>
                <Link to="/products">
                    <Button>Back to Products</Button>
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-8">
                <Link to="/" className="text-muted-foreground hover:text-primary">
                    Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                    Products
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link to={`/category/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-primary">
                    {product.category}
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground">{product.name}</span>
            </nav>

            {/* Back Button */}
            <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg border">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                                {product.category}
                            </span>
                            {product.stock < 10 && (
                                <span className="text-sm text-destructive font-medium bg-destructive/10 px-2 py-1 rounded">
                                    Low Stock
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-medium">{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Stock Info */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Availability:
                                </span>
                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-destructive'
                                    }`}>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1"
                                size="lg"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                            <Button variant="outline" size="lg">
                                <Heart className="w-5 h-5 mr-2" />
                                Wishlist
                            </Button>
                            <Button variant="outline" size="lg">
                                <Share2 className="w-5 h-5 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Features */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Product Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Fast Shipping</h3>
                            <p className="text-sm text-muted-foreground">
                                Free shipping on orders over $50
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                            <p className="text-sm text-muted-foreground">
                                30-day money back guarantee
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">Customer Support</h3>
                            <p className="text-sm text-muted-foreground">
                                24/7 customer support available
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

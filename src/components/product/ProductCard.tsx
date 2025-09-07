import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import type { Product } from '../../types/product.js';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <CardContent className="p-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                            {product.description}
                        </p>
                        <div className="flex items-center space-x-1">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                ({product.reviews})
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Stock: {product.stock}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={handleAddToCart}
                    className="w-full"
                    disabled={product.stock === 0}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;

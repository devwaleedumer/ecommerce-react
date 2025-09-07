import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { categories } from '../data/categories';
import { products } from '../data/products';

const CategoriesPage: React.FC = () => {
    const getCategoryProductCount = (categoryName: string) => {
        return products.filter(product => product.category === categoryName).length;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Shop by Category</h1>
                <p className="text-muted-foreground">
                    Browse our wide selection of products organized by category
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => {
                    const productCount = getCategoryProductCount(category.name);

                    return (
                        <Link
                            key={category.id}
                            to={`/category/${category.name.toLowerCase()}`}
                            className="group"
                        >
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-3">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            {productCount} products
                                        </span>
                                        <span className="text-primary text-sm font-medium group-hover:underline">
                                            Shop now →
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">E</span>
                            </div>
                            <span className="text-xl font-bold">EcomStore</span>
                        </div>
                        <p className="text-muted-foreground">
                            Your one-stop shop for quality products at great prices.
                            We're committed to providing the best shopping experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/products" className="hover:text-primary">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-primary">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/deals" className="hover:text-primary">
                                    Deals
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Customer Service</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/contact" className="hover:text-primary">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="hover:text-primary">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="hover:text-primary">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-primary">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Contact Info</h3>
                        <div className="space-y-3 text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">123 Commerce St, City, State 12345</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">support@ecomstore.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; 2024 EcomStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

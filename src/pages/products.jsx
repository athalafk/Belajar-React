import { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/features/cartSlice";
import { showNotification } from "../redux/features/notificationSlice";
import { fetchProducts } from '../api/products';

import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

import CardProduct from "../components/Fragments/CardProduct";
import TableCart from "../components/Fragments/TableCart";
import ErrorBoundary from "../components/Elements/ErrorBoundary";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        const payload = {
            message: `Successfully added "${product.title.substring(0, 20)}..." to cart`,
            type: 'success'
        };
        dispatch(showNotification(payload));
    };

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Fragment>
                {/* Search Input */}
                <div className="w-full flex justify-center mt-6 mb-4">
                    <input
                        id="search" name="search" type="text"
                        className="border border-gray-300 px-4 py-2 rounded w-1/2"
                        placeholder="Search product..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Konten Utama */}
                <div className="flex justify-center py-5">
                    <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {isLoading && <p className="text-xl text-center col-span-full w-full">Loading products...</p>}
                        {isError && <p className="text-xl text-red-500 text-center col-span-full w-full">Error: {error}</p>}
                        {!isLoading && !isError && filteredProducts.map((product) => (
                            <CardProduct key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <CardProduct.Header image={product.image} />
                                    <CardProduct.Body title={product.title}>
                                        {product.description}
                                    </CardProduct.Body>
                                </Link>
                                <CardProduct.Footer
                                    price={product.price}
                                    handleAddToCart={() => handleAddToCart(product)}
                                />
                            </CardProduct>
                        ))}
                    </div>
                    <TableCart />
                </div>
            </Fragment>
        </ErrorBoundary>
    );
};

export default ProductsPage;
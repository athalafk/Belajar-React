import { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../redux/actions/cartActions";
import { fetchProducts } from "../redux/actions/productActions";
import CardProduct from "../components/Fragments/CardProduct";
import TableCart from "../components/Fragments/TableCart";
import ErrorBoundary from "../components/Elements/ErrorBoundary";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
                    <div className="w-[80%] flex flex-wrap gap-2 justify-center">
                        {loading ? (
                            <p className="text-xl">Loading products...</p>
                        ) : error ? (
                            <p className="text-xl text-red-500">Error: {error}</p>
                        ) : (
                            products
                                .filter((product) =>
                                    product.title.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((product) => (
                                    <Link to={`/product/${product.id}`} key={product.id}> 
                                        <CardProduct>
                                            <CardProduct.Header image={product.image} />
                                            <CardProduct.Body title={product.title}>
                                                {product.description}
                                            </CardProduct.Body>
                                            <CardProduct.Footer
                                                price={product.price}
                                                handleAddToCart={(e) => {
                                                    e.preventDefault();
                                                    dispatch(addToCart(product));
                                                }}
                                            />
                                        </CardProduct>
                                    </Link>
                                ))
                        )}
                    </div>
                    <TableCart />
                </div>
            </Fragment>
        </ErrorBoundary>
    );
};

export default ProductsPage;
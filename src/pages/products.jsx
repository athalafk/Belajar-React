import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faChevronDown, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import CardProduct from "../components/Fragments/CardProduct";
// import Counter from "../components/Fragments/Counter";

const email = localStorage.getItem("email");
const username = email ? email.split('@')[0] : '';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const { cart, handleAddToCart, handleRemoveItem, handleClearCart } = useContext(CartContext); 

    const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((item) => ({
                    ...item,
                    qty: 0,
                }));
                setProducts(formatted);
            })
            .catch((error) => console.error("Error fetching products:", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    };

    //useRef
    const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

    const handleAddToCartWithRef = (product) => {
        const existingItemIndex = cartRef.current.findIndex(
            (item) => item.id === product.id
        );

        if (existingItemIndex !== -1) {
            cartRef.current[existingItemIndex].qty += 1;
        } else {
            cartRef.current.push({ ...product, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cartRef.current));
    };

    const totalPriceRef = useRef(null)

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "block" : "none";
        }
    }, [cart]);

    // Lifecycle
    // const [showCounter, setShowCounter] = useState(true);

    return (
        <Fragment>
            <div className="flex justify-between h-20 bg-blue-600 text-white items-center px-10">
                <h1 className="text-2xl font-bold">TokoSaya</h1>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg"
                    >
                        <span className="capitalize">{username}</span>
                        <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1 text-gray-700">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full flex justify-center mt-6 mb-4">
                <input
                    id="search"
                    name="search"
                    type="text"
                    className="border border-gray-300 px-4 py-2 rounded w-1/2"
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex justify-center py-5">
                <div className="w-[80%] flex flex-wrap gap-2 justify-center">
                    {loading ? (
                        <p className="text-xl">Loading products...</p>
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
                                                e.preventDefault()
                                                handleAddToCart(product)
                                            }}
                                        />
                                    </CardProduct>
                                </Link>
                            ))
                    )}
                </div>

                <div className="w-[29%] p-4 bg-white rounded-lg shadow">
                    <h1 className="text-3xl text-blue-600 mb-4">Cart</h1>
                    <table className="w-full text-sm text-left text-gray-700 table-fixed">
                        <thead className="text-xs text-gray-500 uppercase border-b">
                            <tr>
                                <th className="py-2 px-4 w-5/12">Product</th>
                                <th className="py-2 px-4 w-3/12">Price</th>
                                <th className="py-2 px-4 w-1/12">Qty</th>
                                <th className="py-2 px-4 w-3/12">Total</th>
                                <th className="py-2 px-4 w-1/12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4 text-sm">{item.title}</td>
                                    <td className="py-2 px-4 text-sm">
                                        {item.price?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "USD",
                                        }) || "-"}
                                    </td>
                                    <td className="py-2 px-4 text-sm">{item.qty}</td>
                                    <td className="py-2 px-4 text-sm">
                                        {(item.price * item.qty)?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "USD",
                                        }) || "-"}
                                    </td>
                                    <td className="py-2 px-2 text-right">
                                        <button onClick={() => handleRemoveItem(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="w-5 h-5 text-red-600 hover:text-red-800" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {cart.length > 0 && (
                                <tr className="border-t">
                                    <td colSpan="2" className="py-3">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm shadow"
                                            onClick={handleClearCart}
                                        >
                                            Clear Cart
                                        </button>
                                    </td>
                                    <td colSpan="3" className="py-3 text-right font-semibold text-blue-600">
                                        Total:{" "}
                                        {totalPrice.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {cart.length === 0 && (
                        <p className="mt-4 text-sm text-gray-500 italic text-center">Cart is empty</p>
                    )}
                </div>
            </div>
            {/* Lifecycle Example
            <div className="mt-5 flex justify-center mb-5 flex-col items-center">
            <button
                className="mb-3 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowCounter(!showCounter)}
            >
                {showCounter ? "Hide Counter" : "Show Counter"}
            </button>

            {showCounter && <Counter />}
        </div> */}
        </Fragment>
    );
};

export default ProductsPage;

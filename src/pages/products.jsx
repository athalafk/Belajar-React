import { Fragment, useState, useEffect, useRef } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";
// import Counter from "../components/Fragments/Counter";

const email = localStorage.getItem("email");

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [search, setSearch] = useState("");

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
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
        setTotalPrice(total);
    }, [cart]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    };

    const handleAddToCart = (product) => {
        const existingItem = cart.find((item) => item.title === product.title);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.title === product.title
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { title: product.title, qty: 1, price: product.price }]);
        }
    };

    const handleRemoveItem = (title) => {
        const updatedCart = cart.filter((item) => item.title !== title);
        setCart(updatedCart);
    };

    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
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
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
                {email}
                <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>

            <div className="w-full flex justify-center mt-6 mb-4">
                <input
                    type="text"
                    className="border border-gray-300 px-4 py-2 rounded w-1/2"
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex justify-center py-5">
                <div className="w-3/4 flex flex-wrap gap-0">
                    {products
                        .filter((product) =>
                            product.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((product) => (
                            <CardProduct key={product.id}>
                                <CardProduct.Header image={product.image} />
                                <CardProduct.Body title={product.title}>
                                    {product.description}
                                </CardProduct.Body>
                                <CardProduct.Footer
                                    price={product.price}
                                    handleAddToCart={() => handleAddToCart(product)}
                                />
                            </CardProduct>
                        ))}
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
                                        <button onClick={() => handleRemoveItem(item.title)}>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth="1.5" 
                                                stroke="currentColor" 
                                                className="w-5 h-5 text-red-600 hover:text-red-800"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.71c-1.123 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                                                />
                                            </svg>
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

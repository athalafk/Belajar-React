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
                <div className="w-3/4 flex flex-wrap gap-4">
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

                <div className="w-1/4 p-4 bg-white rounded-lg shadow">
                    <h1 className="text-3xl text-blue-600 mb-4">Cart</h1>
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-500 uppercase border-b">
                            <tr>
                                <th className="py-2">Product</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Qty</th>
                                <th className="py-2">Total</th>
                                <th className="py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2">{item.title}</td>
                                    <td className="py-2">
                                        {item.price?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "USD",
                                        }) || "-"}
                                    </td>
                                    <td className="py-2">{item.qty}</td>
                                    <td className="py-2">
                                        {(item.price * item.qty)?.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "USD",
                                        }) || "-"}
                                    </td>
                                    <td className="py-2 text-right">
                                        <button
                                            className="text-red-600 hover:underline text-sm"
                                            onClick={() => handleRemoveItem(item.title)}
                                        >
                                            Hapus
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

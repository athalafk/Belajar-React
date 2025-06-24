import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItem, clearCart } from "../../redux/features/cartSlice";

const TableCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.data);

    const totalPrice = useMemo(() => {
        if (!cart) return 0;
        return cart.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
    }, [cart]);

    return (
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
                                <button onClick={() => dispatch(removeItem(item.id))}>
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
                                    onClick={() => dispatch(clearCart())}
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
    );
};

export default TableCart;
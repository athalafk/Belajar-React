import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Button from "../components/Elements/Button";

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="mb-8">
        <Link to="/products" className="text-blue-600 hover:underline">
          &larr; Back to Products
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-10 bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="md:w-1/3 flex justify-center">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain rounded-lg" />
        </div>
        <div className="md:w-2/3">
          <span className="text-sm text-gray-500 mb-2 block capitalize bg-gray-200 px-2 py-1 rounded-full w-max">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
          <p className="text-gray-700 text-base mb-6 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-4xl font-bold text-blue-600">
              {product.price.toLocaleString("id-ID", { style: "currency", currency: "USD" })}
            </span>
            <Button 
                classname="bg-blue-600 text-white px-10"
                onClick={() => handleAddToCart(product)}
            >
                Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
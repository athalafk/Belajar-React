import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from "../redux/actions/singleProductActions";
import { addToCart } from "../redux/actions/cartActions";

import Button from "../components/Elements/Button";

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loadingSingle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Product not found.</div>
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
      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="md:w-1/3 flex justify-center">
          <img src={selectedProduct.image} alt={selectedProduct.title} className="max-h-96 object-contain rounded-lg" />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <div>
            <span className="text-sm text-gray-500 mb-2 block capitalize bg-gray-200 px-2 py-1 rounded-full w-max">{selectedProduct.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{selectedProduct.title}</h1>
            <p className="text-gray-700 text-base mb-6 leading-relaxed">{selectedProduct.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-6">
            <span className="text-4xl font-bold text-blue-600">
              {selectedProduct.price.toLocaleString("id-ID", { style: "currency", currency: "USD" })}
            </span>
            <Button 
              classname="bg-blue-600 text-white px-10"
              onClick={() => dispatch(addToCart(selectedProduct))}
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
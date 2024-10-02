import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Fetch products from your API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products/allProducts");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Scatch</h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <FaShoppingCart className="mr-2" />
          Cart ({cart.length})
        </button>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setIsCartOpen(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
              </div>
            ))}
            <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full">Checkout</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description} lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
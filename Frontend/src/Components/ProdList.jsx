import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProdList = () => {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let data = await fetch("http://localhost:3000/productList", {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await data.json();
    setProducts(result);
  };

  const delItem = async (id) => {
    let result = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    try {
      result = await result.json();
      alert("Product deleted");
      getProducts(); // Refresh the product list
    } catch (error) {
      alert(error);
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:3000/search/${key}`);
      try {
        result = await result.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-12 mx-auto">
        {/* Search Input */}
        <div className="w-full mb-6">
          <input
            type="text"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search Products..."
            onChange={searchHandler}
          />
        </div>

        {/* Product List */}
        {Products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Products.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                <div className="text-gray-500 text-xs uppercase tracking-wide">{item.category}</div>
                <h1 className="text-lg font-semibold text-gray-900 mt-2">{item.name}</h1>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Price:</span> ${item.price}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Company:</span> {item.company}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => delItem(item._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm font-medium transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update/${item._id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-md text-sm font-medium transition hover:bg-blue-700"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500 mt-10">🚀 No products available!</div>
        )}
      </div>
    </section>
  );
};

export default ProdList;

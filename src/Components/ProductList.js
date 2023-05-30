import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      getProducts();
    
    // eslint-disable-next-line
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:4200/products");
    result = await result.json();
    setProducts(result);
  };

  const onDelete = async (id) => {
    let result = await fetch(`http://localhost:4200/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => onDelete(item._id)} type="button">
              Delete
            </button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate= useNavigate();


  useEffect(() => {
      getProductDetails();
    // eslint-disable-next-line
  }, [params.id]);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4200/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    console.log(result);
  };

  const updateProduct = async () => {
    console.log({ name, price, category, company });
    let result = await fetch(`http://localhost:4200/product/${params.id}`,
    {
      method:'put',
      body: JSON.stringify({name, price, category, company}),
      headers:{
        'Content-Type': 'application/json',
      }
    })
    result= await result.json();
    navigate('/');
  };

  return (
    <div className="product">
      <h1>Update Products</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Update Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Update Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Update Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Update Product company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />

      <button
        onClick={ updateProduct}
        className="appButton"
        type="button "
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;

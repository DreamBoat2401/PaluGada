import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

export default function ProductForm({
  base_url,
  formTitle,
  nameProp,
  handleSubmit,
  product,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImgUrl(product.imgUrl);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 via-teal-300 to-purple-300">
  <div className="w-full max-w-2xl bg-white text-black shadow-2xl p-10 rounded-2xl transform hover:scale-105 transition duration-300 ease-in-out">
    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
      {formTitle}
    </h1>
    <form
      className="space-y-8"
      onSubmit={(event) =>
        handleSubmit(
          event,
          name,
          description,
          price,
          imgUrl,
          stock,
          categoryId
        )
      }
    >
      <div className="form-control">
        <label htmlFor="name" className="label font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="imgUrl" className="label font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="imgUrl"
          className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label htmlFor="price" className="label font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="stock" className="label font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="categoryId" className="label font-medium text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          className="select select-bordered w-full bg-gray-100 text-black shadow-md rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center mt-4">
        <Button nameProp={nameProp} />
      </div>

      {/* <button
        type="submit"
        className="btn w-full mt-6 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg rounded-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <i className="fas fa-paper-plane"></i> {buttonText}
      </button> */}
    </form>
  </div>
</div>

  );
}
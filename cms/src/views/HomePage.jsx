import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function HomePage({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function priceBeingRupiah(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const navigate = useNavigate();

  function handleEdit(e, id) {
    e.preventDefault();
    navigate(`/edit/${id}`);
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${base_url}/apis/branded-things/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
             }
        },
        fetchProduct()
      );
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#BAD850",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
  <div className="min-h-screen min-w-screen flex flex-col items-center justify-center mt-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
    <img
      src="https://media.giphy.com/media/3oriOiizS4Pmofj46A/giphy.gif?cid=ecf05e475hknyllb9cmscwzftlrmhw49rqdafxrzaq9wbagl&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      className="w-24 h-24 mb-4"
      alt="Loading..."
    />
    <p className="text-xl font-bold text-gray-800 animate-pulse">Loading ...</p>
  </div>
) : (
  <div className="overflow-x-auto p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 rounded-lg shadow-lg">
    <table className="table-auto w-full text-gray-800">
      <thead className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-t-lg">
        <tr>
          <th className="px-4 py-2">No.</th>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {product.slice().reverse().map((el, index) => (
          <tr
            key={el.id}
            className={`${
              index % 2 === 0 ? "bg-indigo-50" : "bg-purple-50"
            } hover:bg-indigo-100 transition-colors duration-200`}
          >
            <td className="px-4 py-2 text-center">{index + 1}</td>
            <td className="px-4 py-2">
              <div className="font-semibold text-gray-800">{el.name}</div>
            </td>
            <td className="px-4 py-2 max-w-sm text-gray-700"><img src={el.imgUrl} alt="" /></td>
            <td className="px-4 py-2 text-gray-800">{priceBeingRupiah(el.price)}</td>
            <td className="px-4 py-2 text-center">{el.stock}</td>
            <td className="px-4 py-2">
              <div className="flex gap-2 justify-center">
                <button
                  className="btn btn-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-lg rounded-full flex items-center gap-2 px-3 py-1 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                  onClick={(e) => handleEdit(e, el.id)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-sm bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow-lg rounded-full flex items-center gap-2 px-3 py-1 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                  onClick={(e) => handleDelete(e, el.id)}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
                    <Link to={`/upload-image/${el.id}`}>
                        <button className="btn btn-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold shadow-lg rounded-full flex items-center gap-2 px-3 py-1 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                         <i className="fas fa-image"></i> Upload Image
                        </button>
                    </Link>
                     </div>
                 </td>
              </tr>
             ))}
            </tbody>
        </table>
     </div>
    )}
    </>
  );
}
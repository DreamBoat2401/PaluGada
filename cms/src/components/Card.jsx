import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import Toastify from 'toastify-js'
import { useState } from "react";


export default function Card({ product, base_url, fetchProducts }) {
    const [file, setFile] = useState('')
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${base_url}/apis/branded-things/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            // fetchProducts()
            // Toastify({
            //     text: `Succedd delete data`,
            //     duration: 3000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "bottom", // `top` or `bottom`
            //     position: "right", // `left`, `center` or `right`
            //     stopOnFocus: true, // Prevents dismissing of toast on hover
            //     style: {
            //         background: "#008000",
            //     },
            //     onClick: function () { } // Callback after click
            // }).showToast();
        } catch (error) {
            // Toastify({
            //     text: error.response.data.error,
            //     duration: 3000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "bottom", // `top` or `bottom`
            //     position: "right", // `left`, `center` or `right`
            //     stopOnFocus: true, // Prevents dismissing of toast on hover
            //     style: {
            //         background: "#FF0000",
            //     },
            //     onClick: function () { } // Callback after click
            // }).showToast();
        }
    }

    async function handleUpload() {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.patch(`${base_url}/apis/branded-things/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            fetchProducts()
            // Toastify({
            //     text: data.message,
            //     duration: 3000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "bottom", // `top` or `bottom`
            //     position: "right", // `left`, `center` or `right`
            //     stopOnFocus: true, // Prevents dismissing of toast on hover
            //     style: {
            //         background: "#008000",
            //     },
            //     onClick: function () { } // Callback after click
            // }).showToast();
        } catch (error) {
            // Toastify({
            //     text: error.response.data.error,
            //     duration: 3000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "bottom", // `top` or `bottom`
            //     position: "right", // `left`, `center` or `right`
            //     stopOnFocus: true, // Prevents dismissing of toast on hover
            //     style: {
            //         background: "#FF0000",
            //     },
            //     onClick: function () { } // Callback after click
            // }).showToast();
        }
    }

    return (
        <>
            <div className="card glass shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
  <figure className="px-6 pt-6">
    <img
      src={product.imgUrl}
      alt="product"
      className="w-full h-64 object-cover rounded-lg shadow-md"
    />
  </figure>
  <div className="card-body p-6">
    <h2 className="text-center text-2xl font-semibold text-gray-800">{product.name}</h2>
    <p className="text-center text-gray-600 mt-3">
      {product.description.length > 100 ? product.description.substring(0, 100) + " . . ." : product.description}
    </p>
    <div className="divider mt-4"></div>
    <div className="flex justify-center space-x-4 mt-4">
      <i
        className="fa-solid fa-circle-info fa-xl text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
        onClick={() => navigate(`/detail/${product.id}`)}
      ></i>
      <i
        className="fa-solid fa-trash fa-xl text-red-500 hover:text-red-700 cursor-pointer transition-colors"
        onClick={handleDelete}
      ></i>
      <i
        className="fa-solid fa-pen-to-square fa-xl text-green-500 hover:text-green-700 cursor-pointer transition-colors"
        onClick={() => navigate(`/edit/${product.id}`)}
      ></i>
    </div>
    <div className="flex items-center justify-center mt-5 space-x-3">
      <input
        type="file"
        className="file-input file-input-bordered file-input-sm max-w-xs w-3/4 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <i
        className="fa-solid fa-upload fa-lg text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        onClick={handleUpload}
      ></i>
    </div>
  </div>
</div>

        </>
    )
}
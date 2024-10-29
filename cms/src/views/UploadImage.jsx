import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function UploadImage({ base_url }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState({});
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  async function fetchImage() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setName(data.data.name);
      setImgUrl(data.data.imgUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageSelect(event) {
    try {
      event.preventDefault();
      const image = event.target.files[0];
      setImageUpload(image);
      if (image) {
        const imgUrl = URL.createObjectURL(image);
        setImgUrl(imgUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    try {
      setUploading(true);
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", imageUpload);

      const { data } = await axios.patch(
        `${base_url}/apis/branded-things/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Toastify({
        text: `${data.message}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 via-teal-300 to-purple-400">
  <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg transform hover:scale-105 transition-all duration-300">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">{`Edit Image for ${name}`}</h1>
    
    <div className="flex justify-center mb-8">
      <img
        src={imgUrl}
        alt="Product"
        className="w-60 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
    </div>

    <form action="" method="POST" className="space-y-6">
      <input
        type="file"
        accept="image/*"
        name="file"
        onChange={(event) => handleImageSelect(event)}
        className="file-input file-input-bordered w-full bg-gray-100 text-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      
      <button
        onClick={(event) => handleSubmit(event)}
        className="btn w-full mt-6 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg rounded-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <i className="fas fa-save"></i> Save Image
      </button>
    </form>

    {uploading && (
      <div className="flex items-center justify-center mt-6 gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-gray-700">Uploading...</p>
      </div>
    )}
  </div>
</div>
  );
}
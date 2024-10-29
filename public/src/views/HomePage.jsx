import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios"
import gearLoad from "../assets/loading.svg"


export default function HomePage( { base_url }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const pagination = getPagination();

  function getPagination() {
    let temp = []
    for (let i = 1; i <= totalPage; i++) {
        temp.push(i)
    }

    return temp
}


function handlePrev() {
  if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
  }
}

function handleNext() {
  if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
  }
}

  async function fetchProducts() {
    try {
      setLoading(true);
      let url = `${base_url}/apis/pub/branded-things/products?q=${search}&limit=10&page=${currentPage}&i=${currentCategory}`
      if (sort) {
        url += `sort=${sort}`;
      }

      if (currentCategory) {
        url += `categoryId=${currentCategory}`;
      }

      const { data } = await axios.get(`${base_url}/apis/pub/branded-things/products?q=${search}&limit=10&page=${currentPage}&i=${currentCategory}`);

      if (data.data && data.data.query.length > 0) {
        setProducts(data.data.query);
        setTotalPage(data.data.pagination.totalPage);
        setCurrentPage(data.data.pagination.currentPage);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/pub/branded-things/categories`
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function handleCategoryChange(e) {
    setCurrentCategory(
      e.target.value.replaceAll(" ", "%20").replaceAll("&", "%26") 
    );
    setCurrentPage(1);
  }

  function handleSearch(e) {
    e.preventDefault()
    setCurrentPage(1)
    fetchProducts()
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [currentPage, sort, currentCategory]);

    return (
      <>
  <div className="flex flex-col items-center bg-gray-100 min-h-screen py-12 px-4 md:px-10" id="PAGE-HOME">
    <a className="flex flex-col text-4xl font-extrabold text-center text-blue-400 py-10">
      <h1>PaluGada</h1>
    </a>
    <br />
    <div className="w-full flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-6">
      <form className="form-control w-full max-w-lg shadow-lg rounded-lg bg-white" onSubmit={handleSearch}>
        <div className="input-group flex items-center p-2 rounded-full">
          <input
            type="text"
            placeholder="Cari produk..."
            className="input input-bordered w-full rounded-full focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out px-4 py-2 text-gray-800"
            style={{ borderColor: "#E5E7EB", borderWidth: "2px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn bg-blue-500 text-white hover:bg-blue-600 ml-2 flex items-center justify-center rounded-full shadow-md"
            style={{ width: "48px", height: "48px", padding: "0" }}>
            Search
          </button>
        </div>
      </form>

      <div className="form-control max-w-xs shadow-lg rounded-lg bg-white">
        <select
          className="select select-bordered w-full rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
          style={{ borderColor: "#E5E7EB", borderWidth: "2px" }}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <div className="form-control max-w-xs shadow-lg rounded-lg bg-white">
        <select
          className="select select-bordered w-full rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
          style={{ borderColor: "#E5E7EB", borderWidth: "2px" }}
          onChange={(e) => handleCategoryChange(e)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name.replace(" ", "%20")}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    {loading ? (
      <div className="mt-32 flex justify-center items-center">
        <img src={gearLoad} alt="Loading" className="animate-spin w-12 h-12" />
      </div>
    ) : (
      <>
        {products.length > 0 ? (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 p-6">
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                base_url={"https://h8-phase2-gc.vercel.app"}
                fetchProducts={fetchProducts}
              />
            ))}
          </main>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-xl text-gray-500">Product not found :/</p>
          </div>
        )}

        <div className="join mt-10 flex items-center justify-center space-x-2">
          <button
            className="join-item btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full shadow-md"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            «
          </button>
          {pagination.map((el) => (
            <button
              key={el}
              className={
                el === currentPage
                  ? "join-item btn btn-active bg-blue-600 text-white rounded-full shadow-lg px-4 py-2"
                  : "join-item btn bg-blue-500 text-white hover:bg-blue-600 rounded-full shadow-md px-4 py-2"
              }
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          ))}
          <button
            className="join-item btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full shadow-md"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            »
          </button>
        </div>
      </>
    )}
  </div>
</>

    )
}
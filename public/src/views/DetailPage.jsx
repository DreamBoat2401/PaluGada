import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function DetailPage({ base_url }) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get(`${base_url}/apis/pub/branded-things/products/${id}`)
                setProduct(data.data)
            } catch (error) {
                console.error("Error fetching data")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    },[id, base_url])

    if (loading) {
        return (
          <div className="mt-32 flex justify-center items-center">
            <img src="/loading.svg" alt="Loading" />
          </div>
        );
      }
    
      if (!product) {
        return <p>Product is not found</p>;
      }    

    return (
        <>
        <div className="flex flex-col bg-base-100 my-6 items-center p-20  bg-gray-100 shadow">
                        <img
                            src={product.imgUrl}
                            alt={product.name}
                            className="max-w-sm rounded-lg shadow mb-5"
                        />
                        <div>
                            <div className="texts">
                                <h1 className="text-5xl font-bold text-accent-focus">{product.name}</h1>
                                <div className="py-6">
                                    <p>{product.description}</p>
                                    <br></br>
                                    <p>Stock: {product.stock}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/" className="btn btn-accent">Back</Link>
                            </div>
                        </div>
                    </div>
        </>
    )
}
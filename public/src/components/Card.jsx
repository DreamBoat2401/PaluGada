import { useNavigate } from "react-router-dom"

export default function Card({ product }) {
  const navigate = useNavigate()

  function handleOnClick() {
    navigate(`/detail/${product.id}`)
  }
    return(
        <>
        {/* card 1 */}
        <div className="card glass shadow-lg" onClick={handleOnClick}>
          <div className="flex flex-1">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex flex-col divide-y divide-black">
            <b className="mt-5">{product.name}</b>
            <p>
            {product.description.length > 100 ? product.description.substring(0, 100) + " . . ." : product.description}
            </p>
          </div>
        </div>
        </>
    )
}
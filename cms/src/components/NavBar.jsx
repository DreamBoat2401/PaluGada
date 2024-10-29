import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
        <nav className="navbar sticky top-0 z-10 p-4 bg-gray-100 shadow flex items-center justify-between">
            <div className="navbar-start">
                <Link to="/" className="text-2xl font-bold px-4 text-blue-500 hover:text-blue-700 transition duration-200">
                    PaluGada
                 </Link>
            </div>
  
        <div className="navbar-end flex items-center space-x-3">
            <Link to="/add-product" className="btn btn-accent btn-sm hover:bg-accent-dark transition duration-200">
                Add Product
            </Link>
            <Link to="/login" className="btn btn-neutral btn-sm hover:bg-neutral-dark transition duration-200">
                Login
            </Link>
                <button className="btn btn-error btn-sm hover:bg-red-600 transition duration-200" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
        </>
    )
}
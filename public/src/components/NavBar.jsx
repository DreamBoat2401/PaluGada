

export default function NavBar() {

    return (
        <>
        <nav className="sticky top-0 z-10 p-3 bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <div>
        <a className="text-2xl font-bold px-6">
          <span>Home</span>
        </a>
        <a className="text-2xl font-bold px-6">
          <span>Add Products</span>
        </a>
        <a className="text-2xl font-bold px-6">
          <span>Logout</span>
        </a>
      </div>
    </nav>
    <br />
    <a className="flex flex-col text-4xl font-extrabold text-center text-blue-400 py-10">
      <h1>PaluGada</h1>
    </a>
    <br />
    <div className="flex justify-center">
      <input type="input" placeholder="Search your product here" />
    </div>
        </>
    )
}
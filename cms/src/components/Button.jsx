export default function Button({ nameProp }) {

    return (
        <>
        <button className="btn w-full mt-6 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg rounded-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            { nameProp }
        </button>
        </>
    )
}
export default function Navbar() {
    return (
        <div className="absolute top-2 bottom-2 left-3/4 right-2 rounded-r-2xl bg-amber-700 text-black p-4 flex flex-col justify-center items-center gap-5">
            <div className="flex gap-5 justify-center bg-yellow-200 rounded-md w-fit px-4 py-1">
                <input type="search" name="searchById" placeholder="Rechercher une id" className="bg-transparent outline-none" />
                <label htmlFor="searchById">R</label>
            </div>
            <div className="flex flex-col gap-5">
                <button className="bg-green-800 rounded-md text-white px-4 py-2 font-bold hover:bg-white hover:text-black cursor-pointer">CREATE</button>
                <button className="bg-green-800 rounded-md text-white px-4 py-2 font-bold hover:bg-white hover:text-black cursor-pointer">POST</button>
                <button className="bg-green-800 rounded-md text-white px-4 py-2 font-bold hover:bg-white hover:text-black cursor-pointer">PUT</button>
                <button className="bg-green-800 rounded-md text-white px-4 py-2 font-bold hover:bg-white hover:text-black cursor-pointer">UPDATE</button>
            </div>
        </div>  
    )
}
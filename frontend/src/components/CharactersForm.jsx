export default function CharactersForm() {
    return (
        <div className="absolute w-full h-screen flex justify-center items-center text-lg font-mono bg-yellow-200">
            <div className="bg-amber-700 p-10 rounded-2xl font-bold space-y-5">
                <div className="flex justify-between items-center gap-2">
                    <p>ID</p>
                    <input type="text" className="bg-white border-b-2 outline-none px-2" />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p>Name</p>
                    <input type="text" className="bg-white border-b-2 outline-none px-2" />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p>RealName</p>
                    <input type="text" className="bg-white border-b-2 outline-none px-2" />
                </div>
                <div className="flex justify-between items-center gap-2">
                    <p>Universe</p>
                    <input type="text" className="bg-white border-b-2 outline-none px-2" />
                </div>
                <button className="bg-yellow-400 rounded-2xl px-5 py-2 w-full items-end">CREATE</button>
            </div>
        </div>
    )
}
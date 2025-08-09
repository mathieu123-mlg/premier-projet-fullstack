export default function NavBar() {
    return (
        <nav className="bg-gray-800 fixed w-full z-10 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-2xl">★</span>
                    <h1 className="text-white text-xl font-bold">Heroes Manager</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    <span className="text-gray-300 text-sm">Connecté en tant qu'admin</span>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                        Déconnexion
                    </button>
                </div>
            </div>
        </nav>
    );
}
export default function ListCharacters({ character, onSelect, currentUserRole }) {
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-500';
            case 'editor': return 'bg-blue-500';
            default: return 'bg-green-500';
        }
    };

    return (
        <div 
            onClick={() => onSelect(character)}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:translate-y-[-2px]"
        >
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-yellow-400">{character.name}</h3>
                    {currentUserRole === 'admin' && (
                        <span className={`${getRoleColor(character.role)} text-xs text-white px-2 py-1 rounded-full`}>
                            {character.role}
                        </span>
                    )}
                </div>
                
                <div className="mt-2 text-gray-300">
                    <p><span className="font-semibold">Nom réel:</span> {character.realName}</p>
                    <p><span className="font-semibold">Univers:</span> {character.universe}</p>
                </div>
            </div>
            
            <div className="bg-gray-700 px-4 py-2 text-right">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(character);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                >
                    Modifier
                </button>
            </div>
        </div>
    );
}
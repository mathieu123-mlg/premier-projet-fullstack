import { useState, useEffect } from 'react';
import ListCharacters from './components/ListCharacters';
import NavBar from './components/Navbar';
import CharactersForm from './components/CharactersForm';

export default function App() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [operationType, setOperationType] = useState(null);

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };

    const loadCharacters = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/characters');
            if (!response.ok) throw new Error('Erreur de chargement');
            const data = await response.json();
            
            const validatedCharacters = data.characters.map(char => ({
                ...char,
                id: char.id || generateId()
            }));
            
            setCharacters(validatedCharacters || []);
        } catch (err) {
            console.error("Erreur:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    const handleCreate = () => {
        setSelectedCharacter({
            id: generateId(),
            name: '',
            realName: '',
            universe: '',
            role: 'user' // Valeur par défaut
        });
        setOperationType('CREATE');
    };

    const handleSelect = (character) => {
        setSelectedCharacter(character);
        setOperationType('UPDATE');
    };

    const handleOperationSuccess = async (updatedCharacter) => {
        if (operationType === 'CREATE') {
            setCharacters(prev => [...prev, updatedCharacter]);
        } else {
            setCharacters(prev => prev.map(c => 
                c.id === updatedCharacter.id ? updatedCharacter : c
            ));
        }
        
        try {
            await loadCharacters();
        } catch (err) {
            console.error("Synchro échouée:", err);
        }
        
        setSelectedCharacter(null);
    };

    const handleDeleteSuccess = (deletedId) => {
        setCharacters(prev => prev.filter(c => c.id !== deletedId));
        setSelectedCharacter(null);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <NavBar />
            
            <div className="container mx-auto p-4 pt-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Gestion des Personnages</h1>
                    <button 
                        onClick={handleCreate}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        + Ajouter un personnage
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                        <p>{error}</p>
                        <button 
                            onClick={loadCharacters}
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Réessayer
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {characters.map(character => (
                            <ListCharacters 
                                key={character.id} 
                                character={character} 
                                onSelect={handleSelect}
                                currentUserRole="admin" // À remplacer par la logique réelle
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedCharacter && (
                <CharactersForm 
                    character={selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                    operationType={operationType}
                    onSuccess={handleOperationSuccess}
                    onDeleteSuccess={handleDeleteSuccess}
                    currentUserRole="admin" // À remplacer par la logique réelle
                />
            )}
        </div>
    );
}
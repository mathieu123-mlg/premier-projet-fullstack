import { useEffect, useState } from 'react';
import ListCharacters from './components/ListCharacters';
import NavBar from './components/NavBar';
import CharactersForm from './components/CharactersForm';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/characters');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCharacters(data.characters);
    };

    fetchData();
  }, []);

  return (
    <div className='bg-black w-full h-screen'>

      <div className="absolute top-2 left-2 right-1/4 flex flex-col bg-amber-700 rounded-l-2xl">
        <h1 className="p-8 pb-0 text-4xl text-zinc-900 font-bold mb-6">Liste des Characters</h1>
        <div className="flex flex-wrap gap-4 overflow-x-hidden pl-8 py-8 w-full h-80">
          {characters.map(item => (
            <ListCharacters key={item.id} character={item} />
          ))}
        </div>
      </div>
      <NavBar />
      {/* <CharactersForm /> */}
    </div>
  );
}

export default App;
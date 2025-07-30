export default function ListCharacters({ character }) {
  return (
    <div className="flex gap-2 bg-yellow-200 w-74 rounded-2xl p-8">
        <p>
            <span className="font-bold text-white bg-amber-800 px-3 py-1.5 border-gray-800 border-3 rounded-full">{character.id}</span>
        </p>
        <div className="flex flex-col items-start gap-1 font-mono border-l-2 border-amber-800 pl-2 text-xs text-lime-700">
            <p><span className="font-bold text-zinc-800">Name: </span>
                {character.name}
            </p>
            <p><span className="font-bold text-zinc-800">RealName: </span>
                {character.realName}
            </p>
            <p><span className="font-bold text-zinc-800">Universe: </span>
                {character.universe}
            </p>
        </div>
    </div>
  );
}

export default function CreateCharacter({ character }) {
    return (
        <div className="flex items-center gap-4 bg-zinc-600/80 hover:bg-zinc-600 w-full h-fit rounded-2xl p-6 cursor-pointer transition-all group">
            <div className="flex flex-col items-start gap-1 font-mono text-sm text-lime-300/80 group-hover:text-lime-300">
                <p><span className="font-bold text-zinc-300">Name: </span>
                    {character.name}
                </p>
                <p><span className="font-bold text-zinc-300">RealName: </span>
                    {character.realName}
                </p>
                <p><span className="font-bold text-zinc-300">Universe: </span>
                    {character.universe || "Sélectionner"}
                </p>
            </div>
            <div className="text-white h-14 w-14 border-lime-200 border-2 flex justify-center items-center rounded-full text-7xl font-extralight hover:bg-zinc-900 ml-auto">
                <span className='-translate-y-2'>+</span>
            </div>
        </div>
    );
}
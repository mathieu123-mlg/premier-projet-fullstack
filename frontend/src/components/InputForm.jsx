export default function InputForm({ label, name, value, onChange, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-gray-300 text-sm font-medium">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                value={value}
                onChange={(e) => onChange(e)}
                className="bg-gray-700 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
                {...props}
            />
        </div>
    );
}
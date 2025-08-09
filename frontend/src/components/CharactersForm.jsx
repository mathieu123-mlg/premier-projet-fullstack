import InputForm from "./InputForm";
import { useState } from "react";

export default function CharactersForm({ 
    character, 
    onClose, 
    operationType, 
    onSuccess, 
    onDeleteSuccess,
    currentUserRole 
}) {
    const [formData, setFormData] = useState(character);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const method = operationType === "CREATE" ? 'POST' : 'PUT';
            const url = operationType === "CREATE" ? '/characters' : `/characters/${formData.id}`;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            
            const result = await response.json();
            onSuccess(result);
        } catch (error) {
            console.error("Erreur:", error);
            alert(`Erreur lors de ${operationType === "CREATE" ? "la création" : "la mise à jour"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Voulez-vous vraiment supprimer ce personnage?")) return;
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`/characters/${formData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression');
            
            onDeleteSuccess(formData.id);
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la suppression");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                    {operationType === "CREATE" ? "Créer un personnage" : "Modifier le personnage"}
                </h2>

                <div className="space-y-4">
                    <InputForm
                        label="Nom"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        autoFocus
                    />
                    <InputForm
                        label="Nom réel"
                        name="realName"
                        value={formData.realName}
                        onChange={(e) => handleChange('realName', e.target.value)}
                    />
                    <InputForm
                        label="Univers"
                        name="universe"
                        value={formData.universe}
                        onChange={(e) => handleChange('universe', e.target.value)}
                    />
                    
                    {currentUserRole === 'admin' && (
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Rôle</label>
                            <select
                                value={formData.role}
                                onChange={(e) => handleChange('role', e.target.value)}
                                className="bg-gray-700 text-white px-3 py-2 rounded outline-none"
                            >
                                <option value="user">Utilisateur</option>
                                <option value="editor">Éditeur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    {operationType === "UPDATE" && currentUserRole === 'admin' && (
                        <button
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Supprimer
                        </button>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded text-white disabled:opacity-50 ${
                            operationType === "CREATE" 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting 
                            ? "En cours..." 
                            : operationType === "CREATE" 
                                ? "Créer" 
                                : "Mettre à jour"}
                    </button>
                </div>
            </div>
        </div>
    );
}
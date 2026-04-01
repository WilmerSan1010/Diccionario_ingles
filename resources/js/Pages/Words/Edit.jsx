import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

const wordTypes = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'other'];

export default function Edit({ word }) {
    const { data, setData, patch, processing, errors } = useForm({
        word:        word.word,
        translation: word.translation,
        type:        word.type ?? '',
        example:     word.example ?? '',
        notes:       word.notes ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        patch(route('words.update', word.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        ✏️ Editar Palabra
                    </h2>
                    <Link
                        href={route('words.index')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition"
                    >
                        ← Volver a Mi Vocabulario
                    </Link>
                </div>
            }
        >
            <Head title={`Editar: ${word.word}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Palabra en inglés */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Palabra en inglés <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="word"
                                        type="text"
                                        value={data.word}
                                        onChange={e => setData('word', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                    />
                                    {errors.word && <p className="mt-1 text-xs text-red-500">{errors.word}</p>}
                                </div>

                                {/* Traducción */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Traducción al español <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="translation"
                                        type="text"
                                        value={data.translation}
                                        onChange={e => setData('translation', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                    />
                                    {errors.translation && <p className="mt-1 text-xs text-red-500">{errors.translation}</p>}
                                </div>

                                {/* Tipo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Tipo de palabra
                                    </label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                                    >
                                        <option value="">-- Selecciona --</option>
                                        {wordTypes.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Ejemplo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Oración de ejemplo
                                    </label>
                                    <textarea
                                        id="example"
                                        value={data.example}
                                        onChange={e => setData('example', e.target.value)}
                                        rows={3}
                                        placeholder="Ej: Be true to yourself."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                                    />
                                </div>

                                {/* Notas */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Notas personales
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        rows={2}
                                        placeholder="Algo extra que quieras recordar..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-1">
                                    <button
                                        id="btn-update-word"
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
                                    >
                                        {processing ? 'Guardando...' : '💾 Guardar Cambios'}
                                    </button>
                                    <Link
                                        href={route('words.index')}
                                        className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition text-center"
                                    >
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

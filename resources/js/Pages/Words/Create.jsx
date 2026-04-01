import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

const wordTypes = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'other'];

export default function Create() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        word: '',
        translation: '',
        type: '',
        example: '',
        notes: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('words.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ➕ Agregar Palabra
                </h2>
            }
        >
            <Head title="Agregar Palabra" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            {flash?.success && (
                                <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm font-medium">
                                    ✅ {flash.success}
                                </div>
                            )}

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
                                        placeholder="Ej: perseverance"
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
                                        placeholder="Ej: perseverancia"
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
                                        placeholder="Ej: His perseverance led him to success."
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

                                <button
                                    id="btn-save-word"
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
                                >
                                    {processing ? 'Guardando...' : '💾 Guardar Palabra'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

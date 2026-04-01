import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const typeBadgeColors = {
    noun:      'bg-blue-100 text-blue-700',
    verb:      'bg-green-100 text-green-700',
    adjective: 'bg-purple-100 text-purple-700',
    adverb:    'bg-yellow-100 text-yellow-700',
    phrase:    'bg-pink-100 text-pink-700',
    other:     'bg-gray-100 text-gray-600',
};

function TypeBadge({ type }) {
    if (!type) return null;
    const color = typeBadgeColors[type] ?? typeBadgeColors.other;
    return (
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
            {type}
        </span>
    );
}

export default function Search({ words, query: initialQuery }) {
    const [query, setQuery] = useState(initialQuery ?? '');

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('words.search'), { q: query }, { preserveState: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    🔍 Buscador de Palabras
                </h2>
            }
        >
            <Head title="Buscador" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    {/* Barra de búsqueda */}
                    <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                        <input
                            id="search-input"
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Busca en inglés o español..."
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-base"
                            autoFocus
                        />
                        <button
                            id="btn-search"
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95 transition"
                        >
                            Buscar
                        </button>
                    </form>

                    {/* Resultados */}
                    {initialQuery && words.length === 0 && (
                        <div className="rounded-lg bg-white shadow-sm p-10 text-center">
                            <p className="text-3xl mb-2">🤔</p>
                            <p className="text-gray-500">No se encontró <strong>"{initialQuery}"</strong> en tu vocabulario.</p>
                        </div>
                    )}

                    {words.length > 0 && (
                        <>
                            <p className="mb-3 text-sm text-gray-500">
                                {words.length} resultado{words.length !== 1 ? 's' : ''} para <strong>"{initialQuery}"</strong>
                            </p>
                            <div className="space-y-3">
                                {words.map(word => (
                                    <div
                                        key={word.id}
                                        className="rounded-lg bg-white shadow-sm p-5 border-l-4 border-indigo-500"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-lg font-bold text-gray-900">{word.word}</span>
                                                    <TypeBadge type={word.type} />
                                                </div>
                                                <p className="text-indigo-600 font-semibold">{word.translation}</p>
                                                {word.example && (
                                                    <p className="mt-2 text-sm text-gray-500 italic">"{word.example}"</p>
                                                )}
                                                {word.notes && (
                                                    <p className="mt-1 text-sm text-gray-400">📝 {word.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!initialQuery && (
                        <div className="rounded-lg bg-white shadow-sm p-10 text-center">
                            <p className="text-4xl mb-3">🔎</p>
                            <p className="text-gray-500">Escribe una palabra en inglés o español para buscarla.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

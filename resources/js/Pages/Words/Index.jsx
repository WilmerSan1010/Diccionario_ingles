import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

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

// Inertia pasa el paginador "aplanado": words.current_page, words.total, etc.
function Pagination({ words }) {
    if (words.last_page <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
                Mostrando {words.from}–{words.to} de {words.total} palabras
            </p>
            <div className="flex items-center gap-1">
                {/* Anterior */}
                {words.prev_page_url ? (
                    <Link
                        href={words.prev_page_url}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                        <ChevronLeft size={14} /> Anterior
                    </Link>
                ) : (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-300 cursor-not-allowed">
                        <ChevronLeft size={14} /> Anterior
                    </span>
                )}

                {/* Números de página */}
                <div className="flex items-center gap-1 mx-1">
                    {Array.from({ length: words.last_page }, (_, i) => i + 1).map(page => (
                        <Link
                            key={page}
                            href={`${route('words.index')}?page=${page}`}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                                page === words.current_page
                                    ? 'bg-indigo-600 text-white'
                                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                </div>

                {/* Siguiente */}
                {words.next_page_url ? (
                    <Link
                        href={words.next_page_url}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                        Siguiente <ChevronRight size={14} />
                    </Link>
                ) : (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-300 cursor-not-allowed">
                        Siguiente <ChevronRight size={14} />
                    </span>
                )}
            </div>
        </div>
    );
}

export default function Index({ words }) {
    const { flash } = usePage().props;
    const wordList = words.data; // los registros de la página actual

    function handleDelete(id) {
        if (confirm('¿Seguro que quieres eliminar esta palabra?')) {
            router.delete(route('words.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        📖 Mi Vocabulario
                    </h2>
                    <Link
                        href={route('words.create')}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        ➕ Agregar palabra
                    </Link>
                </div>
            }
        >
            <Head title="Mi Vocabulario" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm font-medium">
                            ✅ {flash.success}
                        </div>
                    )}

                    {wordList.length === 0 ? (
                        <div className="rounded-lg bg-white shadow-sm p-12 text-center">
                            <p className="text-4xl mb-3">📚</p>
                            <p className="text-gray-500 text-lg">Aún no has agregado ninguna palabra.</p>
                            <Link
                                href={route('words.create')}
                                className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                            >
                                Agrega tu primera palabra
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="mb-4 text-sm text-gray-500">
                                {words.total} palabra{words.total !== 1 ? 's' : ''} en total
                            </p>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-gray-600">Inglés</th>
                                            <th className="px-6 py-3 font-semibold text-gray-600">Español</th>
                                            <th className="px-6 py-3 font-semibold text-gray-600">Tipo</th>
                                            <th className="px-6 py-3 font-semibold text-gray-600">Ejemplo</th>
                                            <th className="px-6 py-3 font-semibold text-gray-600 text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {wordList.map(word => (
                                            <tr key={word.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 font-semibold text-gray-900">{word.word}</td>
                                                <td className="px-6 py-4 text-gray-700">{word.translation}</td>
                                                <td className="px-6 py-4">
                                                    <TypeBadge type={word.type} />
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate">
                                                    {word.example ?? '—'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            id={`btn-edit-${word.id}`}
                                                            href={route('words.edit', word.id)}
                                                            title="Editar"
                                                            className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition"
                                                        >
                                                            <Pencil size={15} />
                                                        </Link>
                                                        <button
                                                            id={`btn-delete-${word.id}`}
                                                            onClick={() => handleDelete(word.id)}
                                                            title="Eliminar"
                                                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination words={words} />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

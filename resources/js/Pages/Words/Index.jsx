import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

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

export default function Index({ words }) {
    const { flash } = usePage().props;
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

                    {words.length === 0 ? (
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
                            <p className="mb-4 text-sm text-gray-500">{words.length} palabra{words.length !== 1 ? 's' : ''} registrada{words.length !== 1 ? 's' : ''}</p>
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
                                        {words.map(word => (
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
                                                    <button
                                                        id={`btn-delete-${word.id}`}
                                                        onClick={() => handleDelete(word.id)}
                                                        className="text-red-500 hover:text-red-700 text-xs font-semibold transition"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

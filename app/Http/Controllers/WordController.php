<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WordController extends Controller
{
    // Vista: lista de todas las palabras
    public function index()
    {
        $words = Word::latest()->get();
        return Inertia::render('Words/Index', ['words' => $words]);
    }

    // Vista: formulario para agregar palabra
    public function create()
    {
        return Inertia::render('Words/Create');
    }

    // Guardar nueva palabra
    public function store(Request $request)
    {
        $request->validate([
            'word'        => 'required|string|max:255|unique:words,word',
            'translation' => 'required|string|max:255',
            'type'        => 'nullable|string|max:50',
            'example'     => 'nullable|string',
            'notes'       => 'nullable|string',
        ]);

        Word::create($request->all());

        return redirect()->route('words.index')->with('success', 'Palabra guardada correctamente.');
    }

    // Vista: buscador de palabras
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $words = [];

        if ($query) {
            $words = Word::where('word', 'like', "%{$query}%")
                ->orWhere('translation', 'like', "%{$query}%")
                ->latest()
                ->get();
        }

        return Inertia::render('Words/Search', [
            'words' => $words,
            'query' => $query,
        ]);
    }

    // Eliminar palabra
    public function destroy(Word $word)
    {
        $word->delete();
        return redirect()->route('words.index')->with('success', 'Palabra eliminada.');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LayananBK;
use Illuminate\Support\Facades\Storage;

class LayananBKController extends Controller
{
    public function index()
    {
        return LayananBK::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $fotoPath = $request->file('foto')->store('layananbk', 'public');
        $data = LayananBK::create([
            'judul' => $request->judul,
            'foto' => $fotoPath,
        ]);
        return response()->json($data, 201);
    }

    public function update(Request $request, $id)
    {
        $data = LayananBK::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data->judul = $request->judul;

        if ($request->hasFile('foto')) {
            if ($data->foto) {
                Storage::disk('public')->delete($data->foto);
            }
            $fotoPath = $request->file('foto')->store('layananbk', 'public');
            $data->foto = $fotoPath;
        }

        $data->save();

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $data = LayananBK::findOrFail($id);
        if ($data->foto) {
            Storage::disk('public')->delete($data->foto);
        }
        $data->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

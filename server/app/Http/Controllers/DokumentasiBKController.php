<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DokumentasiBK;
use Illuminate\Support\Facades\Storage;

class DokumentasiBKController extends Controller
{
    public function index()
    {
        return DokumentasiBK::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $fotoPath = $request->file('foto')->store('dokumentasi bk', 'public');
        $data = DokumentasiBK::create([
            'judul' => $request->judul,
            'foto' => $fotoPath,
        ]);
        return response()->json($data, 201);
    }

    public function destroy($id)
    {
        $data = DokumentasiBK::findOrFail($id);
        if ($data->foto) {
            Storage::disk('public')->delete($data->foto);
        }
        $data->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function update(Request $request, $id)
    {
        $data = DokumentasiBK::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data->judul = $request->judul;

        // Jika ada file foto baru diupload
        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($data->foto) {
                \Storage::disk('public')->delete($data->foto);
            }
            $fotoPath = $request->file('foto')->store('dokumentasi bk', 'public');
            $data->foto = $fotoPath;
        }

        $data->save();

        return response()->json($data, 200);
    }
}

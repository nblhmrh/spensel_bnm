<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class BeritaController extends Controller
{
    public function index()
    {
        try {
            $berita = Berita::all();
            return response()->json($berita);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data berita',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'tipe' => 'required|string', // Tambahkan validasi tipe
        ]);

        // Proses upload foto
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $fotoPath = $foto->store('berita/foto', 'public');
        } else {
            $fotoPath = null;
        }

        // Simpan data ke database dengan slug yang sesuai
        $berita = new Berita();
        $berita->judul = $validated['judul'];
        $berita->konten = $validated['konten'];
        $berita->foto = $fotoPath;
        $berita->slug = $validated['tipe'] . '-' . \Illuminate\Support\Str::slug($validated['judul']); // Slug sesuai tipe
        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'data' => $berita
        ]);
    }

    public function destroy($id)
{
    $berita = Berita::findOrFail($id);
    // Optionally delete the photo file
    if ($berita->foto) {
        \Illuminate\Support\Facades\Storage::disk('public')->delete($berita->foto);
    }
    $berita->delete();
    return response()->json(['message' => 'Berita berhasil dihapus']);
}

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'konten' => 'required|string',
            'tipe' => 'required|string', // Tambahkan validasi tipe
        ]);

        if ($request->hasFile('foto')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($berita->foto);

            $foto = $request->file('foto');
            $fotoPath = $foto->store('berita/foto', 'public');
            $berita->foto = $fotoPath;
        }

        $berita->judul = $validated['judul'];
        $berita->konten = $validated['konten'];
        $berita->slug = $validated['tipe'] . '-' . \Illuminate\Support\Str::slug($validated['judul']); // Slug sesuai tipe
        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil diperbarui',
            'data' => $berita
        ]);
    }

    private function uploadFile($file, $type)
    {
        if (!$file->isValid()) {
            throw new \Exception("File {$type} tidak valid");
        }

        // Tambahkan konversi ke WebP seperti di method update
        $image = Image::make($file)->encode('webp', 80);
        $fileName = time() . '_' . $type . '.webp';
        $path = "berita/{$type}/" . $fileName;

        Storage::disk('public')->put($path, $image);

        return $path;
    }
}

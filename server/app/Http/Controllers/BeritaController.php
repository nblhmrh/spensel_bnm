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
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Proses upload thumbnail
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailPath = $thumbnail->store('berita/thumbnail', 'public');
        }

        // Proses upload foto
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $fotoPath = $foto->store('berita/foto', 'public');
        }

        // Simpan data ke database dengan slug yang sesuai
        $berita = new Berita();
        $berita->judul = $validated['judul'];
        $berita->konten = $validated['konten'];
        $berita->thumbnail = $thumbnailPath ?? null;
        $berita->foto = $fotoPath ?? null;

        // Gunakan selectedBerita dari form untuk membuat slug
        $selectedBerita = $request->input('selectedBerita', 'berita1');
        $berita->slug = $selectedBerita . '-' . Str::slug($validated['judul']);

        $berita->save();
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'konten' => 'required|string'
        ]);

        if ($request->hasFile('thumbnail')) {
            Storage::disk('public')->delete($berita->thumbnail);

            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_thumb.' . 'webp';
            $thumbnailPath = 'berita/thumbnail/' . $thumbnailName;

            $thumbnailImage = Image::make($thumbnail)
                ->encode('webp', 80);
            Storage::disk('public')->put($thumbnailPath, $thumbnailImage);

            $berita->thumbnail = $thumbnailPath;
        }

        if ($request->hasFile('foto')) {
            Storage::disk('public')->delete($berita->foto);

            $foto = $request->file('foto');
            $fotoName = time() . '_foto.' . 'webp';
            $fotoPath = 'berita/foto/' . $fotoName;

            $fotoImage = Image::make($foto)
                ->encode('webp', 80);
            Storage::disk('public')->put($fotoPath, $fotoImage);

            $berita->foto = $fotoPath;
        }

        $berita->update([
            'judul' => $validated['judul'],
            'konten' => $validated['konten'],
            'slug' => Str::slug($validated['judul'])
        ]);

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

<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class BeritaController extends Controller
{
    // ... existing code ...

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'konten' => 'required|string'
        ]);

        // Proses thumbnail
        $thumbnail = $request->file('thumbnail');
        $thumbnailName = time() . '_thumb.' . 'webp';
        $thumbnailPath = 'berita/thumbnail/' . $thumbnailName;

        $thumbnailImage = Image::make($thumbnail)
            ->encode('webp', 80);
        Storage::disk('public')->put($thumbnailPath, $thumbnailImage);

        // Proses foto
        $foto = $request->file('foto');
        $fotoName = time() . '_foto.' . 'webp';
        $fotoPath = 'berita/foto/' . $fotoName;

        $fotoImage = Image::make($foto)
            ->encode('webp', 80);
        Storage::disk('public')->put($fotoPath, $fotoImage);

        $berita = Berita::create([
            'judul' => $validated['judul'],
            'thumbnail' => $thumbnailPath,
            'foto' => $fotoPath,
            'konten' => $validated['konten'],
            'slug' => Str::slug($validated['judul'])
        ]);

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'data' => $berita
        ], 201);
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

    // ... existing code ...
}

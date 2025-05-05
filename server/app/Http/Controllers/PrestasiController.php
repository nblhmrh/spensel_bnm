<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PrestasiController extends Controller
{
    public function index()
    {
        return Prestasi::orderBy('tanggal', 'desc')->get();
    }

    public function store(Request $request)
    {
        // Validasi request
        $validated = $request->validate([
            'judul' => 'required|string',
            'tingkat' => 'required|string',
            'siswa' => 'required|json',  // Pastikan data siswa dalam format JSON
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
            'tahun' => 'required|date',
            'gambar' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        // Decode JSON siswa menjadi array
        $siswaArray = json_decode($validated['siswa'], true);

        // Proses upload gambar
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar')->store('prestasi', 'public');
            $validated['gambar'] = $gambar;
        }

        // Simpan ke database dengan data siswa dalam format JSON
        $prestasi = Prestasi::create([
            'judul' => $validated['judul'],
            'tingkat' => $validated['tingkat'],
            'siswa' => json_encode($siswaArray),  // Simpan kembali sebagai JSON
            'deskripsi' => $validated['deskripsi'],
            'tanggal' => $validated['tanggal'],
            'tahun' => $validated['tahun'],
            'gambar' => $validated['gambar'],
        ]);

        return response()->json($prestasi, 201);
    }

    public function show($id)
    {
        $prestasi = Prestasi::find($id);
        if (!$prestasi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($prestasi);
    }

    public function update(Request $request, $id)
    {
        try {
            $prestasi = Prestasi::findOrFail($id);

            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'tingkat' => 'required|string',
                'siswa' => 'required|array',
                'deskripsi' => 'required|string',
                'tanggal' => 'required|date',
                'tahun' => 'required|date',
                'gambar' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:5120'
            ]);

            if ($request->hasFile('gambar')) {
                Storage::disk('public')->delete($prestasi->gambar);
                $gambarPath = $request->file('gambar')->store('prestasi', 'public');
                $prestasi->gambar = $gambarPath;
            }

            $prestasi->judul = $validated['judul'];
            $prestasi->tingkat = $validated['tingkat'];
            $prestasi->siswa = $validated['siswa'];
            $prestasi->deskripsi = $validated['deskripsi'];
            $prestasi->tanggal = $validated['tanggal'];
            $prestasi->tahun = $validated['tahun'];
            $prestasi->save();

            return response()->json([
                'success' => true,
                'message' => 'Data prestasi berhasil diperbarui',
                'data' => $prestasi
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $prestasi = Prestasi::findOrFail($id);
            Storage::disk('public')->delete($prestasi->gambar);
            $prestasi->delete();
            return response()->json([
                'success' => true,
                'message' => 'Data prestasi berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

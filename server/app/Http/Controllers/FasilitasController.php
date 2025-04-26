<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FasilitasController extends Controller
{
    public function index()
    {
        return Fasilitas::all();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'foto' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048'
            ]);

            $filePath = $request->file('foto')->store('fasilitas', 'public');

            $fasilitas = Fasilitas::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'foto' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data fasilitas berhasil disimpan',
                'data' => $fasilitas
            ], 201);

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

    public function show($id)
    {
        try {
            $fasilitas = Fasilitas::findOrFail($id);
            return response()->json($fasilitas);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $fasilitas = Fasilitas::findOrFail($id);

            $validated = $request->validate([
                'judul' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'foto' => 'nullable|sometimes|mimes:jpg,jpeg,png,webp|max:2048'
            ]);

            if ($request->hasFile('foto')) {
                // Hapus foto lama jika ada
                if ($fasilitas->foto) {
                    Storage::disk('public')->delete($fasilitas->foto);
                }

                $filePath = $request->file('foto')->store('fasilitas', 'public');
                $fasilitas->foto = $filePath;
            } else {
                // Pertahankan foto lama jika tidak ada file baru yang diupload
                $fasilitas->foto = $fasilitas->foto;
            }

            $fasilitas->judul = $request->judul;
            $fasilitas->deskripsi = $request->deskripsi;
            $fasilitas->save();

            return response()->json([
                'success' => true,
                'message' => 'Data fasilitas berhasil diperbarui',
                'data' => $fasilitas
            ]);
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
            $fasilitas = Fasilitas::findOrFail($id);

            // Hapus foto dari storage
            if ($fasilitas->foto) {
                Storage::disk('public')->delete($fasilitas->foto);
            }

            $fasilitas->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data fasilitas berhasil dihapus'
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

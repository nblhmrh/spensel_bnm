<?php

namespace App\Http\Controllers;

use App\Models\FotoSekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoSekolahController extends Controller
{
    public function index()
    {
        return FotoSekolah::all();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'file' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048'
            ]);

            $filePath = $request->file('file')->store('foto_sekolah', 'public');

            $fotoSekolah = FotoSekolah::create([
                'file' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Foto sekolah berhasil disimpan',
                'data' => $fotoSekolah
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

    public function destroy($id)
    {
        $data = FotoSekolah::findOrFail($id);
        Storage::disk('public')->delete($data->file);
        $data->delete();
        return response()->json(['message' => 'Foto berhasil dihapus']);
    }
}

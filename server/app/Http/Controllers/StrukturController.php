<?php

namespace App\Http\Controllers;

use App\Models\Struktur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StrukturController
{
    public function index()
    {
        return Struktur::all();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'file' => 'required|file|mimes:jpg,jpeg,png,webp|max:5120'

            ]);

            $filePath = $request->file('file')->store('struktur', 'public');

            $struktur = Struktur::create([
                'file' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data struktur berhasil disimpan',
                'data' => $struktur
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
        $data = Struktur::findOrFail($id);
        Storage::disk('public')->delete($data->file);
        $data->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function download($filename)
    {
        $path = storage_path('app/public/struktur/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['error' => 'File tidak ditemukan'], 404);
        }

        return response()->download($path);
    }
}

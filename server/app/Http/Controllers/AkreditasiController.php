<?php

namespace App\Http\Controllers;

use App\Models\Akreditasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AkreditasiController {

    public function index() {
        return Akreditasi::all();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'instansi' => 'required|string|max:255',
                'no_sk' => 'required|string|max:255',
                'npsn' => 'required|string|max:255',
                'file' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048'
            ]);

            $filePath = $request->file('file')->store('akreditasi', 'public');

            $akreditasi = Akreditasi::create([
                'instansi' => $validated['instansi'],
                'no_sk' => $validated['no_sk'],
                'npsn' => $validated['npsn'],
                'file' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data akreditasi berhasil disimpan',
                'data' => $akreditasi
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

    public function destroy($id) {
        $data = Akreditasi::findOrFail($id);
        Storage::disk('public')->delete($data->file);
        $data->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function download($filename)
{
    $path = storage_path('app/public/akreditasi/' . $filename);

    if (!file_exists($path)) {
        return response()->json(['error' => 'File tidak ditemukan'], 404);
    }

    return response()->download($path);
}
}



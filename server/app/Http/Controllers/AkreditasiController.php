<?php

namespace App\Http\Controllers;

use App\Models\Akreditasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AkreditasiController {

    public function index() {
        return Akreditasi::all();
    }

    public function store(Request $request)
    {
        try {
            if (!$request->hasFile('file')) {
                return response()->json([
                    'success' => false,
                    'message' => 'No file uploaded'
                ], 400);
            }

            $file = $request->file('file');
            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid file upload'
                ], 400);
            }

            $validated = $request->validate([
                'file' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048'
            ]);

            $filePath = $file->store('akreditasi', 'public');
            if (!$filePath) {
                throw new \Exception('Failed to store file');
            }

            $akreditasi = Akreditasi::create([
                'file' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data akreditasi berhasil disimpan',
                'data' => $akreditasi
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . json_encode($e->errors()));
            return response()->json([
                'success' => false,
                'message' => 'Validasi error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Server error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id) {
        try {
            $data = Akreditasi::findOrFail($id);
            Storage::disk('public')->delete($data->file);
            $data->delete();
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            Log::error('Delete error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function download($filename)
    {
        try {
            $path = storage_path('app/public/akreditasi/' . $filename);

            if (!file_exists($path)) {
                return response()->json(['error' => 'File tidak ditemukan'], 404);
            }

            return response()->download($path);
        } catch (\Exception $e) {
            Log::error('Download error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to download file',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}



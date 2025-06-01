<?php

namespace App\Http\Controllers;

use App\Models\Berkas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BerkasController extends Controller
{
    public function index()
    {
        try {
            $berkas = Berkas::with('user')->get();

            return response()->json([
                'message' => 'Berkas berhasil diambil',
                'data' => $berkas
            ]);
        } catch (\Exception $e) {
            Log::error('Berkas index error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Gagal mengambil data berkas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'surat_lulus' => 'required|file|mimes:pdf,jpg,jpeg,webp,png|max:2048',
                'surat_baik' => 'required|file|mimes:pdf,jpg,jpeg,webp,png|max:2048',
                'kartu_keluarga' => 'required|file|mimes:pdf,jpg,jpeg,webp,png|max:2048',
                'akta_lahir' => 'required|file|mimes:pdf,jpg,jpeg,webp,png|max:2048',
                'foto' => 'required|file|mimes:jpg,jpeg,webp,png|max:2048',
            ]);

            // Create directory if not exists
            if (!Storage::exists('public/berkas')) {
                Storage::makeDirectory('public/berkas');
            }

            $data = [];
            $files = ['surat_lulus', 'surat_baik', 'kartu_keluarga', 'akta_lahir', 'foto'];

            foreach ($files as $file) {
                if ($request->hasFile($file)) {
                    $path = $request->file($file)->store('public/berkas');
                    $data[$file] = str_replace('public/', '', $path);
                }
            }

            // Save berkas
            $berkas = Berkas::create([
                'user_id' => auth()->id(),
                ...$data
            ]);

            return response()->json([
                'message' => 'Berkas berhasil diunggah',
                'data' => $berkas
            ], 201);

        } catch (\Exception $e) {
            Log::error('Berkas upload error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Gagal mengunggah berkas',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

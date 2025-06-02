<?php

namespace App\Http\Controllers;

use App\Models\Berkas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
            if (!auth()->check()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            $request->validate([
                'surat_lulus' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
                'surat_baik' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
                'kartu_keluarga' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
                'akta_lahir' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
                'foto' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            $data = [];
            $files = ['surat_lulus', 'surat_baik', 'kartu_keluarga', 'akta_lahir', 'foto'];

            foreach ($files as $file) {
                if ($request->hasFile($file)) {
                    $fileName = time() . '_' . $file . '.' . $request->file($file)->extension();
                    $path = $request->file($file)->storeAs(
                        'berkas/' . $file,
                        $fileName,
                        'public'
                    );
                    $data[$file] = $path;
                }
            }

            $berkas = Berkas::create([
                'user_id' => auth()->id(),
                ...$data
            ]);

            return response()->json([
                'message' => 'Berkas berhasil diunggah',
                'data' => $berkas
            ], 201);

        } catch (ValidationException $e) {
            Log::error('Validation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Berkas upload error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'Gagal mengunggah berkas',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

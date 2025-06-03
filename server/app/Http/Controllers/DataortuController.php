<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dataortu;

class DataortuController extends Controller
{
    public function store(Request $request)
    {
        $userId = auth()->id();
        $existing = Dataortu::where('user_id', $userId)->first();
        if ($existing) {
            return response()->json([
                'message' => 'Data orang tua sudah pernah diisi. Silakan gunakan fitur edit.'
            ], 409);
        }

        $validated = $request->validate([
            'nama_ayah' => 'required|string|max:255',
            'kontak_ayah' => 'required|string|max:20',
            'pekerjaan_ayah' => 'required|string|max:255',
            'penghasilan_ayah' => 'required|string|max:255',
            'alamat_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'kontak_ibu' => 'required|string|max:20',
            'pekerjaan_ibu' => 'required|string|max:255',
            'penghasilan_ibu' => 'required|string|max:255',
            'alamat_ibu' => 'required|string|max:255',
        ]);

        $validated['user_id'] = $userId;

        $dataortu = Dataortu::create($validated);

        return response()->json([
            'success' => true,
            'data' => $dataortu
        ], 201);
    }

    public function me()
    {
        try {
            $dataortu = Dataortu::where('user_id', auth()->id())->first();
            return response()->json([
                'success' => true,
                'data' => $dataortu
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data orang tua',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $dataortu = Dataortu::where('id', $id)->where('user_id', auth()->id())->first();
        if (!$dataortu) {
            return response()->json(['message' => 'Data orang tua tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama_ayah' => 'required|string|max:255',
            'kontak_ayah' => 'required|string|max:20',
            'pekerjaan_ayah' => 'required|string|max:255',
            'penghasilan_ayah' => 'required|string|max:255',
            'alamat_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'kontak_ibu' => 'required|string|max:20',
            'pekerjaan_ibu' => 'required|string|max:255',
            'penghasilan_ibu' => 'required|string|max:255',
            'alamat_ibu' => 'required|string|max:255',
        ]);

        $dataortu->update($validated);

        return response()->json([
            'success' => true,
            'data' => $dataortu
        ]);
    }

    public function destroy($id)
    {
        $dataortu = Dataortu::where('id', $id)->where('user_id', auth()->id())->first();
        if (!$dataortu) {
            return response()->json(['message' => 'Data orang tua tidak ditemukan'], 404);
        }

        $dataortu->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data orang tua berhasil dihapus'
        ]);
    }
}

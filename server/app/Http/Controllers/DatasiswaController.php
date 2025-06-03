<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Datasiswa;

class DatasiswaController extends Controller
{
    public function store(Request $request)
    {
        $userId = auth()->id();
        $existing = Datasiswa::where('user_id', $userId)->first();
        if ($existing) {
            return response()->json([
                'message' => 'Data siswa sudah pernah diisi. Silakan gunakan fitur edit.'
            ], 409);
        }

        // Validasi input
        $validated = $request->validate([
            'nisn' => 'required|string|unique:datasiswa',
            'nik' => 'required|string',
            'nama' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'asal_sekolah' => 'required|string',
            'desa' => 'required|string',
            'rt' => 'required|string',
            'rw' => 'required|string',
            'kecamatan' => 'required|string',
            'kabupaten' => 'required|string',
            'provinsi' => 'required|string',
            'alamatlengkap' => 'required|string',
            'jarakrumah' => 'required|string',
        ]);

        // Tambahkan user_id secara eksplisit
        $validated['user_id'] = $userId;

        // Simpan data ke tabel datasiswa
        $datasiswa = Datasiswa::create($validated);

        return response()->json([
            'message' => 'Data siswa berhasil disimpan',
            'data' => $datasiswa
        ], 201);
    }

    public function me()
    {
        try {
            $datasiswa = Datasiswa::where('user_id', auth()->id())->first();
            return response()->json([
                'message' => 'Data Siswa user ditemukan',
                'data' => $datasiswa
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data siswa user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $datasiswa = Datasiswa::where('id', $id)->where('user_id', auth()->id())->first();
        if (!$datasiswa) {
            return response()->json(['message' => 'Data siswa tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nisn' => 'required|string|unique:datasiswa,nisn,' . $id,
            'nik' => 'required|string',
            'nama' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'asal_sekolah' => 'required|string',
            'desa' => 'required|string',
            'rt' => 'required|string',
            'rw' => 'required|string',
            'kecamatan' => 'required|string',
            'kabupaten' => 'required|string',
            'provinsi' => 'required|string',
            'alamatlengkap' => 'required|string',
            'jarakrumah' => 'required|string',
        ]);

        $datasiswa->update($validated);

        return response()->json([
            'message' => 'Data siswa berhasil diupdate',
            'data' => $datasiswa
        ]);
    }

    public function destroy($id)
    {
        $datasiswa = Datasiswa::where('id', $id)->where('user_id', auth()->id())->first();
        if (!$datasiswa) {
            return response()->json(['message' => 'Data siswa tidak ditemukan'], 404);
        }

        $datasiswa->delete();

        return response()->json([
            'message' => 'Data siswa berhasil dihapus'
        ]);
    }
}

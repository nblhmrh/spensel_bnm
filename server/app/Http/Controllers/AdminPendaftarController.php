<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminPendaftarController extends Controller
{
    public function index()
    {
        $pendaftar = User::where('role', 'user')
            ->with(['datasiswa', 'dataortu', 'berkas'])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $pendaftar
        ]);
    }

    public function updateStatus(Request $request, $userId)
    {
        $request->validate([
            'status' => 'required|in:lulus,gagal'
        ]);

        $user = User::findOrFail($userId);
        $user->status = $request->status;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Status berhasil diupdate'
        ]);
    }

    public function detailSiswa($id)
    {
        $datasiswa = \App\Models\Datasiswa::where('user_id', $id)->first();

        if (!$datasiswa) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $datasiswa
        ]);
    }
    public function detailOrtu($id)
    {
        $dataortu = \App\Models\Dataortu::where('user_id', $id)->first();

        if (!$dataortu) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $dataortu
        ]);
    }
    public function detailBerkas($id)
    {
        $berkas = \App\Models\Berkas::where('user_id', $id)->first();

        if (!$berkas) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $berkas
        ]);
    }
}

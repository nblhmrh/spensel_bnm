<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pengaduan;

class PengaduanController extends Controller
{
    // Tampilkan semua data pengaduan
    public function index()
    {
        return response()->json(Pengaduan::all());
    }

    // Simpan data pengaduan baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' => 'required|string|max:1000',
        ]);

        $pengaduan = Pengaduan::create($request->all());

        return response()->json([
            'message' => 'Data pengaduan berhasil disimpan',
            'data' => $pengaduan
        ], 201);
    }

    // Tampilkan detail pengaduan berdasarkan id
    public function show($id)
    {
        $pengaduan = Pengaduan::find($id);
        if (!$pengaduan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($pengaduan);
    }

    // Update data pengaduan berdasarkan id
    public function update(Request $request, $id)
    {
        $pengaduan = Pengaduan::find($id);
        if (!$pengaduan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' =>  'required|string|max:1000',
        ]);
        $pengaduan->update($request->all());
        return response()->json([
            'message' => 'Data pengaduan berhasil diupdate',
            'data' => $pengaduan
        ], 200);
    }
    // Hapus data pengaduan berdasarkan id
    public function destroy($id)
    {
        $pengaduan = Pengaduan::find($id);
        if (!$pengaduan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $pengaduan->delete();
        return response()->json(['message' => 'Data pengaduan berhasil dihapus'], 200);
    }
}

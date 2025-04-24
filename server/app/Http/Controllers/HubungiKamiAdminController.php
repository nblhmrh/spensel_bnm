<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HubungiKami;

class HubungiKamiAdminController extends Controller
{
    // Tampilkan semua pesan (READ)
    public function index()
    {
        return response()->json(HubungiKami::latest()->get(), 200);
    }

    // Tampilkan pesan tertentu
    public function show($id)
    {
        $pesan = HubungiKami::find($id);
        if (!$pesan) {
            return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
        }
        return response()->json($pesan, 200);
    }

    // Update pesan
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'pesan' => 'required|string',
        ]);

        $pesan = HubungiKami::find($id);
        if (!$pesan) {
            return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
        }

        $pesan->update($request->all());
        return response()->json(['message' => 'Pesan berhasil diupdate', 'data' => $pesan], 200);
    }

    // Hapus pesan
    public function destroy($id)
    {
        $pesan = HubungiKami::find($id);
        if (!$pesan) {
            return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
        }

        $pesan->delete();
        return response()->json(['message' => 'Pesan berhasil dihapus'], 200);
    }
}


<?php

namespace App\Http\Controllers;

use App\Models\HubungiKami;
use Illuminate\Http\Request;

class HubungiKamiController extends Controller
{
    // USER: Kirim pesan
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'pesan' => 'required|string',
        ]);

        $hubungiKami = HubungiKami::create($validated);

        return response()->json([
            'message' => 'Pesan berhasil dikirim!',
            'data' => $hubungiKami
        ], 201);
    }

    // ADMIN: Lihat semua pesan
    public function index()
    {
        return HubungiKami::orderBy('created_at', 'desc')->get();
    }

    // ADMIN: Hapus pesan
    public function destroy($id)
    {
        $hubungiKami = HubungiKami::findOrFail($id);
        $hubungiKami->delete();

        return response()->json(['message' => 'Pesan berhasil dihapus.']);
    }

    // ADMIN: Update pesan (opsional)
    public function update(Request $request, $id)
    {
        $hubungiKami = HubungiKami::findOrFail($id);

        $hubungiKami->update($request->all());

        return response()->json([
            'message' => 'Pesan berhasil diperbarui.',
            'data' => $hubungiKami
        ]);
    }

    // ADMIN: Tampilkan pesan tertentu
    public function show($id)
    {
        $hubungiKami = HubungiKami::findOrFail($id);

        return response()->json($hubungiKami);
    }
}

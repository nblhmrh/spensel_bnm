<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VisiMisi;
use Illuminate\Http\Request;

class VisiMisiController extends Controller
{
    public function index() {
        return VisiMisi::first() ?? new VisiMisi();
    }

    public function show()
    {
        $data = VisiMisi::first() ?? new VisiMisi();
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $data = VisiMisi::first();

        if (!$data) {
            $data = new VisiMisi();
        }

        $data->visi = $request->visi;
        $data->misi = $request->misi;
        $data->save();

        return response()->json(['message' => 'Berhasil diupdate!']);
    }

    public function destroy()
    {
        $data = VisiMisi::first();
        if ($data) {
            $data->delete();
            return response()->json(['message' => 'Data berhasil dihapus']);
        }
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }

    public function store(Request $request)
    {
        $visiMisi = new VisiMisi();
        $visiMisi->visi = $request->visi;
        $visiMisi->misi = $request->misi;
        $visiMisi->save();

        return response()->json(['message' => 'Data berhasil disimpan']);
    }
}


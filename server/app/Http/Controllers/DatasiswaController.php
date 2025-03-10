<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Datasiswa;

class DatasiswaController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'nisn' => 'required|string|unique:datasiswa',
            'nama' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'asal_sekolah' => 'required|string',
            'alamat' => 'required|string',
            'desa' => 'required|string',
            'rt' => 'required|string',
            'rw' => 'required|string',
            'kecamatan' => 'required|string',
            'kabupaten' => 'required|string',
            'provinsi' => 'required|string',
            'alamatlengkap' => 'required|string',
            'jarakrumah' => 'required|string',
        ]);

        // Simpan data ke tabel datasiswa
        $datasiswa = Datasiswa::create($request->all());

        return response()->json([
            'message' => 'Data siswa berhasil disimpan',
            'data' => $datasiswa
        ], 201);
    }
}

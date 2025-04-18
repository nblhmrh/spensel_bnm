<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pengaduan;

class PengaduanController extends Controller
{

 public function store(Request $request)
 {
     // Validasi input
     $request->validate([
            'name' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' => 'required|string|max:1000',
     ]);

     // Simpan data ke tabel datasiswa
     $pengaduan = Pengaduan::create($request->all());

     return response()->json([
         'message' => 'Data siswa berhasil disimpan',
         'data' => $pengaduan
     ], 201);
 }
}

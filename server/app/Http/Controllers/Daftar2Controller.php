<?php

namespace App\Http\Controllers;

use App\Models\Daftar2;
use Illuminate\Http\Request;

class Daftar2Controller extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'full_name' => 'required|string|max:255',
            'birth_date' => 'required|date|before_or_equal:today',
            'nik' => 'required|digits:16|unique:daftar2',
            'whatsapp_number' => 'required|string|unique:daftar2'
        ]);

        // Simpan data ke tabel daftar2
        $daftar2 = Daftar2::create([
            'user_id' => $request->user_id,
            'full_name' => $request->full_name,
            'birth_date' => $request->birth_date,
            'nik' => $request->nik,
            'whatsapp_number' => $request->whatsapp_number
        ]);

        return response()->json([
            'message' => 'Data daftar2 berhasil disimpan',
            'data' => $daftar2
        ], 201);
    }
}

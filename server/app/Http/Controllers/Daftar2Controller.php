<?php

namespace App\Http\Controllers;

use App\Models\Daftar2;
use Illuminate\Http\Request;

class Daftar2Controller extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'full_name' => 'required|string|max:255',
                'birth_date' => 'required|date|before_or_equal:today',
                'nik' => 'required|digits:16|unique:daftar2',
                'whatsapp_number' => 'required|string|unique:daftar2'
            ]);

            $data = $validated;

            if (auth()->check()) {
                $data['user_id'] = auth()->id();
            }

            $daftar2 = Daftar2::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil disimpan',
                'data' => $daftar2
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

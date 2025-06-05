<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PengumumanController extends Controller
{
    public function cekPengumuman(Request $request)
    {
        // Ambil token dari header Authorization (jika perlu)
        $token = $request->bearerToken();

        $keyword = $request->input('keyword')
            ?? $request->input('name')
            ?? $request->input('email')
            ?? $request->input('whatsapp');


        if (!$keyword) {
            return response()->json([
                'status' => 'belum_ada',
                'name' => '',
            ]);
        }

        $user = User::where('name', 'like', "%$keyword%")
            ->orWhere('email', 'like', "%$keyword%")
            ->orWhere('whatsapp', 'like', "%$keyword%")
            ->first();

        if ($user && $user->status) {
            return response()->json([
                'status' => $user->status,
                'name' => $user->name,
            ]);
        } else {
            return response()->json([
                'status' => 'belum_ada',
                'name' => $keyword,
            ]);
        }
    }
}

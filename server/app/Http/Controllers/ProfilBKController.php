<?php

namespace App\Http\Controllers;

use App\Models\ProfilBK;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilBKController extends Controller
{
    public function index()
    {
        return ProfilBK::first();
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'visi' => 'required|string',
                'misi' => 'required|string',
                'intro_text' => 'required|string',
                'teacher_name' => 'required|string',
                'teacher_birth' => 'required|string',
                'teacher_education' => 'required|string',
                'teacher_instagram' => 'required|string',
                'teacher_photo' => 'required|image|mimes:jpg,jpeg,png|max:2048'
            ]);

            if ($request->hasFile('teacher_photo')) {
                $photoPath = $request->file('teacher_photo')->store('profil-bk', 'public');
                $validated['teacher_photo'] = $photoPath;
            }

            $profilBK = ProfilBK::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Data profil BK berhasil disimpan',
                'data' => $profilBK
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error saving profil BK',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $profilBK = ProfilBK::first();
            if (!$profilBK) {
                return response()->json([
                    'success' => false,
                    'message' => 'Profil BK not found'
                ], 404);
            }

            $validated = $request->validate([
                'visi' => 'required|string',
                'misi' => 'required|string',
                'intro_text' => 'required|string',
                'teacher_name' => 'required|string',
                'teacher_birth' => 'required|string',
                'teacher_education' => 'required|string',
                'teacher_instagram' => 'required|string',
                'teacher_photo' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048'
            ]);

            if ($request->hasFile('teacher_photo')) {
                // Delete old photo
                if ($profilBK->teacher_photo) {
                    Storage::disk('public')->delete($profilBK->teacher_photo);
                }
                $photoPath = $request->file('teacher_photo')->store('profil-bk', 'public');
                $validated['teacher_photo'] = $photoPath;
            }

            $profilBK->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Data profil BK berhasil diupdate',
                'data' => $profilBK
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating profil BK',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

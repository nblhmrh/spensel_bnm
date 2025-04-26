<?php

namespace App\Http\Controllers;

use App\Models\Sambutan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SambutanController extends Controller
{
    public function index()
    {
        try {
            $sambutan = Sambutan::latest()->get();

            return response()->json([
                'status' => true,
                'data' => $sambutan,
                'message' => 'Data sambutan berhasil diambil'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data sambutan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama' => 'required',
                'isi' => 'required',
                'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
            ]);

            // Delete all existing sambutan records first
            $oldSambutans = Sambutan::all();
            foreach ($oldSambutans as $old) {
                if ($old->foto && Storage::disk('public')->exists($old->foto)) {
                    Storage::disk('public')->delete($old->foto);
                }
                $old->delete();
            }

            $foto = $request->file('foto');
            $fotoPath = $foto->store('sambutan', 'public');

            $sambutan = Sambutan::create([
                'nama' => $request->nama,
                'isi' => $request->isi,
                'foto' => $fotoPath
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Sambutan berhasil ditambahkan',
                'data' => $sambutan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan sambutan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $sambutan = Sambutan::findOrFail($id);

            $request->validate([
                'nama' => 'required',
                'isi' => 'required',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            if ($request->hasFile('foto')) {
                // Delete old photo
                if ($sambutan->foto && Storage::disk('public')->exists($sambutan->foto)) {
                    Storage::disk('public')->delete($sambutan->foto);
                }
                $fotoPath = $request->file('foto')->store('sambutan', 'public');
                $sambutan->foto = $fotoPath;
            }

            $sambutan->nama = $request->nama;
            $sambutan->isi = $request->isi;
            $sambutan->save();

            return response()->json([
                'status' => true,
                'message' => 'Sambutan berhasil diperbarui',
                'data' => $sambutan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui sambutan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $sambutan = Sambutan::findOrFail($id);

            // Delete photo
            if ($sambutan->foto && Storage::disk('public')->exists($sambutan->foto)) {
                Storage::disk('public')->delete($sambutan->foto);
            }

            $sambutan->delete();

            return response()->json([
                'status' => true,
                'message' => 'Sambutan berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus sambutan: ' . $e->getMessage()
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\HubungiKami;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class HubungiKamiController extends Controller
{
    /**
     * Menampilkan semua pesan.
     */
    public function index()
    {
        try {
            $messages = HubungiKami::orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => true,
                'message' => 'Data berhasil diambil',
                'data' => $messages
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Menyimpan pesan baru.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'pesan' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $message = HubungiKami::create([
                'nama' => $request->nama,
                'email' => $request->email,
                'pesan' => $request->pesan
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Pesan berhasil disimpan',
                'data' => $message
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan pesan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Menampilkan pesan tertentu.
     */
    public function show($id)
    {
        try {
            $message = HubungiKami::find($id);

            if (!$message) {
                return response()->json([
                    'status' => false,
                    'message' => 'Pesan tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Pesan ditemukan',
                'data' => $message
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil pesan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Memperbarui pesan.
     */
    public function update(Request $request, $id)
    {
        try {
            $message = HubungiKami::find($id);

            if (!$message) {
                return response()->json([
                    'status' => false,
                    'message' => 'Pesan tidak ditemukan'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'nama' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'pesan' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $message->update([
                'nama' => $request->nama,
                'email' => $request->email,
                'pesan' => $request->pesan
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Pesan berhasil diperbarui',
                'data' => $message
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui pesan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Menghapus pesan.
     */
    public function destroy($id)
    {
        try {
            $message = HubungiKami::find($id);

            if (!$message) {
                return response()->json([
                    'status' => false,
                    'message' => 'Pesan tidak ditemukan'
                ], 404);
            }

            $message->delete();

            return response()->json([
                'status' => true,
                'message' => 'Pesan berhasil dihapus'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus pesan: ' . $e->getMessage()
            ], 500);
        }
    }
}

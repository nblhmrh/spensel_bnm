<?php

use App\Models\Akreditasi;
use Illuminate\Support\Facades\Storage;

class AkreditasiController {

    public function index() {
        return Akreditasi::all();
    }

    public function store(Request $request) {
        $file = $request->file('file')->store('akreditasi', 'public');

        return Akreditasi::create([
            'instansi' => $request->instansi,
            'no_sk' => $request->no_sk,
            'npsn' => $request->npsn,
            'file' => $file,
        ]);
    }

    public function destroy($id) {
        $data = Akreditasi::findOrFail($id);
        Storage::disk('public')->delete($data->file);
        $data->delete();
        return response()->json(['message' => 'Deleted']);
    }
}



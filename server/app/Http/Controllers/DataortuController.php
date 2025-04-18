<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dataortu;

class DataortuController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_ayah' => 'required|string|max:255',
            'kontak_ayah' => 'required|string|max:20',
            'pekerjaan_ayah' => 'required|string|max:255',
            'penghasilan_ayah' => 'required|string|max:255',
            'alamat_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'kontak_ibu' => 'required|string|max:20',
            'pekerjaan_ibu' => 'required|string|max:255',
            'penghasilan_ibu' => 'required|string|max:255',
            'alamat_ibu' => 'required|string|max:255',

        ]);

        // $data = $validated;
        // $data['user_id'] = auth()->id();

        // $dataortu = Dataortu::updateOrCreate(
        //     ['user_id' => auth()->id()],
        //     $data
        // );

        $dataortu = Dataortu::create($request->all());


        return response()->json([
            'success' => true,
            'data' => $dataortu
        ], 201);
    }

    // public function show()
    // {
    //     $dataortu = Dataortu::where('user_id', auth()->id())->first();
    //     return response()->json([
    //         'success' => true,
    //         'data' => $dataortu
    //     ]);
    // }
}

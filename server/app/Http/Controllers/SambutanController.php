<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sambutan;

class SambutanController extends Controller
{
    public function getSambutan(){
        $sambutan = Sambutan::all();
        return response()->json([
            'status' => true,
            'message' => 'Sambutan retrieved successfully',
            'data' => $sambutan
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class authController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string |confirmed',
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['message' => 'user berhasil dibuat'], 201);
    }
    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string |confirmed',
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json(['message' => 'Unauthorized'],   401);
        }
        $token = $user->createToken('Auth_token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ],200);
    }
    public function user()
    {
        return response()->json('selamat datang '.Auth()->user()->name);
    }
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/register',[authController::class, 'register']);
Route::post('/login', [authController::class,'login']);
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [App\Http\Controllers\authController::class, 'user']);
    Route::post('/logout', [App\Http\Controllers\authController::class, 'logout']);
});

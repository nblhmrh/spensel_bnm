<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\Daftar2Controller;
use App\Http\Controllers\DatasiswaController;



use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::post('/register', [authController::class, 'register']);
Route::middleware([EnsureFrontendRequestsAreStateful::class])->group(function () {
    Route::post('/login', [authController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [authController::class, 'user']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

Route::get('/csrf-cookie', function (Request $request) {
    return response()->json(['message' => 'CSRF Cookie Set']);
});

Route::post('/daftar2', [Daftar2Controller::class, 'store']);
Route::post('/datasiswa', [DatasiswaController::class, 'store']);   


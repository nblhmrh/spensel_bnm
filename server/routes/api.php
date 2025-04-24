<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\Daftar2Controller;
use App\Http\Controllers\DatasiswaController;
use App\Http\Controllers\DataortuController;
use App\Http\Controllers\PengaduanController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\SambutanController;
use App\Http\Controllers\Api\VisiMisiController;
use App\Http\Controllers\HubungiKamiController;





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
Route::post('/dataortu', [DataortuController::class, 'store']);
Route::post('/pengaduan', [PengaduanController::class, 'store']);
Route::get('/sambutan', [SambutanController::class, 'getSambutan']);

// update visi misi routes
// Visi Misi routes
Route::get('/visi-misi', [VisiMisiController::class, 'show']);
Route::post('/visi-misi', [VisiMisiController::class, 'store']);
Route::put('/visi-misi', [VisiMisiController::class, 'update']);
Route::delete('/visi-misi', [VisiMisiController::class, 'destroy']);

Route::post('/hubungi-kami', [HubungiKamiController::class, 'store']); // User Kirim

// ADMIN (bisa dibatasi dengan middleware jika pakai auth)
Route::get('/hubungi-kami', [HubungiKamiController::class, 'index']);
Route::get('/hubungi-kami/{id}', [HubungiKamiController::class, 'show']);
Route::put('/hubungi-kami/{id}', [HubungiKamiController::class, 'update']);
Route::delete('/hubungi-kami/{id}', [HubungiKamiController::class, 'destroy']);

// Update sambutan routes
Route::get('/sambutan', [SambutanController::class, 'index']); // Changed from getSambutan to index
Route::post('/sambutan', [SambutanController::class, 'store']);
Route::put('/sambutan/{id}', [SambutanController::class, 'update']);
Route::delete('/sambutan/{id}', [SambutanController::class, 'destroy']);

//akreditasi
Route::get('/akreditasi', [AkreditasiController::class, 'index']);
Route::post('/akreditasi', [AkreditasiController::class, 'store']);
Route::delete('/akreditasi/{id}', [AkreditasiController::class, 'destroy']);

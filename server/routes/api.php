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
use App\Http\Controllers\AkreditasiController;
use App\Http\Controllers\StrukturController;
use App\Http\Controllers\FotoSekolahController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\ProfilBKController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\DokumentasiBKController;
use App\Http\Controllers\LayananBKController;
use App\Http\Controllers\BerkasController;





use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


Route::get('/health-check', function () {
    return response()->json(['status' => 'ok']);
});

// Public routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);

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

Route::get('/users', [authController::class, 'listUsers']);

// Endpoint untuk update user (edit user)
Route::put('/users/{id}', [authController::class, 'updateUser']);

// Endpoint untuk hapus user
Route::delete('/users/{id}', [authController::class, 'deleteUser']);

Route::post('/daftar2', [Daftar2Controller::class, 'store']);
Route::post('/datasiswa', [DatasiswaController::class, 'store']);
Route::post('/dataortu', [DataortuController::class, 'store']);
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
Route::get('/akreditasi/download/{filename}', [AkreditasiController::class, 'download']);

//struktur
Route::get('/struktur', [StrukturController::class, 'index']);
Route::post('/struktur', [StrukturController::class, 'store']);
Route::delete('/struktur/{id}', [StrukturController::class, 'destroy']);
Route::get('/struktur/download/{filename}', [StrukturController::class, 'download']);

//foto sekolah
Route::get('/foto-sekolah', [FotoSekolahController::class, 'index']);
Route::post('/foto-sekolah', [FotoSekolahController::class, 'store']);
Route::delete('/foto-sekolah/{id}', [FotoSekolahController::class, 'destroy']);
Route::get('/struktur/download/{filename}', [StrukturController::class, 'download']);

// Fasilitas routes
Route::get('/fasilitas', [FasilitasController::class, 'index']);
Route::post('/fasilitas', [FasilitasController::class, 'store']);
Route::put('/fasilitas/{id}', [FasilitasController::class, 'update']); // Tambahkan ini
Route::delete('/fasilitas/{id}', [FasilitasController::class, 'destroy']);
Route::get('/fasilitas/{id}', [FasilitasController::class, 'show']);

// Add these routes with the existing routes
Route::get('/profilbk', [ProfilBKController::class, 'index']);
Route::post('/profilbk', [ProfilBKController::class, 'store']);
Route::post('/profilbk/update', [ProfilBKController::class, 'update']);

Route::get('/berita', [BeritaController::class, 'index']);
Route::post('/berita', [BeritaController::class, 'store']);
Route::get('/berita/{id}', [BeritaController::class, 'show']);
Route::put('/berita/{id}', [BeritaController::class, 'update']);
Route::delete('/berita/{id}', [BeritaController::class, 'destroy']);

Route::get('/prestasi', [PrestasiController::class, 'index']);
Route::post('/prestasi', [PrestasiController::class, 'store']);
Route::get('/prestasi/{id}', [PrestasiController::class, 'show']);
Route::post('/prestasi/{id}', [PrestasiController::class, 'update']);
Route::delete('/prestasi/{id}', [PrestasiController::class, 'destroy']);

Route::get('/dokumentasibk', [DokumentasiBKController::class, 'index']);
Route::post('/dokumentasibk', [DokumentasiBKController::class, 'store']);
Route::post('/dokumentasibk/{id}', [DokumentasiBKController::class, 'update']);
Route::delete('/dokumentasibk/{id}', [DokumentasiBKController::class, 'destroy']);

Route::get('/layananbk', [LayananBKController::class, 'index']);
Route::post('/layananbk', [LayananBKController::class, 'store']);
Route::post('/layananbk/{id}', [LayananBKController::class, 'update']);
Route::delete('/layananbk/{id}', [LayananBKController::class, 'destroy']);

Route::get('/pengaduan', [PengaduanController::class, 'index']);
Route::post('/pengaduan', [PengaduanController::class, 'store']);
Route::put('/pengaduan/{id}', [PengaduanController::class, 'update']);
Route::delete('/pengaduan/{id}', [PengaduanController::class, 'destroy']);

// Protected routes
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::post('/berkas', [BerkasController::class, 'store']);
    Route::get('/berkas', [BerkasController::class, 'index']);
    Route::post('/data-siswa', [DataSiswaController::class, 'store']);
    Route::get('/data-siswa', [DataSiswaController::class, 'show']);
    Route::post('/data-ortu', [DataOrtuController::class, 'store']);
    Route::get('/data-ortu', [DataOrtuController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/berkas', [BerkasController::class, 'index']);
    Route::get('/admin/data-siswa', [DataSiswaController::class, 'index']);
    Route::get('/admin/data-ortu', [DataOrtuController::class, 'index']);
});


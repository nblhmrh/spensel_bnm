<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/BerandaAdmin', function () {
        return view('admin');
    });
    Route::get('/AkreditasiAdmin', function () {
        return view('admin');
    });
    Route::get('/StrukturAdmin', function () {
        return view('admin');
    });
    Route::get('/PrestasiAdmin', function () {
        return view('admin');
    });
    Route::get('/FasilitasAdmin', function () {
        return view('admin');
    });
    Route::get('/VisiMisiAdmin', function () {
        return view('admin');
    });
    Route::get('/BuatAkun', function () {
        return view('admin');
    });
    Route::get('/FotoSekolahAdmin', function () {
        return view('admin');
    });
    Route::get('/SambutanAdmin', function () {
        return view('admin');
    });
    Route::get('/BeritaAdmin', function () {
        return view('admin');
    });
    Route::get('/HubungiKamiAdmin', function () {
        return view('admin');
    });
});
Route::middleware(['auth', 'role:bk'])->group(function () {
    Route::get('/BerandaBK', function () {
        return view('bk');
    });
    Route::get('/LayananBK', function () {
        return view('bk');
    });
    Route::get('/ProfilBK', function () {
        return view('bk');
    });
    Route::get('/DokumentasiBKAdmin', function () {
        return view('bk');
    });
    Route::get('/PengaduanBK', function () {
        return view('bk');
    });

});

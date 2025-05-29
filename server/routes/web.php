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
});

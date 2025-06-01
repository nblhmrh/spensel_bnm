<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Datasiswa extends Model
{

    protected $table = 'datasiswa';

    use HasFactory;

    protected $fillable = [
        'nisn',
        'nik',
        'nama',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'asal_sekolah',
        'desa',
        'rt',
        'rw',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'alamatlengkap',
        'jarakrumah',
    ];

    public function user()
    {
    return $this->belongsTo(User::class);
    }
}

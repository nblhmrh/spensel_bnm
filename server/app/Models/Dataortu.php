<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dataortu extends Model

{
    use HasFactory;

    protected $table = 'dataortu';

    protected $fillable = [
        'user_id',
        'nama_ayah',
        'kontak_ayah',
        'pekerjaan_ayah',
        'penghasilan_ayah',
        'alamat_ayah',
        'nama_ibu',
        'kontak_ibu',
        'pekerjaan_ibu',
        'penghasilan_ibu',
        'alamat_ibu',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

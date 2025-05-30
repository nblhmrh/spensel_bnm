<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengaduan extends Model
{


    protected $table = 'pengaduan';

    use HasFactory;

    protected $fillable = [
        'name',
        'kelas',
        'email',
        'pesan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

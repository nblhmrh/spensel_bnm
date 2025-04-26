<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoSekolah extends Model
{
    use HasFactory;

    protected $table = 'foto_sekolah';
    protected $fillable = ['file'];
}

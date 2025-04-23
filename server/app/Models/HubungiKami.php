<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hubungikami extends Model
{
    protected $table = 'pengaduan';
    
    use HasFactory;

    protected $fillable = ['nama', 'email', 'pesan'];
}

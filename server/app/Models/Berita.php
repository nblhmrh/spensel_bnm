<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = [
        'judul',
        'thumbnail',
        'foto',
        'konten',
        'slug'
    ];
    protected $table = 'berita';
}

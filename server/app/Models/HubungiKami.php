<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HubungiKami extends Model
{
    use HasFactory;

    protected $table = 'hubungi_kamis';

    protected $fillable = [
        'nama', 'email', 'pesan'
    ];
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sambutan extends Model
{
    use HasFactory;

    protected $fillable = [
        'foto',
        'nama',
        'isi',
    ];
    protected $table = 'sambutans';
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayananBK extends Model
{
    use HasFactory;

    protected $table = 'layananbk';

    protected $fillable = [
        'judul',
        'foto',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Akreditasi extends Model
{
    protected $fillable = ['instansi', 'no_sk', 'npsn', 'file'];

    use HasFactory;
}

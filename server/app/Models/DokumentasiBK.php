<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumentasiBK extends Model
{
    protected $table = 'dokumentasibk';

    use HasFactory;
    protected $fillable = ['judul' , 'foto'];
}

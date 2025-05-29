<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilBK extends Model
{
    protected $table = 'profilbk';
    protected $fillable = [
        'visi',
        'misi',
        'intro_text',
        'teacher_name',
        'teacher_birth',
        'teacher_education',
        'teacher_instagram',
        'teacher_photo'
    ];
}

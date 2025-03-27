<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daftar2 extends Model
{
    use HasFactory;

    // Tentukan nama tabel secara manual
    protected $table = 'daftar2';

    protected $fillable = [
        'user_id', 'full_name', 'birth_date', 'nik', 'whatsapp_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

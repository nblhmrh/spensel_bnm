<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berkas extends Model
{
    protected $table = 'berkas';

    protected $fillable = [
        'user_id',
        'surat_lulus',
        'surat_baik',
        'kartu_keluarga',
        'akta_lahir',
        'foto'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

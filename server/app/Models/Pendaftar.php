<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftar extends Model
{
    protected $table = 'pendaftar'; // atau nama tabel Anda

    public function datasiswa()
    {
        return $this->hasOne(Datasiswa::class, 'user_id', 'id');
    }

    public function dataortu()
    {
        return $this->hasOne(Dataortu::class, 'user_id', 'id');
    }

    public function berkas()
    {
        return $this->hasOne(Berkas::class, 'user_id', 'id');
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

  
    protected $fillable = [
        'name',
        'email',
        'whatsapp',
        'password',
        'role',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
      'password' => 'hashed'
    ];

    public function dataSiswa()
    {
        return $this->hasOne(DataSiswa::class);
    }

    public function dataOrtu()
    {
        return $this->hasOne(DataOrtu::class);
    }

    public function berkas()
    {
        return $this->hasOne(Berkas::class);
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

}

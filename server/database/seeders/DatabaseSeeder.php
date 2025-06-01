<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seeder user admin
        User::updateOrCreate([
            'email' => 'admin@email.com',
        ], [
            'name' => 'Admin',
            'whatsapp' => '12345678910',
            'password' => Hash::make('123456789'),
            'role' => 'admin',
        ]);
        // Seeder user BK
        User::updateOrCreate([
            'email' => 'bk@email.com',
        ], [
            'name' => 'BK',
            'whatsapp' => '12345678911',
            'password' => Hash::make('123456789'),
            'role' => 'bk',
        ]);
        // Seeder user biasa
        User::updateOrCreate([
            'email' => 'user@email.com',
        ], [
            'name' => 'User',
            'whatsapp' => '12345678912',
            'password' => Hash::make('123456789'),
            'role' => 'user',
        ]);
        // Panggil seeder lain jika ada
        $this->call([
            VisiMisiSeeder::class,
        ]);
    }
}

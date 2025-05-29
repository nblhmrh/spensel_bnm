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
            'password' => Hash::make('123456789'),
            'role' => 'admin',
        ]);
        // Seeder user BK
        User::updateOrCreate([
            'email' => 'bk@email.com',
        ], [
            'name' => 'BK',
            'password' => Hash::make('123456789'),
            'role' => 'bk',
        ]);
        // Seeder user biasa
        User::updateOrCreate([
            'email' => 'user@email.com',
        ], [
            'name' => 'User',
            'password' => Hash::make('123456789'),
            'role' => 'user',
        ]);
        // Panggil seeder lain jika ada
        $this->call([
            VisiMisiSeeder::class,
        ]);
    }
}

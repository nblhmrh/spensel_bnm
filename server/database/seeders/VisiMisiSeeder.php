<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VisiMisi;

class VisiMisiSeeder extends Seeder
{
    public function run(): void
    {
        VisiMisi::create([
            'visi' => 'Menjadi perusahaan terkemuka dalam industri fashion yang menghadirkan produk berkualitas dan inovatif.',
            'misi' => 'Menghadirkan produk fashion berkualitas tinggi dengan harga terjangkau. Memberikan pelayanan terbaik kepada pelanggan. Mengembangkan desain yang inovatif dan mengikuti tren fashion terkini.',
        ]);
    }
}

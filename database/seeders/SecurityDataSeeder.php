<?php

namespace Database\Seeders;

use App\Models\SecurityData;
use Illuminate\Database\Seeder;

class SecurityDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SecurityData::factory()->count(50)->create();
    }
}

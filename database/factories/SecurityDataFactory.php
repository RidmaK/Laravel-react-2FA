<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SecurityData>
 */
class SecurityDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['Malware', 'Phishing', 'Ransomware', 'DDoS', 'Data Breach']),
            'description' => $this->faker->sentence(),
            'value' => $this->faker->randomFloat(2, 0, 10000),
            'severity' => $this->faker->randomElement(['Low', 'Medium', 'High', 'Critical']),
            'detected_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'status' => $this->faker->randomElement(['open', 'in_progress', 'resolved']),
            'resolved_at' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
            'assigned_to' => $this->faker->name(),
            'response_time' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'threat_source' => $this->faker->domainName(),
        ];
    }
}

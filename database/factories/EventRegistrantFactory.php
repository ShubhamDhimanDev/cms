<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\EventRegistrant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<EventRegistrant>
 */
class EventRegistrantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional(0.6)->phoneNumber(),
            'status' => 'confirmed',
            'notes' => fake()->optional(0.3)->sentence(),
            'ip_address' => fake()->ipv4(),
        ];
    }

    public function cancelled(): static
    {
        return $this->state(['status' => 'cancelled']);
    }
}

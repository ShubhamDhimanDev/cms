<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4, false);
        $startsAt = fake()->dateTimeBetween('+1 day', '+3 months');
        $endsAt = (clone $startsAt)->modify('+2 hours');
        $type = fake()->randomElement(['online', 'in_person']);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 999),
            'excerpt' => fake()->sentence(),
            'type' => $type,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'timezone' => 'Europe/London',
            'location' => $type === 'online' ? 'Zoom Webinar' : fake()->city().' Campus',
            'location_url' => $type === 'online' ? 'https://zoom.us/j/'.fake()->numerify('##########') : null,
            'status' => 'published',
            'max_registrants' => fake()->optional(0.5)->numberBetween(20, 200),
            'user_id' => User::factory(),
        ];
    }

    public function draft(): static
    {
        return $this->state(['status' => 'draft']);
    }

    public function cancelled(): static
    {
        return $this->state(['status' => 'cancelled']);
    }

    public function online(): static
    {
        return $this->state([
            'type' => 'online',
            'location' => 'Zoom Webinar',
        ]);
    }

    public function inPerson(): static
    {
        return $this->state([
            'type' => 'in_person',
            'location' => 'Central London',
        ]);
    }
}

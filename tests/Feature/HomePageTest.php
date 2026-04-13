<?php

use App\Models\Event;
use Inertia\Testing\AssertableInertia;

it('renders the public home page', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('welcome')
            ->where('canRegister', true)
            ->where('upcomingEvents', [])
        );
});

it('shows only upcoming published events on home page', function () {
    $first = Event::factory()->create([
        'title' => 'First Upcoming Event',
        'status' => 'published',
        'starts_at' => now()->addDay(),
    ]);

    $second = Event::factory()->create([
        'title' => 'Second Upcoming Event',
        'status' => 'published',
        'starts_at' => now()->addDays(2),
    ]);

    $third = Event::factory()->create([
        'title' => 'Third Upcoming Event',
        'status' => 'published',
        'starts_at' => now()->addDays(3),
    ]);

    Event::factory()->create([
        'status' => 'draft',
        'starts_at' => now()->addDays(4),
    ]);

    Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->subDay(),
    ]);

    Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->addDays(5),
    ]);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('welcome')
            ->has('upcomingEvents', 3)
            ->where('upcomingEvents.0.title', $first->title)
            ->where('upcomingEvents.1.title', $second->title)
            ->where('upcomingEvents.2.title', $third->title)
        );
});

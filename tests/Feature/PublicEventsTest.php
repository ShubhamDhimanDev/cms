<?php

use App\Models\Event;
use App\Models\EventRegistrant;
use Inertia\Testing\AssertableInertia;

it('renders public events list with pagination', function () {
    Event::factory()->count(12)->create([
        'status' => 'published',
        'starts_at' => now()->addDays(2),
    ]);

    Event::factory()->create([
        'status' => 'draft',
        'starts_at' => now()->addDays(3),
    ]);

    Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->subDay(),
    ]);

    $this->get(route('events.index'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Events/Index')
            ->has('events.data', 9)
            ->where('events.total', 12)
            ->where('filter', 'upcoming')
        );
});

it('filters past events', function () {
    Event::factory()->count(3)->create([
        'status' => 'published',
        'starts_at' => now()->subDays(5),
    ]);

    Event::factory()->count(2)->create([
        'status' => 'published',
        'starts_at' => now()->addDays(2),
    ]);

    $this->get(route('events.index', ['filter' => 'past']))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Events/Index')
            ->where('events.total', 3)
            ->where('filter', 'past')
        );
});

it('filters all events', function () {
    Event::factory()->count(3)->create([
        'status' => 'published',
        'starts_at' => now()->subDays(5),
    ]);

    Event::factory()->count(2)->create([
        'status' => 'published',
        'starts_at' => now()->addDays(2),
    ]);

    Event::factory()->create([
        'status' => 'draft',
        'starts_at' => now()->addDays(1),
    ]);

    $this->get(route('events.index', ['filter' => 'all']))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Events/Index')
            ->where('events.total', 5)
            ->where('filter', 'all')
        );
});

it('renders public event detail by slug', function () {
    $event = Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->addDays(5),
        'slug' => 'open-day-london',
    ]);

    $this->get(route('events.show', ['event' => $event->slug]))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Events/Show')
            ->where('event.slug', 'open-day-london')
        );
});

it('registers a user for public event', function () {
    $event = Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->addDays(7),
        'slug' => 'visa-masterclass',
    ]);

    $response = $this->post(route('events.register', ['event' => $event->slug]), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '07123456789',
        'notes' => 'Looking forward to it.',
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertSessionHas('success');

    expect(EventRegistrant::query()->where('event_id', $event->id)->count())->toBe(1);
});

it('does not register when registration has ended', function () {
    $event = Event::factory()->create([
        'status' => 'published',
        'starts_at' => now()->addDays(2),
        'registration_ends_at' => now()->subMinute(),
        'slug' => 'registration-closed-event',
    ]);

    $response = $this->from(route('events.show', ['event' => $event->slug]))
        ->post(route('events.register', ['event' => $event->slug]), [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

    $response
        ->assertRedirect(route('events.show', ['event' => $event->slug]))
        ->assertSessionHasErrors([
            'event' => 'This event is no longer open for registration.',
        ]);

    expect(EventRegistrant::query()->where('event_id', $event->id)->count())->toBe(0);
});

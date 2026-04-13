<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class PublicEventController extends Controller
{
    public function index(): Response
    {
        $events = Event::query()
            ->where('status', 'published')
            ->where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->paginate(9)
            ->through(fn (Event $event): array => $this->formatEvent($event));

        return Inertia::render('Public/Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event): Response
    {
        abort_unless($event->status === 'published', 404);
        abort_if($event->starts_at?->isPast(), 404);

        $event->loadCount([
            'registrants as confirmed_registrants_count' => fn ($query) => $query->where('status', 'confirmed'),
        ]);

        return Inertia::render('Public/Events/Show', [
            'event' => [
                ...$this->formatEvent($event),
                'confirmed_registrants_count' => $event->confirmed_registrants_count,
                'is_full' => $event->isFull(),
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatEvent(Event $event): array
    {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'slug' => $event->slug,
            'excerpt' => $event->excerpt,
            'type' => $event->type,
            'starts_at' => $event->starts_at?->toISOString(),
            'ends_at' => $event->ends_at?->toISOString(),
            'timezone' => $event->timezone,
            'location' => $event->location,
            'location_url' => $event->location_url,
            'max_registrants' => $event->max_registrants,
            'created_at' => $event->created_at?->toISOString(),
        ];
    }
}

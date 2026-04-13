<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Http\Requests\Admin\UpdateEventRequest;
use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct(
        private readonly EventService $eventService,
    ) {}

    public function index(): Response
    {
        $events = Event::query()
            ->withCount(['registrants as confirmed_registrants_count' => fn ($q) => $q->whereIn('status', ['pending', 'confirmed'])])
            ->latest('starts_at')
            ->paginate(15)
            ->through(fn (Event $event): array => $this->formatEvent($event));

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create');
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $this->eventService->create($request->validated(), $request->user()->id);

        return to_route('admin.events.index')->with('success', 'Event created successfully.');
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $this->formatEvent($event),
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $this->eventService->update($event, $request->validated());

        return to_route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    public function cancel(Event $event): RedirectResponse
    {
        $this->eventService->cancel($event);

        return back()->with('success', 'Event cancelled.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->eventService->delete($event);

        return to_route('admin.events.index')->with('success', 'Event deleted.');
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
            'status' => $event->status,
            'max_registrants' => $event->max_registrants,
            'confirmed_registrants_count' => (int) ($event->confirmed_registrants_count ?? 0),
            'created_at' => $event->created_at?->toISOString(),
        ];
    }
}

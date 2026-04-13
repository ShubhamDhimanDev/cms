<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistrant;
use App\Services\EventService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventRegistrantController extends Controller
{
    public function __construct(
        private readonly EventService $eventService,
    ) {}

    public function index(Event $event): Response
    {
        $registrants = $event->registrants()
            ->latest()
            ->paginate(30)
            ->through(fn (EventRegistrant $registrant): array => [
                'id' => $registrant->id,
                'name' => $registrant->name,
                'email' => $registrant->email,
                'phone' => $registrant->phone,
                'status' => $registrant->status,
                'notes' => $registrant->notes,
                'created_at' => $registrant->created_at?->toISOString(),
            ]);

        return Inertia::render('Admin/Events/Registrants', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'starts_at' => $event->starts_at?->toISOString(),
                'status' => $event->status,
                'max_registrants' => $event->max_registrants,
            ],
            'registrants' => $registrants,
        ]);
    }

    public function cancel(Event $event, EventRegistrant $registrant): RedirectResponse
    {
        $this->eventService->cancelRegistrant($registrant);

        return back()->with('success', 'Registration cancelled.');
    }

    public function destroy(Event $event, EventRegistrant $registrant): RedirectResponse
    {
        $this->eventService->deleteRegistrant($registrant);

        return back()->with('success', 'Registrant deleted.');
    }
}

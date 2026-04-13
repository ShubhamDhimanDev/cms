<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRegistrationRequest;
use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class PublicEventRegistrationController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function store(StoreEventRegistrationRequest $request, Event $event, EventService $eventService): RedirectResponse
    {
        $eventService->register(
            $event,
            $request->validated(),
            $request->ip(),
        );

        return back()->with('success', 'Event details have been sent to your email address.');
    }
}

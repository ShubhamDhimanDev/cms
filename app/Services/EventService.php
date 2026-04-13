<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventRegistrant;
use App\Notifications\EventRegistrationConfirmed;
use App\Notifications\NewEventRegistrantNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

class EventService
{
    public function create(array $data, int $userId): Event
    {
        return Event::create([...$data, 'user_id' => $userId]);
    }

    public function update(Event $event, array $data): Event
    {
        $event->update($data);

        return $event->fresh();
    }

    public function cancel(Event $event): Event
    {
        $event->update(['status' => 'cancelled']);

        return $event;
    }

    public function delete(Event $event): void
    {
        $event->delete();
    }

    /**
     * @param  array{name: string, email: string, phone?: string|null, notes?: string|null}  $data
     *
     * @throws ValidationException
     */
    public function register(Event $event, array $data, ?string $ipAddress): EventRegistrant
    {
        if ($event->status !== 'published') {
            throw ValidationException::withMessages(['event' => 'This event is not available for registration.']);
        }

        if ($event->hasRegistrationEnded()) {
            throw ValidationException::withMessages(['event' => 'This event is no longer open for registration.']);
        }

        if ($event->isFull()) {
            throw ValidationException::withMessages(['event' => 'This event is fully booked.']);
        }

        /** @var EventRegistrant $registrant */
        $registrant = $event->registrants()->create([
            ...$data,
            'status' => 'confirmed',
            'ip_address' => $ipAddress,
        ]);

        $registrant->notify(new EventRegistrationConfirmed($event));

        Notification::route('mail', config('mail.from.address'))
            ->notify(new NewEventRegistrantNotification($event, $registrant));

        return $registrant;
    }

    public function cancelRegistrant(EventRegistrant $registrant): EventRegistrant
    {
        $registrant->update(['status' => 'cancelled']);

        return $registrant;
    }

    public function deleteRegistrant(EventRegistrant $registrant): void
    {
        $registrant->delete();
    }
}

<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventRegistrationConfirmed extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly Event $event,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $startsAt = $this->event->starts_at->setTimezone($this->event->timezone);
        $endsAt = $this->event->ends_at?->setTimezone($this->event->timezone);
        $timeRange = $endsAt
            ? $startsAt->format('g:i A').' – '.$endsAt->format('g:i A T')
            : $startsAt->format('g:i A T');

        return (new MailMessage)
            ->subject("You're registered: {$this->event->title}")
            ->greeting("Hello {$notifiable->name},")
            ->line("Thank you for registering for **{$this->event->title}**.")
            ->line("**Date:** {$startsAt->format('l, F j, Y')}")
            ->line("**Time:** {$timeRange}")
            ->line("**Location:** {$this->event->location}")
            ->line('We look forward to seeing you there.')
            ->salutation('Smart Move Education Group');
    }
}

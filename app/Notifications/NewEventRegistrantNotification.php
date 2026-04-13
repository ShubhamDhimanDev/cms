<?php

namespace App\Notifications;

use App\Models\Event;
use App\Models\EventRegistrant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewEventRegistrantNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly Event $event,
        public readonly EventRegistrant $registrant,
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
        $adminUrl = url("/admin/events/{$this->event->id}/registrants");

        return (new MailMessage)
            ->subject("New Registration: {$this->event->title}")
            ->greeting('Hello Admin,')
            ->line("{$this->registrant->name} ({$this->registrant->email}) has registered for **{$this->event->title}**.")
            ->action('View Registrants', $adminUrl)
            ->salutation('Smart Move CMS');
    }
}

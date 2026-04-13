<?php

namespace App\Models;

use Database\Factories\EventRegistrantFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class EventRegistrant extends Model
{
    /** @use HasFactory<EventRegistrantFactory> */
    use HasFactory;

    use Notifiable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'event_id',
        'name',
        'email',
        'phone',
        'status',
        'notes',
        'ip_address',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function routeNotificationForMail(): string
    {
        return $this->email;
    }
}

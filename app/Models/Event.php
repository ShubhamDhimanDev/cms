<?php

namespace App\Models;

use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    use SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'type',
        'starts_at',
        'ends_at',
        'timezone',
        'location',
        'location_url',
        'status',
        'max_registrants',
        'user_id',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'max_registrants' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (self $event): void {
            if (blank($event->slug)) {
                $event->slug = Str::slug($event->title);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function registrants(): HasMany
    {
        return $this->hasMany(EventRegistrant::class);
    }

    public function isFull(): bool
    {
        if ($this->max_registrants === null) {
            return false;
        }

        return $this->registrants()
            ->whereIn('status', ['pending', 'confirmed'])
            ->count() >= $this->max_registrants;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Page extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'layout',
        'builder_data',
        'meta_title',
        'meta_description',
        'status',
        'published_at',
    ];

    /**
     * @return array<string, string>
     */
    protected $casts = [
        'layout' => 'array',
        'published_at' => 'datetime',
        'status' => 'string',
        'builder_data' => 'array',
    ];

    public function getHasBuilderLayoutAttribute(): bool
    {
        return $this->layout !== null
            && is_array($this->layout)
            && array_key_exists('sections', $this->layout);
    }

    protected static function booted(): void
    {
        static::saving(function (self $page): void {
            if (blank($page->slug)) {
                $page->slug = Str::slug($page->title);
            }
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')->singleFile();
    }
}

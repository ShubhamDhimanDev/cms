@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];
    $videoUrl = (string) ($settings['videoUrl'] ?? '');
    $autoplay = (bool) ($settings['autoplay'] ?? false);

    $embedUrl = null;

    if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/', $videoUrl, $matches)) {
        $embedUrl = 'https://www.youtube.com/embed/'.$matches[1];
    } elseif (preg_match('/vimeo\.com\/(\d+)/', $videoUrl, $matches)) {
        $embedUrl = 'https://player.vimeo.com/video/'.$matches[1];
    }

    if ($embedUrl && $autoplay) {
        $embedUrl .= '?autoplay=1';
    }

    $wrapperStyle = collect([
        'padding' => $settings['padding'] ?? null,
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $iframeStyle = collect([
        'border' => $settings['border'] ?? '0',
        'border-radius' => $settings['borderRadius'] ?? null,
        'width' => '100%',
        'aspect-ratio' => '16 / 9',
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');
@endphp

<div style="{{ $wrapperStyle }}">
    @if($embedUrl)
        <iframe
            src="{{ e($embedUrl) }}"
            style="{{ $iframeStyle }}"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
    @endif
</div>

@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];

    $wrapperStyle = collect([
        'padding' => $settings['padding'] ?? null,
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $imgStyle = collect([
        'width' => $settings['width'] ?? null,
        'border-radius' => $settings['borderRadius'] ?? null,
        'display' => 'block',
        'max-width' => '100%',
        'height' => 'auto',
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $src = $settings['src'] ?? null;
    $alt = $settings['alt'] ?? '';
@endphp

<div style="{{ $wrapperStyle }}">
    @if(filled($src))
        <img src="{{ e($src) }}" alt="{{ e($alt) }}" style="{{ $imgStyle }}">
    @endif
</div>

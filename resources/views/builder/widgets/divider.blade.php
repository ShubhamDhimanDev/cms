@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];

    $styleType = $settings['style'] ?? 'solid';

    $style = collect([
        'border' => 'none',
        'border-top-width' => ($settings['height'] ?? 1).'px',
        'border-top-style' => $styleType,
        'border-top-color' => $settings['color'] ?? '#d1d5db',
        'margin' => $settings['margin'] ?? '12px 0',
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');
@endphp

<hr style="{{ $style }}">

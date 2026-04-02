@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];
    $allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    $tag = in_array($settings['tag'] ?? 'h2', $allowedTags, true) ? $settings['tag'] : 'h2';

    $style = collect([
        'color' => $settings['color'] ?? null,
        'font-size' => $settings['fontSize'] ?? null,
        'font-weight' => $settings['fontWeight'] ?? null,
        'text-align' => $settings['textAlign'] ?? null,
        'padding' => $settings['padding'] ?? null,
        'margin' => $settings['margin'] ?? null,
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $text = $settings['text'] ?? 'Heading';
@endphp

<{{ $tag }} style="{{ $style }}">{{ $text }}</{{ $tag }}>

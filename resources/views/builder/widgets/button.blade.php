@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];

    $variant = $settings['variant'] ?? 'solid';

    $baseStyles = [
        'display' => 'inline-block',
        'text-decoration' => 'none',
        'cursor' => 'pointer',
        'transition' => 'all .2s ease',
    ];

    $variantStyles = match ($variant) {
        'outline' => [
            'background-color' => 'transparent',
            'border' => $settings['border'] ?? '1px solid '.($settings['color'] ?? '#111827'),
            'color' => $settings['color'] ?? '#111827',
        ],
        'ghost' => [
            'background-color' => 'transparent',
            'border' => 'none',
            'color' => $settings['color'] ?? '#111827',
        ],
        default => [
            'background-color' => $settings['backgroundColor'] ?? '#111827',
            'border' => $settings['border'] ?? '1px solid transparent',
            'color' => $settings['color'] ?? '#ffffff',
        ],
    };

    $style = collect(array_merge($baseStyles, $variantStyles, [
        'border-radius' => $settings['borderRadius'] ?? null,
        'padding' => $settings['padding'] ?? '10px 14px',
        'font-size' => $settings['fontSize'] ?? null,
        'text-align' => $settings['textAlign'] ?? null,
    ]))->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $label = $settings['label'] ?? 'Button';
    $url = $settings['url'] ?? '#';
    $target = $settings['target'] ?? '_self';
@endphp

<a href="{{ e($url) }}" target="{{ e($target) }}" style="{{ $style }}">{{ $label }}</a>

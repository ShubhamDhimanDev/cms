@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];

    $style = collect([
        'color' => $settings['color'] ?? null,
        'font-size' => $settings['fontSize'] ?? null,
        'font-weight' => $settings['fontWeight'] ?? null,
        'text-align' => $settings['textAlign'] ?? null,
        'line-height' => $settings['lineHeight'] ?? null,
        'letter-spacing' => $settings['letterSpacing'] ?? null,
        'padding' => $settings['padding'] ?? null,
        'margin' => $settings['margin'] ?? null,
    ])->filter(fn ($value) => $value !== null && $value !== '')->map(fn ($value, $key) => $key.': '.$value)->implode('; ');

    $content = $settings['content'] ?? '';

    $config = \HTMLPurifier_Config::createDefault();
    $purifier = new \HTMLPurifier($config);
    $safeHtml = $purifier->purify((string) $content);
@endphp

<div style="{{ $style }}">{!! $safeHtml !!}</div>

@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];
    $height = $settings['height'] ?? '40px';
@endphp

<div style="height: {{ e($height) }};"></div>

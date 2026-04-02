@php
    $settings = is_array($widget['settings'] ?? null) ? $widget['settings'] : [];
    $html = (string) ($settings['html'] ?? '');

    $config = \HTMLPurifier_Config::createDefault();
    $purifier = new \HTMLPurifier($config);
    $safeHtml = $purifier->purify($html);
@endphp

<div>{!! $safeHtml !!}</div>

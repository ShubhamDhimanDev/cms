@php
    $sections = is_array($layout['sections'] ?? null) ? $layout['sections'] : [];

    $toCss = function (array $styles): string {
        $parts = [];

        foreach ($styles as $property => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            $parts[] = $property.': '.$value;
        }

        return implode('; ', $parts);
    };

    $px = function ($value): ?string {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return $value.'px';
        }

        return (string) $value;
    };
@endphp

@foreach($sections as $section)
    @php
        $settings = is_array($section['settings'] ?? null) ? $section['settings'] : [];
        $columns = is_array($section['columns'] ?? null) ? $section['columns'] : [];

        $sectionStyle = $toCss([
            'background-color' => $settings['background'] ?? null,
            'background-image' => filled($settings['backgroundImage'] ?? null) ? "url('".e($settings['backgroundImage'])."')" : null,
            'background-size' => $settings['backgroundSize'] ?? null,
            'padding-top' => $px($settings['paddingTop'] ?? null),
            'padding-right' => $px($settings['paddingRight'] ?? null),
            'padding-bottom' => $px($settings['paddingBottom'] ?? null),
            'padding-left' => $px($settings['paddingLeft'] ?? null),
            'margin-top' => $px($settings['marginTop'] ?? null),
            'margin-bottom' => $px($settings['marginBottom'] ?? null),
        ]);

        $innerStyle = $toCss([
            'max-width' => ($settings['fullWidth'] ?? false) ? null : ($settings['maxWidth'] ?? '1200px'),
            'margin-left' => ($settings['fullWidth'] ?? false) ? null : 'auto',
            'margin-right' => ($settings['fullWidth'] ?? false) ? null : 'auto',
        ]);

        $columnsWrapStyle = $toCss([
            'display' => 'flex',
            'align-items' => 'stretch',
            'column-gap' => $px($settings['columnGap'] ?? null),
        ]);
    @endphp

    <section id="{{ e($section['id'] ?? '') }}" style="{{ $sectionStyle }}">
        <div style="{{ $innerStyle }}">
            <div style="{{ $columnsWrapStyle }}">
                @foreach($columns as $column)
                    @php
                        $columnSettings = is_array($column['settings'] ?? null) ? $column['settings'] : [];
                        $columnStyle = $toCss([
                            'width' => (($column['width'] ?? 100)).'%',
                            'background-color' => $columnSettings['background'] ?? null,
                            'padding-top' => $px($columnSettings['paddingTop'] ?? null),
                            'padding-right' => $px($columnSettings['paddingRight'] ?? null),
                            'padding-bottom' => $px($columnSettings['paddingBottom'] ?? null),
                            'padding-left' => $px($columnSettings['paddingLeft'] ?? null),
                        ]);

                        $widgets = is_array($column['widgets'] ?? null) ? $column['widgets'] : [];
                    @endphp

                    <div style="{{ $columnStyle }}">
                        @foreach($widgets as $widget)
                            @includeIf('builder.widgets.' . ($widget['type'] ?? ''), ['widget' => $widget])
                        @endforeach
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endforeach

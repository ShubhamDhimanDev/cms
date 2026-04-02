import { useEffect, useMemo, useRef, useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import type { Widget, WidgetSettings } from '@/types/builder';

type Props = {
    sectionId: string;
    columnId: string;
    widget: Widget;
};

type Tab = 'content' | 'style' | 'advanced';

type BorderParts = {
    width: string;
    style: 'solid' | 'dashed' | 'dotted';
    color: string;
};

function parseSizeWithUnit(value?: string): { value: string; unit: 'px' | 'em' | 'rem' } {
    if (!value) {
        return { value: '', unit: 'px' };
    }

    const matched = value.trim().match(/^(-?\d+(?:\.\d+)?)(px|em|rem)?$/i);

    if (!matched) {
        return { value: value, unit: 'px' };
    }

    return {
        value: matched[1],
        unit: (matched[2]?.toLowerCase() as 'px' | 'em' | 'rem' | undefined) ?? 'px',
    };
}

function parseSpacing(value?: string): [string, string, string, string] {
    if (!value?.trim()) {
        return ['', '', '', ''];
    }

    const parts = value.trim().split(/\s+/);

    if (parts.length === 1) {
        return [parts[0], parts[0], parts[0], parts[0]];
    }

    if (parts.length === 2) {
        return [parts[0], parts[1], parts[0], parts[1]];
    }

    if (parts.length === 3) {
        return [parts[0], parts[1], parts[2], parts[1]];
    }

    return [parts[0], parts[1], parts[2], parts[3]];
}

function toNumberInput(value: string): string {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? '' : String(parsed);
}

function parseBorder(value?: string): BorderParts {
    if (!value?.trim()) {
        return { width: '1', style: 'solid', color: '#d4d4d8' };
    }

    const parts = value.trim().split(/\s+/);
    const width = toNumberInput(parts[0] ?? '1px') || '1';
    const style = (parts[1] as BorderParts['style'] | undefined) ?? 'solid';
    const color = parts[2] ?? '#d4d4d8';

    return {
        width,
        style: style === 'dashed' || style === 'dotted' ? style : 'solid',
        color,
    };
}

function buildSpacing(top: string, right: string, bottom: string, left: string): string {
    return `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
}

export default function WidgetSettingsPanel({ sectionId, columnId, widget }: Props) {
    const updateWidgetSettings = useBuilderStore((state) => state.updateWidgetSettings);
    const [tab, setTab] = useState<Tab>('content');
    const timersRef = useRef<Record<string, number>>({});

    useEffect(() => {
        return () => {
            Object.values(timersRef.current).forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, []);

    const updateImmediate = (settings: Partial<WidgetSettings>) => {
        updateWidgetSettings(sectionId, columnId, widget.id, settings);
    };

    const updateDebounced = (key: keyof WidgetSettings, value: string) => {
        const timerKey = String(key);
        const existing = timersRef.current[timerKey];

        if (existing) {
            window.clearTimeout(existing);
        }

        timersRef.current[timerKey] = window.setTimeout(() => {
            updateWidgetSettings(sectionId, columnId, widget.id, { [key]: value });
        }, 300);
    };

    const fontSize = useMemo(() => parseSizeWithUnit(widget.settings.fontSize), [widget.settings.fontSize]);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = useMemo(
        () => parseSpacing(widget.settings.padding),
        [widget.settings.padding],
    );
    const [marginTop, marginRight, marginBottom, marginLeft] = useMemo(
        () => parseSpacing(widget.settings.margin),
        [widget.settings.margin],
    );
    const border = useMemo(() => parseBorder(widget.settings.border), [widget.settings.border]);

    return (
        <div className="space-y-4 rounded-lg border border-neutral-700 bg-[#26263a] p-3 text-sm">
            <p className="text-xs font-semibold tracking-wide text-neutral-300 uppercase">Widget</p>

            <div className="grid grid-cols-3 rounded border border-neutral-700 p-1 text-xs">
                {(['content', 'style', 'advanced'] as const).map((entry) => (
                    <button
                        key={entry}
                        type="button"
                        onClick={() => setTab(entry)}
                        className={`rounded px-2 py-1.5 font-medium uppercase transition ${
                            tab === entry ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-300 hover:bg-neutral-700'
                        }`}
                    >
                        {entry}
                    </button>
                ))}
            </div>

            {tab === 'content' ? (
                <div className="space-y-3">
                    {widget.type === 'heading' ? (
                        <>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Text</span>
                                <textarea
                                    value={widget.settings.text ?? ''}
                                    onChange={(event) => updateDebounced('text', event.target.value)}
                                    rows={3}
                                    className="w-full rounded border border-neutral-600 bg-neutral-900 px-2 py-1.5 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Tag</span>
                                <select
                                    value={widget.settings.tag ?? 'h2'}
                                    onChange={(event) =>
                                        updateImmediate({
                                            tag: event.target.value as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
                                        })
                                    }
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                >
                                    <option value="h1">h1</option>
                                    <option value="h2">h2</option>
                                    <option value="h3">h3</option>
                                    <option value="h4">h4</option>
                                    <option value="h5">h5</option>
                                    <option value="h6">h6</option>
                                </select>
                            </label>
                        </>
                    ) : null}

                    {widget.type === 'text' ? (
                        <label className="block space-y-1">
                            <span className="text-xs text-neutral-300">Content</span>
                            <textarea
                                value={widget.settings.content ?? ''}
                                onChange={(event) => updateDebounced('content', event.target.value)}
                                rows={5}
                                className="w-full rounded border border-neutral-600 bg-neutral-900 px-2 py-1.5 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                    ) : null}

                    {widget.type === 'image' ? (
                        <>
                            <div className="space-y-1">
                                <span className="text-xs text-neutral-300">Image URL</span>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={widget.settings.src ?? ''}
                                        onChange={(event) => updateDebounced('src', event.target.value)}
                                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                    />
                                    <button
                                        type="button"
                                        className="h-9 rounded border border-neutral-600 px-2 text-xs text-neutral-200 hover:bg-neutral-700"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Alt text</span>
                                <input
                                    type="text"
                                    value={widget.settings.alt ?? ''}
                                    onChange={(event) => updateDebounced('alt', event.target.value)}
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Width</span>
                                <input
                                    type="text"
                                    value={widget.settings.width ?? ''}
                                    onChange={(event) => updateDebounced('width', event.target.value)}
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                        </>
                    ) : null}

                    {widget.type === 'button' ? (
                        <>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Label</span>
                                <input
                                    type="text"
                                    value={widget.settings.label ?? ''}
                                    onChange={(event) => updateDebounced('label', event.target.value)}
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">URL</span>
                                <input
                                    type="text"
                                    value={widget.settings.url ?? ''}
                                    onChange={(event) => updateDebounced('url', event.target.value)}
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="space-y-1">
                                    <span className="text-xs text-neutral-300">Target</span>
                                    <select
                                        value={widget.settings.target ?? '_self'}
                                        onChange={(event) => updateImmediate({ target: event.target.value as '_self' | '_blank' })}
                                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                    >
                                        <option value="_self">_self</option>
                                        <option value="_blank">_blank</option>
                                    </select>
                                </label>
                                <label className="space-y-1">
                                    <span className="text-xs text-neutral-300">Variant</span>
                                    <select
                                        value={widget.settings.variant ?? 'solid'}
                                        onChange={(event) =>
                                            updateImmediate({
                                                variant: event.target.value as 'solid' | 'outline' | 'ghost',
                                            })
                                        }
                                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                    >
                                        <option value="solid">solid</option>
                                        <option value="outline">outline</option>
                                        <option value="ghost">ghost</option>
                                    </select>
                                </label>
                            </div>
                        </>
                    ) : null}

                    {widget.type === 'divider' ? (
                        <>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Style</span>
                                <select
                                    value={widget.settings.dividerStyle ?? 'solid'}
                                    onChange={(event) =>
                                        updateImmediate({
                                            dividerStyle: event.target.value as 'solid' | 'dashed' | 'dotted',
                                        })
                                    }
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                >
                                    <option value="solid">solid</option>
                                    <option value="dashed">dashed</option>
                                    <option value="dotted">dotted</option>
                                </select>
                            </label>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Color</span>
                                <input
                                    type="color"
                                    value={widget.settings.color ?? '#d4d4d8'}
                                    onChange={(event) => updateImmediate({ color: event.target.value })}
                                    className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                                />
                            </label>
                        </>
                    ) : null}

                    {widget.type === 'spacer' ? (
                        <label className="block space-y-1">
                            <span className="text-xs text-neutral-300">Height</span>
                            <input
                                type="text"
                                value={widget.settings.height ?? ''}
                                onChange={(event) => updateDebounced('height', event.target.value)}
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                    ) : null}

                    {widget.type === 'video' ? (
                        <>
                            <label className="block space-y-1">
                                <span className="text-xs text-neutral-300">Video URL</span>
                                <input
                                    type="text"
                                    value={widget.settings.videoUrl ?? ''}
                                    onChange={(event) => updateDebounced('videoUrl', event.target.value)}
                                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                                />
                            </label>
                            <label className="flex items-center justify-between rounded border border-neutral-700 px-2 py-2">
                                <span className="text-xs text-neutral-200">Autoplay</span>
                                <input
                                    type="checkbox"
                                    checked={Boolean(widget.settings.autoplay)}
                                    onChange={(event) => updateImmediate({ autoplay: event.target.checked })}
                                    className="h-4 w-4"
                                />
                            </label>
                        </>
                    ) : null}

                    {widget.type === 'html' ? (
                        <label className="block space-y-1">
                            <span className="text-xs text-neutral-300">HTML</span>
                            <textarea
                                value={widget.settings.html ?? ''}
                                onChange={(event) => updateDebounced('html', event.target.value)}
                                rows={8}
                                className="w-full rounded border border-neutral-600 bg-neutral-900 px-2 py-1.5 font-mono text-xs text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                    ) : null}
                </div>
            ) : null}

            {tab === 'style' ? (
                <div className="space-y-3">
                    <div className="grid grid-cols-[1fr_auto] gap-2">
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Font Size</span>
                            <input
                                type="text"
                                value={fontSize.value}
                                onChange={(event) =>
                                    updateDebounced('fontSize', `${event.target.value}${fontSize.unit}`)
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Unit</span>
                            <select
                                value={fontSize.unit}
                                onChange={(event) =>
                                    updateImmediate({
                                        fontSize: `${fontSize.value || 16}${event.target.value}`,
                                    })
                                }
                                className="h-9 rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            >
                                <option value="px">px</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </label>
                    </div>

                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Font Weight</span>
                        <select
                            value={widget.settings.fontWeight ?? '500'}
                            onChange={(event) => updateImmediate({ fontWeight: event.target.value })}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        >
                            <option value="400">400</option>
                            <option value="500">500</option>
                            <option value="600">600</option>
                            <option value="700">700</option>
                            <option value="800">800</option>
                        </select>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Text Color</span>
                            <input
                                type="color"
                                value={widget.settings.color ?? '#111827'}
                                onChange={(event) => updateImmediate({ color: event.target.value })}
                                className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Background Color</span>
                            <input
                                type="color"
                                value={widget.settings.backgroundColor ?? '#ffffff'}
                                onChange={(event) => updateImmediate({ backgroundColor: event.target.value })}
                                className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                            />
                        </label>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-neutral-300">Text Align</span>
                        <div className="grid grid-cols-3 gap-2">
                            {(['left', 'center', 'right'] as const).map((align) => (
                                <button
                                    key={align}
                                    type="button"
                                    onClick={() => updateImmediate({ textAlign: align })}
                                    className={`h-9 rounded border text-xs uppercase ${
                                        widget.settings.textAlign === align
                                            ? 'border-sky-500 bg-sky-600 text-white'
                                            : 'border-neutral-600 text-neutral-200 hover:bg-neutral-700'
                                    }`}
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Padding Top</span>
                            <input
                                type="number"
                                value={toNumberInput(paddingTop)}
                                onChange={(event) =>
                                    updateImmediate({
                                        padding: buildSpacing(event.target.value, toNumberInput(paddingRight), toNumberInput(paddingBottom), toNumberInput(paddingLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Padding Right</span>
                            <input
                                type="number"
                                value={toNumberInput(paddingRight)}
                                onChange={(event) =>
                                    updateImmediate({
                                        padding: buildSpacing(toNumberInput(paddingTop), event.target.value, toNumberInput(paddingBottom), toNumberInput(paddingLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Padding Bottom</span>
                            <input
                                type="number"
                                value={toNumberInput(paddingBottom)}
                                onChange={(event) =>
                                    updateImmediate({
                                        padding: buildSpacing(toNumberInput(paddingTop), toNumberInput(paddingRight), event.target.value, toNumberInput(paddingLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Padding Left</span>
                            <input
                                type="number"
                                value={toNumberInput(paddingLeft)}
                                onChange={(event) =>
                                    updateImmediate({
                                        padding: buildSpacing(toNumberInput(paddingTop), toNumberInput(paddingRight), toNumberInput(paddingBottom), event.target.value),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Margin Top</span>
                            <input
                                type="number"
                                value={toNumberInput(marginTop)}
                                onChange={(event) =>
                                    updateImmediate({
                                        margin: buildSpacing(event.target.value, toNumberInput(marginRight), toNumberInput(marginBottom), toNumberInput(marginLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Margin Right</span>
                            <input
                                type="number"
                                value={toNumberInput(marginRight)}
                                onChange={(event) =>
                                    updateImmediate({
                                        margin: buildSpacing(toNumberInput(marginTop), event.target.value, toNumberInput(marginBottom), toNumberInput(marginLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Margin Bottom</span>
                            <input
                                type="number"
                                value={toNumberInput(marginBottom)}
                                onChange={(event) =>
                                    updateImmediate({
                                        margin: buildSpacing(toNumberInput(marginTop), toNumberInput(marginRight), event.target.value, toNumberInput(marginLeft)),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Margin Left</span>
                            <input
                                type="number"
                                value={toNumberInput(marginLeft)}
                                onChange={(event) =>
                                    updateImmediate({
                                        margin: buildSpacing(toNumberInput(marginTop), toNumberInput(marginRight), toNumberInput(marginBottom), event.target.value),
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                    </div>

                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Border Radius</span>
                        <input
                            type="text"
                            value={widget.settings.borderRadius ?? ''}
                            onChange={(event) => updateDebounced('borderRadius', event.target.value)}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        />
                    </label>

                    <div className="grid grid-cols-[80px_1fr_90px] gap-2">
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Border</span>
                            <input
                                type="number"
                                value={border.width}
                                onChange={(event) =>
                                    updateImmediate({
                                        border: `${event.target.value || 0}px ${border.style} ${border.color}`,
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            />
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Style</span>
                            <select
                                value={border.style}
                                onChange={(event) =>
                                    updateImmediate({
                                        border: `${border.width}px ${event.target.value} ${border.color}`,
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                            >
                                <option value="solid">solid</option>
                                <option value="dashed">dashed</option>
                                <option value="dotted">dotted</option>
                            </select>
                        </label>
                        <label className="space-y-1">
                            <span className="text-xs text-neutral-300">Color</span>
                            <input
                                type="color"
                                value={border.color}
                                onChange={(event) =>
                                    updateImmediate({
                                        border: `${border.width}px ${border.style} ${event.target.value}`,
                                    })
                                }
                                className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                            />
                        </label>
                    </div>

                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Line Height</span>
                        <input
                            type="text"
                            value={widget.settings.lineHeight ?? ''}
                            onChange={(event) => updateDebounced('lineHeight', event.target.value)}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Letter Spacing</span>
                        <input
                            type="text"
                            value={widget.settings.letterSpacing ?? ''}
                            onChange={(event) => updateDebounced('letterSpacing', event.target.value)}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        />
                    </label>
                </div>
            ) : null}

            {tab === 'advanced' ? (
                <div className="space-y-3">
                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Custom CSS class</span>
                        <input
                            type="text"
                            value={widget.settings.customClass ?? ''}
                            onChange={(event) => updateDebounced('customClass', event.target.value)}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-xs text-neutral-300">Custom ID</span>
                        <input
                            type="text"
                            value={widget.settings.customId ?? ''}
                            onChange={(event) => updateDebounced('customId', event.target.value)}
                            className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                        />
                    </label>

                    <label className="flex items-center justify-between rounded border border-neutral-700 px-2 py-2">
                        <span className="text-xs text-neutral-200">Hide on Desktop</span>
                        <input
                            type="checkbox"
                            checked={Boolean(widget.settings.hideDesktop)}
                            onChange={(event) => updateImmediate({ hideDesktop: event.target.checked })}
                            className="h-4 w-4"
                        />
                    </label>
                    <label className="flex items-center justify-between rounded border border-neutral-700 px-2 py-2">
                        <span className="text-xs text-neutral-200">Hide on Tablet</span>
                        <input
                            type="checkbox"
                            checked={Boolean(widget.settings.hideTablet)}
                            onChange={(event) => updateImmediate({ hideTablet: event.target.checked })}
                            className="h-4 w-4"
                        />
                    </label>
                    <label className="flex items-center justify-between rounded border border-neutral-700 px-2 py-2">
                        <span className="text-xs text-neutral-200">Hide on Mobile</span>
                        <input
                            type="checkbox"
                            checked={Boolean(widget.settings.hideMobile)}
                            onChange={(event) => updateImmediate({ hideMobile: event.target.checked })}
                            className="h-4 w-4"
                        />
                    </label>
                </div>
            ) : null}
        </div>
    );
}

import { useMemo } from 'react';
import type { Widget } from '@/types/builder';

type TextWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

function sanitizeHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
        .replace(/ on\w+=(["']).*?\1/gi, '')
        .replace(/javascript:/gi, '');
}

export default function TextWidget({ widget, isSelected }: TextWidgetProps) {
    const content = widget.settings.content?.trim() ?? '';

    const style = useMemo(
        () => ({
            color: widget.settings.color,
            fontSize: widget.settings.fontSize,
            fontWeight: widget.settings.fontWeight,
            textAlign: widget.settings.textAlign,
            padding: widget.settings.padding,
            margin: widget.settings.margin,
            lineHeight: widget.settings.lineHeight,
            letterSpacing: widget.settings.letterSpacing,
        }),
        [widget.settings],
    );

    if (!content) {
        return (
            <div
                style={style}
                className={`rounded border border-dashed px-3 py-2 text-sm ${
                    isSelected ? 'border-sky-300 text-sky-700' : 'border-neutral-300 text-neutral-400'
                }`}
            >
                Click to edit
            </div>
        );
    }

    return <div style={style} dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
}

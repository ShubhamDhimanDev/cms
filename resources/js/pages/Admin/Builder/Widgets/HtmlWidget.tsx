import type { Widget } from '@/types/builder';

type HtmlWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

export default function HtmlWidget({ widget }: HtmlWidgetProps) {
    const html = widget.settings.html ?? '';

    return (
        <pre className="overflow-x-auto rounded-md bg-neutral-900 p-3 text-xs text-neutral-100">
            {html.trim() || '<!-- custom html -->'}
        </pre>
    );
}

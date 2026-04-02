import { Image as ImageIcon } from 'lucide-react';
import { useMemo } from 'react';
import type { Widget } from '@/types/builder';

type ImageWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

export default function ImageWidget({ widget, isSelected }: ImageWidgetProps) {
    const style = useMemo(
        () => ({
            width: widget.settings.width ?? '100%',
            borderRadius: widget.settings.borderRadius,
            padding: widget.settings.padding,
        }),
        [widget.settings],
    );

    if (!widget.settings.src) {
        return (
            <div
                style={style}
                className={`flex min-h-28 items-center justify-center rounded-md border border-dashed ${
                    isSelected ? 'border-sky-300 bg-sky-50' : 'border-neutral-300 bg-neutral-100'
                }`}
            >
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <ImageIcon className="h-4 w-4" />
                    Image placeholder
                </div>
            </div>
        );
    }

    return <img src={widget.settings.src} alt={widget.settings.alt ?? ''} style={style} className="block max-w-full" />;
}

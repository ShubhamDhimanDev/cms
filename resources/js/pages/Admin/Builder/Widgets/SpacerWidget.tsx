import type { Widget } from '@/types/builder';

type SpacerWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

export default function SpacerWidget({ widget, isSelected }: SpacerWidgetProps) {
    const height = widget.settings.height ?? '40px';

    return (
        <div
            style={{ height }}
            className={`flex w-full items-center justify-center rounded border text-xs ${
                isSelected ? 'border-sky-300 text-sky-700' : 'border-neutral-300 text-neutral-500'
            }`}
        >
            <div className="w-full bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_10px,#e5e7eb_10px,#e5e7eb_20px)] py-2 text-center">
                Spacer ({height})
            </div>
        </div>
    );
}

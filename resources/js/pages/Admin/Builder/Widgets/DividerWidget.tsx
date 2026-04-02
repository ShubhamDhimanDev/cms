import { useMemo } from 'react';
import type { Widget } from '@/types/builder';

type DividerWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

function resolveBorderStyle(rawBorder: string | undefined): 'solid' | 'dashed' | 'dotted' {
    if (rawBorder === 'dashed' || rawBorder === 'dotted' || rawBorder === 'solid') {
        return rawBorder;
    }

    return 'solid';
}

export default function DividerWidget({ widget }: DividerWidgetProps) {
    const borderStyle = resolveBorderStyle(widget.settings.border);

    const style = useMemo(
        () => ({
            border: 'none',
            borderTopStyle: borderStyle,
            borderTopColor: widget.settings.color ?? '#d4d4d8',
            borderTopWidth: widget.settings.height ?? '1px',
            margin: widget.settings.margin ?? '16px 0',
        }),
        [widget.settings, borderStyle],
    );

    return <hr style={style} />;
}

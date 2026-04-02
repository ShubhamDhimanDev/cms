import { useMemo } from 'react';
import type { Widget } from '@/types/builder';

type ButtonWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

export default function ButtonWidget({ widget }: ButtonWidgetProps) {
    const variant = widget.settings.variant ?? 'solid';

    const variantClass =
        variant === 'outline'
            ? 'border border-current bg-transparent'
            : variant === 'ghost'
              ? 'bg-transparent'
              : 'text-white';

    const style = useMemo(
        () => ({
            color: widget.settings.color,
            backgroundColor: variant === 'solid' ? widget.settings.backgroundColor : undefined,
            borderRadius: widget.settings.borderRadius,
            padding: widget.settings.padding ?? '10px 16px',
            fontSize: widget.settings.fontSize,
            textAlign: widget.settings.textAlign,
            textDecoration: 'none',
            display: 'inline-block',
        }),
        [widget.settings, variant],
    );

    return (
        <a
            href={widget.settings.url ?? '#'}
            target={widget.settings.target ?? '_self'}
            rel={widget.settings.target === '_blank' ? 'noopener noreferrer' : undefined}
            className={`font-medium ${variantClass}`}
            style={style}
            onClick={(event) => event.preventDefault()}
        >
            {widget.settings.label ?? 'Button'}
        </a>
    );
}

import { useEffect, useMemo, useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import type { Widget } from '@/types/builder';

type HeadingWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

export default function HeadingWidget({ widget, isSelected }: HeadingWidgetProps) {
    const selection = useBuilderStore((state) => state.selection);
    const updateWidgetSettings = useBuilderStore((state) => state.updateWidgetSettings);
    const [isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(widget.settings.text ?? 'Heading');

    useEffect(() => {
        if (!isEditing) {
            setDraftText(widget.settings.text ?? 'Heading');
        }
    }, [widget.settings.text, isEditing]);

    const tag = (widget.settings.tag ?? 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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

    const commitEdit = (nextText: string) => {
        if (
            selection.type !== 'widget' ||
            selection.widgetId !== widget.id ||
            !selection.sectionId ||
            !selection.columnId
        ) {
            return;
        }

        updateWidgetSettings(selection.sectionId, selection.columnId, widget.id, {
            text: nextText.trim() || 'Heading',
        });
    };

    const sharedProps = {
        style,
        className: isSelected ? 'outline-none' : undefined,
        onDoubleClick: () => setIsEditing(true),
    };

    if (tag === 'h1') {
        return (
            <h1
                {...sharedProps}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(event) => {
                    setIsEditing(false);
                    const nextText = event.currentTarget.textContent ?? '';
                    setDraftText(nextText);
                    commitEdit(nextText);
                }}
            >
                {draftText}
            </h1>
        );
    }

    if (tag === 'h3') {
        return (
            <h3
                {...sharedProps}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(event) => {
                    setIsEditing(false);
                    const nextText = event.currentTarget.textContent ?? '';
                    setDraftText(nextText);
                    commitEdit(nextText);
                }}
            >
                {draftText}
            </h3>
        );
    }

    if (tag === 'h4') {
        return (
            <h4
                {...sharedProps}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(event) => {
                    setIsEditing(false);
                    const nextText = event.currentTarget.textContent ?? '';
                    setDraftText(nextText);
                    commitEdit(nextText);
                }}
            >
                {draftText}
            </h4>
        );
    }

    if (tag === 'h5') {
        return (
            <h5
                {...sharedProps}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(event) => {
                    setIsEditing(false);
                    const nextText = event.currentTarget.textContent ?? '';
                    setDraftText(nextText);
                    commitEdit(nextText);
                }}
            >
                {draftText}
            </h5>
        );
    }

    if (tag === 'h6') {
        return (
            <h6
                {...sharedProps}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(event) => {
                    setIsEditing(false);
                    const nextText = event.currentTarget.textContent ?? '';
                    setDraftText(nextText);
                    commitEdit(nextText);
                }}
            >
                {draftText}
            </h6>
        );
    }

    return (
        <h2
            {...sharedProps}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(event) => {
                setIsEditing(false);
                const nextText = event.currentTarget.textContent ?? '';
                setDraftText(nextText);
                commitEdit(nextText);
            }}
        >
            {draftText}
        </h2>
    );
}

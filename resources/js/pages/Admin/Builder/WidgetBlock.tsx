import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flip, offset, shift, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { Copy, GripVertical, Settings, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { WidgetRenderer } from '@/pages/Admin/Builder/Widgets';
import { useBuilderStore } from '@/stores/builderStore';
import type { Widget } from '@/types/builder';

type WidgetBlockProps = {
    sectionId: string;
    columnId: string;
    widget: Widget;
};

export default function WidgetBlock({ sectionId, columnId, widget }: WidgetBlockProps) {
    const selection = useBuilderStore((state) => state.selection);
    const select = useBuilderStore((state) => state.select);
    const duplicateWidget = useBuilderStore((state) => state.duplicateWidget);
    const deleteWidget = useBuilderStore((state) => state.deleteWidget);
    const copyStyle = useBuilderStore((state) => state.copyStyle);
    const pasteStyle = useBuilderStore((state) => state.pasteStyle);
    const navigatorHover = useBuilderStore((state) => state.navigatorHover);

    const [isContextOpen, setIsContextOpen] = useState(false);

    const floating = useFloating({
        open: isContextOpen,
        onOpenChange: setIsContextOpen,
        placement: 'bottom-start',
        middleware: [offset(8), flip(), shift()],
        strategy: 'fixed',
    });
    const dismiss = useDismiss(floating.context);
    const { getFloatingProps } = useInteractions([dismiss]);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: widget.id,
        data: {
            dragType: 'widget',
            sectionId,
            columnId,
            widgetId: widget.id,
            widgetType: widget.type,
        },
    });

    const isSelected =
        selection.type === 'widget' &&
        selection.sectionId === sectionId &&
        selection.columnId === columnId &&
        selection.widgetId === widget.id;

    const isNavigatorHovered =
        navigatorHover.type === 'widget' &&
        navigatorHover.sectionId === sectionId &&
        navigatorHover.columnId === columnId &&
        navigatorHover.widgetId === widget.id;

    const style = useMemo(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
        }),
        [transform, transition],
    );

    return (
        <article
            ref={(node) => {
                setNodeRef(node);
                floating.refs.setReference(node);
            }}
            style={style}
            className={`group relative rounded-lg border bg-white p-3 transition ${
                isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-neutral-200 hover:border-neutral-300'
            } ${isDragging ? 'opacity-70' : ''} ${isNavigatorHovered ? 'border-2 border-dashed border-yellow-400' : ''}`}
            onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsContextOpen(true);
            }}
            onClick={(event) => {
                event.stopPropagation();
                select({
                    type: 'widget',
                    sectionId,
                    columnId,
                    widgetId: widget.id,
                });
            }}
        >
            <div
                className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md border border-neutral-200 bg-white/95 p-1 opacity-0 shadow-sm transition group-hover:opacity-100"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Drag"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Duplicate"
                    onClick={() => duplicateWidget(sectionId, columnId, widget.id)}
                >
                    <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Settings"
                    onClick={() =>
                        select({
                            type: 'widget',
                            sectionId,
                            columnId,
                            widgetId: widget.id,
                        })
                    }
                >
                    <Settings className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-red-600 hover:bg-red-50"
                    title="Delete"
                    onClick={() => deleteWidget(sectionId, columnId, widget.id)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="pr-24">
                <WidgetRenderer widget={widget} isSelected={isSelected} />
            </div>

            {isContextOpen ? (
                <div
                    ref={floating.refs.setFloating}
                    style={floating.floatingStyles}
                    className="z-40 w-44 rounded-md border border-neutral-200 bg-white p-1 shadow-xl"
                    {...getFloatingProps()}
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            select({ type: 'widget', sectionId, columnId, widgetId: widget.id });
                            setIsContextOpen(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            duplicateWidget(sectionId, columnId, widget.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Duplicate
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            copyStyle(sectionId, columnId, widget.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Copy Style
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            pasteStyle(sectionId, columnId, widget.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Paste Style
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-red-600 hover:bg-red-50"
                        onClick={() => {
                            deleteWidget(sectionId, columnId, widget.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            ) : null}
        </article>
    );
}

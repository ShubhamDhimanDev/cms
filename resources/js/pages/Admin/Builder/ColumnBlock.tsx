import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import type { Column } from '@/types/builder';
import WidgetBlock from '@/pages/Admin/Builder/WidgetBlock';

type ColumnBlockProps = {
    sectionId: string;
    column: Column;
};

export default function ColumnBlock({ sectionId, column }: ColumnBlockProps) {
    const selection = useBuilderStore((state) => state.selection);
    const select = useBuilderStore((state) => state.select);
    const addColumn = useBuilderStore((state) => state.addColumn);
    const duplicateColumn = useBuilderStore((state) => state.duplicateColumn);
    const deleteColumn = useBuilderStore((state) => state.deleteColumn);
    const navigatorHover = useBuilderStore((state) => state.navigatorHover);

    const { setNodeRef, isOver } = useDroppable({
        id: `column-drop-${sectionId}-${column.id}`,
        data: {
            dropType: 'column',
            sectionId,
            columnId: column.id,
        },
    });

    const { setNodeRef: setEndDropRef, isOver: isOverEnd } = useDroppable({
        id: `column-end-${sectionId}-${column.id}`,
        data: {
            dropType: 'column-end',
            sectionId,
            columnId: column.id,
        },
    });

    const isSelected =
        selection.type === 'column' &&
        selection.sectionId === sectionId &&
        selection.columnId === column.id;

    const isNavigatorHovered =
        navigatorHover.type === 'column' &&
        navigatorHover.sectionId === sectionId &&
        navigatorHover.columnId === column.id;

    const columnStyle = useMemo(
        () => ({
            backgroundColor: column.settings?.backgroundColor,
            paddingTop: column.settings?.paddingTop,
            paddingRight: column.settings?.paddingRight,
            paddingBottom: column.settings?.paddingBottom,
            paddingLeft: column.settings?.paddingLeft,
        }),
        [
            column.settings?.backgroundColor,
            column.settings?.paddingTop,
            column.settings?.paddingRight,
            column.settings?.paddingBottom,
            column.settings?.paddingLeft,
        ],
    );

    const verticalAlignClass =
        column.settings?.verticalAlign === 'center'
            ? 'justify-center'
            : column.settings?.verticalAlign === 'bottom'
              ? 'justify-end'
              : 'justify-start';

    return (
        <div
            style={{ flex: `0 0 ${column.width}%` }}
            className="min-w-0"
            onClick={(event) => {
                event.stopPropagation();
                select({
                    type: 'column',
                    sectionId,
                    columnId: column.id,
                    widgetId: null,
                });
            }}
        >
            <div
                ref={setNodeRef}
                style={columnStyle}
                className={`group relative min-h-[140px] rounded-lg border bg-white p-3 transition ${
                    isSelected
                        ? 'border-sky-500 ring-2 ring-sky-200'
                        : isOver
                          ? 'border-sky-400 bg-sky-50'
                          : 'border-neutral-200'
                } ${isNavigatorHovered ? 'border-2 border-dashed border-yellow-400' : ''}`}
            >
                <div
                    className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md border border-neutral-200 bg-white/95 p-1 opacity-0 shadow-sm transition group-hover:opacity-100"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                        title="Add column"
                        onClick={() => addColumn(sectionId)}
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                        title="Duplicate column"
                        onClick={() => duplicateColumn(sectionId, column.id)}
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        className="rounded p-1 text-red-600 hover:bg-red-50"
                        title="Delete column"
                        onClick={() => deleteColumn(sectionId, column.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>

                <SortableContext
                    items={column.widgets.map((widget) => widget.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={`flex min-h-[80px] flex-col space-y-3 pt-8 ${verticalAlignClass}`}>
                        {column.widgets.map((widget) => (
                            <WidgetBlock key={widget.id} sectionId={sectionId} columnId={column.id} widget={widget} />
                        ))}
                    </div>
                </SortableContext>

                {isOver || isOverEnd ? <div className="pointer-events-none mt-2 h-0.5 w-full rounded bg-sky-500" /> : null}

                <div
                    ref={setEndDropRef}
                    className={`mt-3 rounded-md border border-dashed px-3 py-3 text-center text-sm transition ${
                        isOverEnd
                            ? 'border-sky-400 bg-sky-50 text-sky-700'
                            : 'border-neutral-300 bg-neutral-50 text-neutral-500'
                    }`}
                >
                    + Widget
                </div>
            </div>
        </div>
    );
}

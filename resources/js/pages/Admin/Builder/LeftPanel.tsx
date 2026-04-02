import { useDndMonitor, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    AlignLeft,
    Code,
    Clock3,
    Heading,
    Image as ImageIcon,
    ListTree,
    LayoutGrid,
    Minus,
    MousePointer2,
    Plus,
    RectangleHorizontal,
    Space,
    Video,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/stores/builderStore';
import type { BuilderSelection, WidgetType } from '@/types/builder';

type WidgetItem = {
    type: WidgetType;
    label: string;
    category: 'BASIC' | 'MEDIA' | 'ADVANCED';
    Icon: React.ComponentType<{ className?: string }>;
};

const WIDGET_ITEMS: WidgetItem[] = [
    { type: 'heading', label: 'Heading', category: 'BASIC', Icon: Heading },
    { type: 'text', label: 'Text / Paragraph', category: 'BASIC', Icon: AlignLeft },
    { type: 'image', label: 'Image', category: 'BASIC', Icon: ImageIcon },
    { type: 'button', label: 'Button', category: 'BASIC', Icon: RectangleHorizontal },
    { type: 'divider', label: 'Divider', category: 'BASIC', Icon: Minus },
    { type: 'spacer', label: 'Spacer', category: 'BASIC', Icon: Space },
    { type: 'video', label: 'Video', category: 'MEDIA', Icon: Video },
    { type: 'html', label: 'HTML (raw embed)', category: 'ADVANCED', Icon: Code },
];

const CATEGORY_ORDER: Array<WidgetItem['category']> = ['BASIC', 'MEDIA', 'ADVANCED'];

type LeftTab = 'widgets' | 'navigator' | 'history';

type WidgetCardProps = {
    item: WidgetItem;
    isDragging: boolean;
};

function WidgetCard({ item, isDragging }: WidgetCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `new::${item.type}`,
        data: {
            source: 'widget-library',
            widgetType: item.type,
            label: item.label,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button
            ref={setNodeRef}
            type="button"
            style={style}
            className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                isDragging
                    ? 'border-sky-400 bg-sky-500/20 text-sky-100 opacity-75'
                    : 'border-neutral-700 bg-[#26263a] text-neutral-200 hover:border-neutral-500 hover:bg-[#2d2d43]'
            }`}
            {...listeners}
            {...attributes}
        >
            <span className="flex items-center gap-2 text-sm font-medium">
                <item.Icon className="h-4 w-4" />
                {item.label}
            </span>
        </button>
    );
}

export default function LeftPanel() {
    const addSection = useBuilderStore((state) => state.addSection);
    const layout = useBuilderStore((state) => state.layout);
    const selection = useBuilderStore((state) => state.selection);
    const history = useBuilderStore((state) => state.history);
    const historyIndex = useBuilderStore((state) => state.historyIndex);
    const select = useBuilderStore((state) => state.select);
    const setNavigatorHover = useBuilderStore((state) => state.setNavigatorHover);

    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState<LeftTab>('widgets');
    const [draggingWidgetType, setDraggingWidgetType] = useState<WidgetType | null>(null);
    const navigatorRef = useRef<HTMLDivElement | null>(null);

    useDndMonitor({
        onDragStart(event) {
            const widgetType = event.active.data.current?.widgetType;
            const source = event.active.data.current?.source;

            if (source === 'widget-library' && typeof widgetType === 'string') {
                setDraggingWidgetType(widgetType as WidgetType);
            }
        },
        onDragEnd() {
            setDraggingWidgetType(null);
        },
        onDragCancel() {
            setDraggingWidgetType(null);
        },
    });

    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return WIDGET_ITEMS;
        }

        return WIDGET_ITEMS.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
    }, [query]);

    const selectionKey = useMemo(() => {
        if (!selection.type) {
            return '';
        }

        if (selection.type === 'section') {
            return `section:${selection.sectionId}`;
        }

        if (selection.type === 'column') {
            return `column:${selection.sectionId}:${selection.columnId}`;
        }

        return `widget:${selection.sectionId}:${selection.columnId}:${selection.widgetId}`;
    }, [selection]);

    useEffect(() => {
        if (activeTab !== 'navigator' || !selectionKey || !navigatorRef.current) {
            return;
        }

        const node = navigatorRef.current.querySelector<HTMLElement>(`[data-nav-key="${selectionKey}"]`);

        if (node) {
            node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [activeTab, selectionKey]);

    const applyHover = (target: BuilderSelection) => {
        setNavigatorHover(target);
    };

    const clearHover = () => {
        setNavigatorHover({
            type: null,
            sectionId: null,
            columnId: null,
            widgetId: null,
        });
    };

    return (
        <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-700 bg-[#1e1e2e] text-neutral-100">
            <div className="border-b border-neutral-700 p-3">
                <div className="flex items-center rounded-md border border-neutral-700 bg-[#26263a] p-1">
                    {[
                        { key: 'widgets' as const, icon: LayoutGrid, label: 'Widgets' },
                        { key: 'navigator' as const, icon: ListTree, label: 'Navigator' },
                        { key: 'history' as const, icon: Clock3, label: 'History' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            title={tab.label}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex h-8 flex-1 items-center justify-center rounded text-xs transition ${
                                activeTab === tab.key
                                    ? 'bg-sky-600 text-white'
                                    : 'text-neutral-300 hover:bg-neutral-700/60 hover:text-white'
                            }`}
                        >
                            <tab.icon className="h-4 w-4" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'widgets' ? (
                    <>
                        <h2 className="text-xs font-semibold tracking-[0.18em] text-neutral-300 uppercase">Widget Library</h2>
                        <div className="mt-3">
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search widgets..."
                                className="w-full rounded-md border border-neutral-700 bg-[#26263a] px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            {CATEGORY_ORDER.map((category) => {
                                const categoryItems = filtered.filter((item) => item.category === category);

                                if (categoryItems.length === 0) {
                                    return null;
                                }

                                return (
                                    <section key={category} className="mb-5">
                                        <h3 className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">{category}</h3>
                                        <div className="mt-2 space-y-2">
                                            {categoryItems.map((item) => (
                                                <WidgetCard
                                                    key={item.type}
                                                    item={item}
                                                    isDragging={draggingWidgetType === item.type}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}

                            {filtered.length === 0 ? (
                                <p className="mt-2 text-sm text-neutral-400">No widgets match your search.</p>
                            ) : null}
                        </div>
                    </>
                ) : null}

                {activeTab === 'navigator' ? (
                    <div ref={navigatorRef} className="space-y-2" onMouseLeave={clearHover}>
                        <h2 className="text-xs font-semibold tracking-[0.18em] text-neutral-300 uppercase">Navigator</h2>

                        {layout.sections.length === 0 ? (
                            <p className="text-sm text-neutral-400">No sections yet.</p>
                        ) : null}

                        {layout.sections.map((section, sectionIndex) => (
                            <div key={section.id} className="space-y-1 rounded-md border border-neutral-700 bg-[#26263a] p-2">
                                <button
                                    type="button"
                                    data-nav-key={`section:${section.id}`}
                                    onMouseEnter={() =>
                                        applyHover({ type: 'section', sectionId: section.id, columnId: null, widgetId: null })
                                    }
                                    onMouseLeave={clearHover}
                                    onClick={() => select({ type: 'section', sectionId: section.id, columnId: null, widgetId: null })}
                                    className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs transition ${
                                        selection.type === 'section' && selection.sectionId === section.id
                                            ? 'bg-sky-600/30 text-sky-200'
                                            : 'text-neutral-200 hover:bg-neutral-700/80'
                                    }`}
                                >
                                    <span className="font-semibold">S{sectionIndex + 1}</span>
                                    <span>Section</span>
                                </button>

                                {section.columns.map((column, columnIndex) => (
                                    <div key={column.id} className="space-y-1 pl-3">
                                        <button
                                            type="button"
                                            data-nav-key={`column:${section.id}:${column.id}`}
                                            onMouseEnter={() =>
                                                applyHover({
                                                    type: 'column',
                                                    sectionId: section.id,
                                                    columnId: column.id,
                                                    widgetId: null,
                                                })
                                            }
                                            onMouseLeave={clearHover}
                                            onClick={() =>
                                                select({
                                                    type: 'column',
                                                    sectionId: section.id,
                                                    columnId: column.id,
                                                    widgetId: null,
                                                })
                                            }
                                            className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs transition ${
                                                selection.type === 'column' &&
                                                selection.sectionId === section.id &&
                                                selection.columnId === column.id
                                                    ? 'bg-sky-600/30 text-sky-200'
                                                    : 'text-neutral-300 hover:bg-neutral-700/80'
                                            }`}
                                        >
                                            <span className="font-medium">C{columnIndex + 1}</span>
                                            <span>Column</span>
                                        </button>

                                        {column.widgets.map((widget, widgetIndex) => (
                                            <button
                                                key={widget.id}
                                                type="button"
                                                data-nav-key={`widget:${section.id}:${column.id}:${widget.id}`}
                                                onMouseEnter={() =>
                                                    applyHover({
                                                        type: 'widget',
                                                        sectionId: section.id,
                                                        columnId: column.id,
                                                        widgetId: widget.id,
                                                    })
                                                }
                                                onMouseLeave={clearHover}
                                                onClick={() =>
                                                    select({
                                                        type: 'widget',
                                                        sectionId: section.id,
                                                        columnId: column.id,
                                                        widgetId: widget.id,
                                                    })
                                                }
                                                className={`ml-3 flex w-[calc(100%-0.75rem)] items-center gap-2 rounded px-2 py-1 text-left text-xs transition ${
                                                    selection.type === 'widget' &&
                                                    selection.sectionId === section.id &&
                                                    selection.columnId === column.id &&
                                                    selection.widgetId === widget.id
                                                        ? 'bg-sky-600/30 text-sky-200'
                                                        : 'text-neutral-400 hover:bg-neutral-700/80'
                                                }`}
                                            >
                                                <span className="font-medium">W{widgetIndex + 1}</span>
                                                <span className="truncate capitalize">{widget.type}</span>
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : null}

                {activeTab === 'history' ? (
                    <div className="space-y-2">
                        <h2 className="text-xs font-semibold tracking-[0.18em] text-neutral-300 uppercase">History</h2>
                        <div className="space-y-1">
                            {history.map((_, index) => (
                                <div
                                    key={`history-${index}`}
                                    className={`rounded px-2 py-1 text-xs ${
                                        index === historyIndex
                                            ? 'bg-sky-600/30 text-sky-200'
                                            : 'bg-[#26263a] text-neutral-400'
                                    }`}
                                >
                                    Snapshot {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="border-t border-neutral-700 p-4">
                <Button
                    type="button"
                    onClick={() => addSection()}
                    className="w-full bg-sky-600 text-white hover:bg-sky-500"
                >
                    <Plus className="h-4 w-4" />
                    Add Section
                </Button>

                {draggingWidgetType ? (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs text-sky-300">
                        <MousePointer2 className="h-3.5 w-3.5" />
                        Dragging: {WIDGET_ITEMS.find((item) => item.type === draggingWidgetType)?.label}
                    </p>
                ) : null}
            </div>
        </aside>
    );
}

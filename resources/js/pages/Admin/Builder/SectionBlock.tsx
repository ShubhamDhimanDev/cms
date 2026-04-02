import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flip, offset, shift, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { Copy, GripVertical, MoveDown, MoveUp, Settings, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import type { ColumnPreset, Section } from '@/types/builder';
import ColumnBlock from '@/pages/Admin/Builder/ColumnBlock';

type SectionBlockProps = {
    section: Section;
    index: number;
    total: number;
};

function resolveBackgroundImage(backgroundImage?: string): string | undefined {
    if (!backgroundImage) {
        return undefined;
    }

    if (backgroundImage.includes('url(') || backgroundImage.includes('gradient(')) {
        return backgroundImage;
    }

    return `url(${backgroundImage})`;
}

export default function SectionBlock({ section, index, total }: SectionBlockProps) {
    const selection = useBuilderStore((state) => state.selection);
    const select = useBuilderStore((state) => state.select);
    const duplicateSection = useBuilderStore((state) => state.duplicateSection);
    const deleteSection = useBuilderStore((state) => state.deleteSection);
    const moveSectionUp = useBuilderStore((state) => state.moveSectionUp);
    const moveSectionDown = useBuilderStore((state) => state.moveSectionDown);
    const addSection = useBuilderStore((state) => state.addSection);
    const setSectionColumnPreset = useBuilderStore((state) => state.setSectionColumnPreset);
    const navigatorHover = useBuilderStore((state) => state.navigatorHover);

    const [isContextOpen, setIsContextOpen] = useState(false);
    const [isPresetOpen, setIsPresetOpen] = useState(false);

    const contextFloating = useFloating({
        open: isContextOpen,
        onOpenChange: setIsContextOpen,
        placement: 'bottom-start',
        middleware: [offset(8), flip(), shift()],
        strategy: 'fixed',
    });

    const contextDismiss = useDismiss(contextFloating.context);
    const { getFloatingProps } = useInteractions([contextDismiss]);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: section.id,
        data: {
            dragType: 'section',
            sectionId: section.id,
        },
    });

    const isSelected = selection.type === 'section' && selection.sectionId === section.id;
    const isNavigatorHovered = navigatorHover.type === 'section' && navigatorHover.sectionId === section.id;

    const columnPresets: Array<{ preset: ColumnPreset; label: string }> = [
        { preset: '100', label: '100' },
        { preset: '50-50', label: '50 | 50' },
        { preset: '33-33-33', label: '33 | 33 | 33' },
        { preset: '25-75', label: '25 | 75' },
        { preset: '75-25', label: '75 | 25' },
        { preset: '25-50-25', label: '25 | 50 | 25' },
        { preset: '25-25-25-25', label: '25 | 25 | 25 | 25' },
    ];

    const style = useMemo(
        () => ({
            background: section.settings.background,
            backgroundImage: resolveBackgroundImage(section.settings.backgroundImage),
            backgroundSize: section.settings.backgroundSize,
            paddingTop: section.settings.paddingTop,
            paddingBottom: section.settings.paddingBottom,
            paddingLeft: section.settings.paddingLeft,
            paddingRight: section.settings.paddingRight,
            marginTop: section.settings.marginTop,
            marginBottom: section.settings.marginBottom,
        }),
        [section.settings],
    );

    const contentStyle = useMemo(
        () => ({
            maxWidth: section.settings.maxWidth,
            width: section.settings.fullWidth ? '100%' : undefined,
        }),
        [section.settings.fullWidth, section.settings.maxWidth],
    );

    const sortableStyle = useMemo(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
        }),
        [transform, transition],
    );

    return (
        <section
            ref={(node) => {
                setNodeRef(node);
                contextFloating.refs.setReference(node);
            }}
            style={{ ...style, ...sortableStyle }}
            className={`group relative rounded-xl border bg-white p-4 transition ${
                isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-neutral-200'
            } ${isDragging ? 'opacity-75' : ''} ${isNavigatorHovered ? 'border-2 border-dashed border-yellow-400' : ''}`}
            onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsContextOpen(true);
            }}
            onClick={() =>
                select({
                    type: 'section',
                    sectionId: section.id,
                    columnId: null,
                    widgetId: null,
                })
            }
        >
            <div
                className="absolute top-2 right-2 z-20 flex items-center gap-1 rounded-md border border-neutral-200 bg-white/95 p-1 opacity-0 shadow-sm transition group-hover:opacity-100"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="cursor-grab rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:cursor-grabbing"
                    title="Drag section"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-40"
                    title="Move up"
                    disabled={index === 0}
                    onClick={() => moveSectionUp(section.id)}
                >
                    <MoveUp className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-40"
                    title="Move down"
                    disabled={index === total - 1}
                    onClick={() => moveSectionDown(section.id)}
                >
                    <MoveDown className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Duplicate"
                    onClick={() => duplicateSection(section.id)}
                >
                    <Copy className="h-3.5 w-3.5" />
                </button>

                <div className="relative">
                    <button
                        type="button"
                        className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                        title="Column preset"
                        onClick={() => setIsPresetOpen((value) => !value)}
                    >
                        Preset
                    </button>

                    {isPresetOpen ? (
                        <div className="absolute top-full right-0 z-20 mt-1 w-44 rounded-md border border-neutral-200 bg-white p-1 shadow-lg">
                            {columnPresets.map((item) => (
                                <button
                                    key={item.preset}
                                    type="button"
                                    className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                                    onClick={() => {
                                        setSectionColumnPreset(section.id, item.preset);
                                        setIsPresetOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
                <button
                    type="button"
                    className="rounded p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Settings"
                    onClick={() =>
                        select({
                            type: 'section',
                            sectionId: section.id,
                            columnId: null,
                            widgetId: null,
                        })
                    }
                >
                    <Settings className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    className="rounded p-1 text-red-600 hover:bg-red-50"
                    title="Delete"
                    onClick={() => deleteSection(section.id)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>

            <div style={contentStyle} className="mx-auto">
                <div
                    className="flex items-start"
                    style={{
                        gap: section.settings.columnGap ?? '12px',
                    }}
                >
                    {section.columns.map((column) => (
                        <ColumnBlock key={column.id} sectionId={section.id} column={column} />
                    ))}
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 transition group-hover:opacity-100">
                <button
                    type="button"
                    className="pointer-events-auto rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm hover:bg-sky-100"
                    onClick={(event) => {
                        event.stopPropagation();
                        addSection(section.id);
                    }}
                >
                    + Add Section
                </button>
            </div>

            {isContextOpen ? (
                <div
                    ref={contextFloating.refs.setFloating}
                    style={contextFloating.floatingStyles}
                    className="z-40 w-44 rounded-md border border-neutral-200 bg-white p-1 shadow-xl"
                    {...getFloatingProps()}
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            select({ type: 'section', sectionId: section.id, columnId: null, widgetId: null });
                            setIsContextOpen(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            duplicateSection(section.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Duplicate
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            moveSectionUp(section.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Move Up
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                        onClick={() => {
                            moveSectionDown(section.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Move Down
                    </button>
                    <button
                        type="button"
                        className="block w-full rounded px-2 py-1 text-left text-xs text-red-600 hover:bg-red-50"
                        onClick={() => {
                            deleteSection(section.id);
                            setIsContextOpen(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            ) : null}
        </section>
    );
}

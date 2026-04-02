import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Monitor, Smartphone, Tablet, Loader2, Undo2, Redo2, Eye, Save, ArrowLeft, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Canvas from '@/pages/Admin/Builder/Canvas';
import LeftPanel from '@/pages/Admin/Builder/LeftPanel';
import RightPanel from '@/pages/Admin/Builder/RightPanel';
import * as pageRoutes from '@/routes/admin/pages';
import { useBuilderStore } from '@/stores/builderStore';
import type { BuilderLayout, WidgetType } from '@/types/builder';

type Props = {
    page: {
        id: number;
        title: string;
        layout: BuilderLayout | null;
    };
};

type ToastState = {
    message: string;
    kind: 'success' | 'error';
} | null;

type DragData = {
    source?: 'widget-library';
    dragType?: 'widget' | 'section';
    dropType?: 'column' | 'column-end';
    widgetType?: WidgetType;
    label?: string;
    sectionId?: string;
    columnId?: string;
    widgetId?: string;
};

type ActiveDragState =
    | {
          kind: 'new-widget';
          widgetType: WidgetType;
          label: string;
      }
    | {
          kind: 'existing-widget';
          widgetType: WidgetType;
      }
    | {
          kind: 'section';
      }
    | null;

const WIDGET_TYPE_LABELS: Record<WidgetType, string> = {
    heading: 'Heading',
    text: 'Text / Paragraph',
    image: 'Image',
    button: 'Button',
    divider: 'Divider',
    spacer: 'Spacer',
    video: 'Video',
    html: 'HTML',
};

function normalizeLayout(value: unknown): BuilderLayout {
    if (typeof value !== 'object' || value === null || !('sections' in value)) {
        return { sections: [] };
    }

    const maybeLayout = value as {
        sections?: unknown;
        globalStyles?: BuilderLayout['globalStyles'];
        pageSettings?: BuilderLayout['pageSettings'];
    };

    if (!Array.isArray(maybeLayout.sections)) {
        return { sections: [] };
    }

    return {
        sections: maybeLayout.sections as BuilderLayout['sections'],
        globalStyles: maybeLayout.globalStyles,
        pageSettings: maybeLayout.pageSettings,
    };
}

export default function BuilderIndex({ page }: Props) {
    const layout = useBuilderStore((state) => state.layout);
    const device = useBuilderStore((state) => state.device);
    const isDirty = useBuilderStore((state) => state.isDirty);
    const historyIndex = useBuilderStore((state) => state.historyIndex);
    const historyLength = useBuilderStore((state) => state.history.length);
    const selection = useBuilderStore((state) => state.selection);

    const setLayout = useBuilderStore((state) => state.setLayout);
    const undo = useBuilderStore((state) => state.undo);
    const redo = useBuilderStore((state) => state.redo);
    const clearSelection = useBuilderStore((state) => state.clearSelection);
    const setDevice = useBuilderStore((state) => state.setDevice);
    const duplicateSection = useBuilderStore((state) => state.duplicateSection);
    const duplicateColumn = useBuilderStore((state) => state.duplicateColumn);
    const duplicateWidget = useBuilderStore((state) => state.duplicateWidget);
    const deleteSection = useBuilderStore((state) => state.deleteSection);
    const deleteColumn = useBuilderStore((state) => state.deleteColumn);
    const deleteWidget = useBuilderStore((state) => state.deleteWidget);
    const copyWidget = useBuilderStore((state) => state.copyWidget);
    const pasteWidget = useBuilderStore((state) => state.pasteWidget);
    const addWidget = useBuilderStore((state) => state.addWidget);
    const reorderWidgets = useBuilderStore((state) => state.reorderWidgets);
    const moveWidget = useBuilderStore((state) => state.moveWidget);
    const reorderSections = useBuilderStore((state) => state.reorderSections);
    const updateGlobalStyles = useBuilderStore((state) => state.updateGlobalStyles);
    const updatePageSettings = useBuilderStore((state) => state.updatePageSettings);

    const [isLoadingLayout, setIsLoadingLayout] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);
    const [activeDrag, setActiveDrag] = useState<ActiveDragState>(null);
    const [isSiteSettingsOpen, setIsSiteSettingsOpen] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    useEffect(() => {
        const initialLayout = page.layout ?? { sections: [] };
        setLayout(initialLayout);

        let isCancelled = false;

        const loadFreshLayout = async () => {
            setIsLoadingLayout(true);

            try {
                const response = await fetch(pageRoutes.builderLoad.url({ page: page.id }), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                });

                if (!response.ok) {
                    return;
                }

                const data = (await response.json()) as { layout?: unknown };

                if (!isCancelled) {
                    setLayout(normalizeLayout(data.layout));
                }
            } finally {
                if (!isCancelled) {
                    setIsLoadingLayout(false);
                }
            }
        };

        void loadFreshLayout();

        return () => {
            isCancelled = true;
        };
    }, [page.id, page.layout, setLayout]);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setToast(null);
        }, 2200);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [toast]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!isDirty) {
                return;
            }

            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < historyLength - 1;
    const globalStyles = layout.globalStyles ?? {};
    const pageSettings = layout.pageSettings ?? {};

    const colorItems: Array<{ key: keyof NonNullable<BuilderLayout['globalStyles']>; label: string }> = [
        { key: 'primaryColor', label: 'Primary' },
        { key: 'secondaryColor', label: 'Secondary' },
        { key: 'accentColor', label: 'Accent' },
        { key: 'textColor', label: 'Text' },
    ];

    const findColumn = (sectionId: string, columnId: string) => {
        const section = layout.sections.find((entry) => entry.id === sectionId);

        if (!section) {
            return null;
        }

        return section.columns.find((entry) => entry.id === columnId) ?? null;
    };

    const findWidgetLocation = (widgetId: string) => {
        for (const section of layout.sections) {
            for (const column of section.columns) {
                const index = column.widgets.findIndex((widget) => widget.id === widgetId);

                if (index !== -1) {
                    return {
                        sectionId: section.id,
                        columnId: column.id,
                        index,
                        widgetType: column.widgets[index].type,
                    };
                }
            }
        }

        return null;
    };

    const findSectionIndex = (sectionId: string) => layout.sections.findIndex((section) => section.id === sectionId);

    const handleDragStart = (event: { active: { id: string | number; data: { current?: unknown } } }) => {
        const activeId = String(event.active.id);
        const activeData = (event.active.data.current ?? {}) as DragData;

        if (activeId.startsWith('new::')) {
            const widgetType = activeId.replace('new::', '') as WidgetType;

            setActiveDrag({
                kind: 'new-widget',
                widgetType,
                label: activeData.label ?? WIDGET_TYPE_LABELS[widgetType] ?? 'Widget',
            });
            return;
        }

        if (activeData.dragType === 'widget' && activeData.widgetType) {
            setActiveDrag({
                kind: 'existing-widget',
                widgetType: activeData.widgetType,
            });
            return;
        }

        if (activeData.dragType === 'section') {
            setActiveDrag({ kind: 'section' });
            return;
        }

        setActiveDrag(null);
    };

    const handleDragCancel = () => {
        setActiveDrag(null);
    };

    const handleDragEnd = (event: {
        active: { id: string | number; data: { current?: unknown } };
        over: { id: string | number; data: { current?: unknown } } | null;
    }) => {
        const activeId = String(event.active.id);
        const activeData = (event.active.data.current ?? {}) as DragData;
        const overData = (event.over?.data.current ?? {}) as DragData;

        setActiveDrag(null);

        if (!event.over) {
            return;
        }

        if (activeData.dragType === 'section' && activeData.sectionId && overData.dragType === 'section' && overData.sectionId) {
            const fromIndex = findSectionIndex(activeData.sectionId);
            const toIndex = findSectionIndex(overData.sectionId);

            if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
                reorderSections(fromIndex, toIndex);
            }

            return;
        }

        if (activeId.startsWith('new::')) {
            const widgetType = activeId.replace('new::', '') as WidgetType;

            if (overData.dragType === 'widget' && overData.sectionId && overData.columnId && overData.widgetId) {
                addWidget(overData.sectionId, overData.columnId, widgetType, overData.widgetId);
                return;
            }

            if ((overData.dropType === 'column' || overData.dropType === 'column-end') && overData.sectionId && overData.columnId) {
                addWidget(overData.sectionId, overData.columnId, widgetType);
            }

            return;
        }

        if (
            activeData.dragType !== 'widget' ||
            !activeData.sectionId ||
            !activeData.columnId ||
            !activeData.widgetId
        ) {
            return;
        }

        const source = findWidgetLocation(activeData.widgetId);

        if (!source) {
            return;
        }

        const fromSectionId = source.sectionId;
        const fromColumnId = source.columnId;
        const fromIndex = source.index;

        if (overData.dragType === 'widget' && overData.sectionId && overData.columnId && overData.widgetId) {
            const target = findWidgetLocation(overData.widgetId);

            if (!target) {
                return;
            }

            if (fromSectionId === target.sectionId && fromColumnId === target.columnId) {
                let toIndex = target.index;

                if (fromIndex < toIndex) {
                    toIndex -= 1;
                }

                if (toIndex !== fromIndex) {
                    reorderWidgets(fromSectionId, fromColumnId, fromIndex, toIndex);
                }

                return;
            }

            moveWidget(fromSectionId, fromColumnId, fromIndex, target.sectionId, target.columnId, target.index);
            return;
        }

        if ((overData.dropType === 'column' || overData.dropType === 'column-end') && overData.sectionId && overData.columnId) {
            const targetColumn = findColumn(overData.sectionId, overData.columnId);

            if (!targetColumn) {
                return;
            }

            let toIndex = targetColumn.widgets.length;

            if (fromSectionId === overData.sectionId && fromColumnId === overData.columnId) {
                if (fromIndex < toIndex) {
                    toIndex -= 1;
                }

                if (toIndex !== fromIndex) {
                    reorderWidgets(fromSectionId, fromColumnId, fromIndex, toIndex);
                }

                return;
            }

            moveWidget(fromSectionId, fromColumnId, fromIndex, overData.sectionId, overData.columnId, toIndex);
        }
    };

    const saveLayout = useCallback(async () => {
        setIsSaving(true);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const response = await fetch(pageRoutes.builderSave.url({ page: page.id }), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
                },
                credentials: 'same-origin',
                body: JSON.stringify({ layout }),
            });

            if (!response.ok) {
                throw new Error('Failed to save layout.');
            }

            useBuilderStore.setState({ isDirty: false });
            setToast({ message: 'Layout saved.', kind: 'success' });
        } catch {
            setToast({ message: 'Unable to save layout. Try again.', kind: 'error' });
        } finally {
            setIsSaving(false);
        }
    }, [layout, page.id]);

    useEffect(() => {
        const isEditableTarget = (target: EventTarget | null): boolean => {
            const element = target as HTMLElement | null;

            if (!element) {
                return false;
            }

            if (element.isContentEditable) {
                return true;
            }

            const tagName = element.tagName.toLowerCase();
            return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
        };

        const duplicateSelected = () => {
            if (selection.type === 'section' && selection.sectionId) {
                duplicateSection(selection.sectionId);
                return;
            }

            if (selection.type === 'column' && selection.sectionId && selection.columnId) {
                duplicateColumn(selection.sectionId, selection.columnId);
                return;
            }

            if (selection.type === 'widget' && selection.sectionId && selection.columnId && selection.widgetId) {
                duplicateWidget(selection.sectionId, selection.columnId, selection.widgetId);
            }
        };

        const deleteSelected = () => {
            if (selection.type === 'section' && selection.sectionId) {
                deleteSection(selection.sectionId);
                clearSelection();
                return;
            }

            if (selection.type === 'column' && selection.sectionId && selection.columnId) {
                deleteColumn(selection.sectionId, selection.columnId);
                clearSelection();
                return;
            }

            if (selection.type === 'widget' && selection.sectionId && selection.columnId && selection.widgetId) {
                deleteWidget(selection.sectionId, selection.columnId, selection.widgetId);
                clearSelection();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const isMod = event.ctrlKey || event.metaKey;
            const key = event.key.toLowerCase();

            if (isMod && key === 'z' && event.shiftKey) {
                event.preventDefault();
                redo();
                return;
            }

            if (isMod && key === 'z') {
                event.preventDefault();
                undo();
                return;
            }

            if (isMod && key === 's') {
                event.preventDefault();
                if (!isSaving) {
                    void saveLayout();
                }
                return;
            }

            if (event.key === 'Escape') {
                clearSelection();
                return;
            }

            if (isMod && key === 'd') {
                event.preventDefault();
                duplicateSelected();
                return;
            }

            if (isMod && key === 'c') {
                if (selection.type === 'widget' && selection.sectionId && selection.columnId && selection.widgetId) {
                    event.preventDefault();
                    copyWidget(selection.sectionId, selection.columnId, selection.widgetId);
                }
                return;
            }

            if (isMod && key === 'v') {
                if (selection.type === 'widget' && selection.sectionId && selection.columnId && selection.widgetId) {
                    event.preventDefault();
                    pasteWidget(selection.sectionId, selection.columnId, selection.widgetId);
                }
                return;
            }

            if ((event.key === 'Delete' || event.key === 'Backspace') && !isEditableTarget(event.target)) {
                event.preventDefault();
                deleteSelected();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        clearSelection,
        copyWidget,
        deleteColumn,
        deleteSection,
        deleteWidget,
        duplicateColumn,
        duplicateSection,
        duplicateWidget,
        isSaving,
        pasteWidget,
        redo,
        saveLayout,
        selection,
        undo,
    ]);

    return (
        <>
            <Head title={`Builder - ${page.title}`} />

            <div className="min-h-screen bg-neutral-100 text-neutral-900">
                <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsSiteSettingsOpen(true)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                            title="Site Settings"
                            aria-label="Open site settings"
                        >
                            <Menu className="h-4 w-4" />
                        </button>

                        <Link
                            href={pageRoutes.index.url()}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>

                        <p className="truncate text-sm font-semibold">{page.title}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-1 rounded-md border border-neutral-200 p-1 sm:flex">
                            <button
                                type="button"
                                onClick={() => setDevice('desktop')}
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                    device === 'desktop' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    <Monitor className="h-3.5 w-3.5" />
                                    Desktop
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setDevice('tablet')}
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                    device === 'tablet' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    <Tablet className="h-3.5 w-3.5" />
                                    Tablet
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setDevice('mobile')}
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                    device === 'mobile' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    <Smartphone className="h-3.5 w-3.5" />
                                    Mobile
                                </span>
                            </button>
                        </div>

                        <Button type="button" variant="outline" size="sm" onClick={undo} disabled={!canUndo}>
                            <Undo2 className="h-4 w-4" />
                            Undo
                        </Button>

                        <Button type="button" variant="outline" size="sm" onClick={redo} disabled={!canRedo}>
                            <Redo2 className="h-4 w-4" />
                            Redo
                        </Button>

                        <Button type="button" variant="outline" size="sm" disabled>
                            <Eye className="h-4 w-4" />
                            Preview
                        </Button>

                        <Button type="button" size="sm" onClick={saveLayout} disabled={isSaving}>
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                </header>

                <div className="h-screen overflow-x-auto pt-14">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragCancel={handleDragCancel}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="flex h-full min-w-[1100px]">
                            <LeftPanel />

                            <Canvas />

                            <div className="relative">
                                <RightPanel />

                                {isLoadingLayout ? (
                                    <p className="pointer-events-none absolute top-4 right-4 inline-flex items-center gap-2 rounded-md bg-neutral-900/80 px-2 py-1 text-xs text-neutral-200">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Syncing latest layout...
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <DragOverlay>
                            {activeDrag ? (
                                activeDrag.kind === 'new-widget' ? (
                                    <div className="rounded-lg border border-neutral-700 bg-[#26263a]/80 px-3 py-2 text-sm font-medium text-neutral-100 shadow-xl">
                                        {activeDrag.label}
                                    </div>
                                ) : activeDrag.kind === 'existing-widget' ? (
                                    <div className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 shadow-lg">
                                        {WIDGET_TYPE_LABELS[activeDrag.widgetType]}
                                    </div>
                                ) : (
                                    <div className="rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800 shadow-lg">
                                        Section
                                    </div>
                                )
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>

                {toast ? (
                    <div className="pointer-events-none fixed right-4 bottom-4 z-50">
                        <div
                            className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg ${
                                toast.kind === 'success' ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                        >
                            {toast.message}
                        </div>
                    </div>
                ) : null}

                {isSiteSettingsOpen ? (
                    <>
                        <button
                            type="button"
                            className="fixed inset-0 z-40 bg-black/30"
                            onClick={() => setIsSiteSettingsOpen(false)}
                            aria-label="Close site settings"
                        />

                        <aside className="fixed top-0 right-0 z-50 h-screen w-full max-w-md overflow-y-auto border-l border-neutral-200 bg-white shadow-2xl">
                            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
                                <p className="text-sm font-semibold text-neutral-900">Site Settings</p>
                                <button
                                    type="button"
                                    onClick={() => setIsSiteSettingsOpen(false)}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-6 p-4">
                                <section className="space-y-3">
                                    <h3 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">Global Colors</h3>
                                    <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                        {colorItems.map((item) => (
                                            <label key={item.key} className="flex items-center justify-between gap-3 text-sm text-neutral-700">
                                                <span>{item.label}</span>
                                                <input
                                                    type="color"
                                                    value={globalStyles[item.key] ?? '#000000'}
                                                    onChange={(event) =>
                                                        updateGlobalStyles({
                                                            [item.key]: event.target.value,
                                                        })
                                                    }
                                                    className="h-9 w-14 cursor-pointer rounded border border-neutral-300 bg-white p-1"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-3">
                                    <h3 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">Global Typography</h3>
                                    <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                        <label className="block space-y-1">
                                            <span className="text-sm text-neutral-700">Body Font</span>
                                            <input
                                                type="text"
                                                value={globalStyles.bodyFont ?? ''}
                                                onChange={(event) =>
                                                    updateGlobalStyles({
                                                        bodyFont: event.target.value,
                                                    })
                                                }
                                                placeholder="Inter, sans-serif"
                                                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                            />
                                        </label>

                                        <label className="block space-y-1">
                                            <span className="text-sm text-neutral-700">Heading Font</span>
                                            <input
                                                type="text"
                                                value={globalStyles.headingFont ?? ''}
                                                onChange={(event) =>
                                                    updateGlobalStyles({
                                                        headingFont: event.target.value,
                                                    })
                                                }
                                                placeholder="Poppins, sans-serif"
                                                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                            />
                                        </label>
                                    </div>
                                </section>

                                <section className="space-y-3">
                                    <h3 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">Page Settings</h3>
                                    <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                        <label className="flex items-center justify-between gap-3 text-sm text-neutral-700">
                                            <span>Stretch section</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updatePageSettings({
                                                        stretchSection: !pageSettings.stretchSection,
                                                    })
                                                }
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                                    pageSettings.stretchSection ? 'bg-sky-600' : 'bg-neutral-300'
                                                }`}
                                                aria-pressed={Boolean(pageSettings.stretchSection)}
                                            >
                                                <span
                                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                                        pageSettings.stretchSection ? 'translate-x-5' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </label>

                                        <label className="block space-y-1">
                                            <span className="text-sm text-neutral-700">Custom CSS</span>
                                            <textarea
                                                value={pageSettings.customCss ?? ''}
                                                onChange={(event) =>
                                                    updatePageSettings({
                                                        customCss: event.target.value,
                                                    })
                                                }
                                                rows={8}
                                                placeholder=".my-section { margin-top: 40px; }"
                                                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                            />
                                        </label>
                                    </div>
                                </section>
                            </div>
                        </aside>
                    </>
                ) : null}
            </div>
        </>
    );
}

BuilderIndex.layout = null;

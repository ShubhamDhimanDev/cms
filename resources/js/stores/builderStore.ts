import { nanoid } from 'nanoid';
import { create } from 'zustand';
import type {
    BuilderLayout,
    BuilderSelection,
    ColumnPreset,
    Column,
    ColumnSettings,
    Section,
    SectionSettings,
    SharedStyleSettings,
    Widget,
    WidgetSettings,
    WidgetType,
} from '@/types/builder';

type DevicePreview = 'desktop' | 'tablet' | 'mobile';

interface BuilderStore {
    layout: BuilderLayout;
    selection: BuilderSelection;
    history: BuilderLayout[];
    historyIndex: number;
    isDirty: boolean;
    device: DevicePreview;
    copiedWidget: Widget | null;
    copiedStyle: SharedStyleSettings | null;
    navigatorHover: BuilderSelection;
    setLayout: (layout: BuilderLayout) => void;
    pushHistory: (layout: BuilderLayout) => void;
    pushHistoryDebounced: (layout: BuilderLayout) => void;
    undo: () => void;
    redo: () => void;
    select: (selection: BuilderSelection) => void;
    clearSelection: () => void;
    setDevice: (device: DevicePreview) => void;
    setNavigatorHover: (selection: BuilderSelection) => void;
    updateGlobalStyles: (styles: NonNullable<BuilderLayout['globalStyles']>) => void;
    updatePageSettings: (settings: NonNullable<BuilderLayout['pageSettings']>) => void;
    addSection: (afterSectionId?: string) => void;
    duplicateSection: (sectionId: string) => void;
    deleteSection: (sectionId: string) => void;
    updateSectionSettings: (sectionId: string, settings: Partial<SectionSettings>) => void;
    moveSectionUp: (sectionId: string) => void;
    moveSectionDown: (sectionId: string) => void;
    reorderSections: (fromIndex: number, toIndex: number) => void;
    setSectionColumnPreset: (sectionId: string, preset: ColumnPreset) => void;
    addColumn: (sectionId: string) => void;
    duplicateColumn: (sectionId: string, columnId: string) => void;
    deleteColumn: (sectionId: string, columnId: string) => void;
    updateColumnWidth: (sectionId: string, columnId: string, width: number) => void;
    updateColumnSettings: (sectionId: string, columnId: string, settings: Partial<ColumnSettings>) => void;
    reorderColumns: (sectionId: string, fromIndex: number, toIndex: number) => void;
    addWidget: (sectionId: string, columnId: string, widgetType: WidgetType, afterWidgetId?: string) => void;
    duplicateWidget: (sectionId: string, columnId: string, widgetId: string) => void;
    deleteWidget: (sectionId: string, columnId: string, widgetId: string) => void;
    updateWidgetSettings: (
        sectionId: string,
        columnId: string,
        widgetId: string,
        settings: Partial<WidgetSettings>,
    ) => void;
    copyWidget: (sectionId: string, columnId: string, widgetId: string) => void;
    pasteWidget: (sectionId: string, columnId: string, widgetId: string) => void;
    copyStyle: (sectionId: string, columnId: string, widgetId: string) => void;
    pasteStyle: (sectionId: string, columnId: string, widgetId: string) => void;
    reorderWidgets: (sectionId: string, columnId: string, fromIndex: number, toIndex: number) => void;
    moveWidget: (
        fromSectionId: string,
        fromColumnId: string,
        fromIndex: number,
        toSectionId: string,
        toColumnId: string,
        toIndex: number,
    ) => void;
}

const EMPTY_LAYOUT: BuilderLayout = { sections: [] };

const HISTORY_LIMIT = 30;
const TYPING_HISTORY_DEBOUNCE_MS = 250;

let historyDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingHistorySnapshot: BuilderLayout | null = null;

const EMPTY_SELECTION: BuilderSelection = {
    type: null,
    sectionId: null,
    columnId: null,
    widgetId: null,
};

function cloneLayout(layout: BuilderLayout): BuilderLayout {
    return JSON.parse(JSON.stringify(layout)) as BuilderLayout;
}

function equalWidths(count: number): number[] {
    if (count <= 0) {
        return [];
    }

    const baseWidth = Math.floor(100 / count);
    const remainder = 100 - baseWidth * count;

    return Array.from({ length: count }, (_, index) => baseWidth + (index < remainder ? 1 : 0));
}

function createEmptySection(): Section {
    return {
        id: nanoid(),
        type: 'section',
        settings: {},
        columns: [
            {
                id: nanoid(),
                width: 100,
                settings: {},
                widgets: [],
            },
        ],
    };
}

function cloneWidgetWithId(widget: Widget): Widget {
    return {
        ...widget,
        id: nanoid(),
        settings: { ...widget.settings },
    };
}

function findSection(sections: Section[], sectionId: string): Section | undefined {
    return sections.find((section) => section.id === sectionId);
}

function findColumn(section: Section, columnId: string): Column | undefined {
    return section.columns.find((column) => column.id === columnId);
}

function widthsForPreset(preset: ColumnPreset): number[] {
    switch (preset) {
        case '50-50':
            return [50, 50];
        case '33-33-33':
            return [34, 33, 33];
        case '25-75':
            return [25, 75];
        case '75-25':
            return [75, 25];
        case '25-50-25':
            return [25, 50, 25];
        case '25-25-25-25':
            return [25, 25, 25, 25];
        case '100':
        default:
            return [100];
    }
}

const SHARED_STYLE_KEYS: Array<keyof SharedStyleSettings> = [
    'color',
    'backgroundColor',
    'fontSize',
    'fontWeight',
    'textAlign',
    'padding',
    'margin',
    'borderRadius',
    'border',
    'lineHeight',
    'letterSpacing',
];

export function defaultWidgetSettings(type: WidgetType): WidgetSettings {
    switch (type) {
        case 'heading':
            return { text: 'Heading', tag: 'h2' };
        case 'text':
            return { content: 'Add your text here.' };
        case 'image':
            return { src: '', alt: '', width: '100%' };
        case 'button':
            return {
                label: 'Button',
                url: '#',
                target: '_self',
                variant: 'solid',
            };
        case 'divider':
            return {
                border: '1px solid #e5e7eb',
                margin: '16px 0',
            };
        case 'spacer':
            return { height: '24px' };
        case 'video':
            return { videoUrl: '', autoplay: false };
        case 'html':
            return { html: '' };
    }
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
    layout: cloneLayout(EMPTY_LAYOUT),
    selection: { ...EMPTY_SELECTION },
    history: [cloneLayout(EMPTY_LAYOUT)],
    historyIndex: 0,
    isDirty: false,
    device: 'desktop',
    copiedWidget: null,
    copiedStyle: null,
    navigatorHover: { ...EMPTY_SELECTION },

    setLayout: (layout) => {
        const snapshot = cloneLayout(layout);

        if (historyDebounceTimer) {
            clearTimeout(historyDebounceTimer);
            historyDebounceTimer = null;
        }

        pendingHistorySnapshot = null;

        set({
            layout: snapshot,
            history: [snapshot],
            historyIndex: 0,
            isDirty: false,
        });
    },

    pushHistory: (layout) => {
        if (historyDebounceTimer) {
            clearTimeout(historyDebounceTimer);
            historyDebounceTimer = null;
        }

        pendingHistorySnapshot = null;

        set((state) => {
            const nextHistory = [...state.history.slice(0, state.historyIndex + 1), layout];
            const trimmedHistory = nextHistory.slice(-HISTORY_LIMIT);

            return {
                layout: layout,
                history: trimmedHistory,
                historyIndex: trimmedHistory.length - 1,
                isDirty: true,
            };
        });
    },

    pushHistoryDebounced: (layout) => {
        if (historyDebounceTimer) {
            clearTimeout(historyDebounceTimer);
        }

        pendingHistorySnapshot = layout;

        set({
            layout,
            isDirty: true,
        });

        historyDebounceTimer = setTimeout(() => {
            const snapshot = pendingHistorySnapshot;

            if (!snapshot) {
                historyDebounceTimer = null;
                return;
            }

            set((state) => {
                const nextHistory = [...state.history.slice(0, state.historyIndex + 1), snapshot];
                const trimmedHistory = nextHistory.slice(-HISTORY_LIMIT);

                return {
                    layout: snapshot,
                    history: trimmedHistory,
                    historyIndex: trimmedHistory.length - 1,
                    isDirty: true,
                };
            });

            pendingHistorySnapshot = null;
            historyDebounceTimer = null;
        }, TYPING_HISTORY_DEBOUNCE_MS);
    },

    undo: () => {
        if (historyDebounceTimer) {
            clearTimeout(historyDebounceTimer);
            historyDebounceTimer = null;
        }

        pendingHistorySnapshot = null;

        const state = get();

        if (state.historyIndex <= 0) {
            return;
        }

        const nextIndex = state.historyIndex - 1;
        const snapshot = cloneLayout(state.history[nextIndex]);

        set({
            layout: snapshot,
            historyIndex: nextIndex,
            isDirty: true,
        });
    },

    redo: () => {
        if (historyDebounceTimer) {
            clearTimeout(historyDebounceTimer);
            historyDebounceTimer = null;
        }

        pendingHistorySnapshot = null;

        const state = get();

        if (state.historyIndex >= state.history.length - 1) {
            return;
        }

        const nextIndex = state.historyIndex + 1;
        const snapshot = cloneLayout(state.history[nextIndex]);

        set({
            layout: snapshot,
            historyIndex: nextIndex,
            isDirty: true,
        });
    },

    select: (selection) => {
        set({ selection });
    },

    clearSelection: () => {
        set({ selection: { ...EMPTY_SELECTION } });
    },

    setDevice: (device) => {
        set({ device });
    },

    setNavigatorHover: (selection) => {
        set({ navigatorHover: selection });
    },

    updateGlobalStyles: (styles) => {
        const nextLayout = cloneLayout(get().layout);

        nextLayout.globalStyles = {
            ...(nextLayout.globalStyles ?? {}),
            ...styles,
        };

        get().pushHistoryDebounced(nextLayout);
    },

    updatePageSettings: (settings) => {
        const nextLayout = cloneLayout(get().layout);

        nextLayout.pageSettings = {
            ...(nextLayout.pageSettings ?? {}),
            ...settings,
        };

        get().pushHistoryDebounced(nextLayout);
    },

    addSection: (afterSectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const newSection = createEmptySection();

        if (!afterSectionId) {
            nextLayout.sections.push(newSection);
        } else {
            const index = nextLayout.sections.findIndex((section) => section.id === afterSectionId);

            if (index === -1) {
                nextLayout.sections.push(newSection);
            } else {
                nextLayout.sections.splice(index + 1, 0, newSection);
            }
        }

        get().pushHistory(nextLayout);
    },

    duplicateSection: (sectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const index = nextLayout.sections.findIndex((section) => section.id === sectionId);

        if (index === -1) {
            return;
        }

        const sourceSection = nextLayout.sections[index];
        const duplicatedSection: Section = {
            ...sourceSection,
            id: nanoid(),
            settings: { ...sourceSection.settings },
            columns: sourceSection.columns.map((column) => ({
                ...column,
                id: nanoid(),
                widgets: column.widgets.map((widget) => cloneWidgetWithId(widget)),
            })),
        };

        nextLayout.sections.splice(index + 1, 0, duplicatedSection);
        get().pushHistory(nextLayout);
    },

    deleteSection: (sectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const before = nextLayout.sections.length;

        nextLayout.sections = nextLayout.sections.filter((section) => section.id !== sectionId);

        if (nextLayout.sections.length === before) {
            return;
        }

        get().pushHistory(nextLayout);
    },

    updateSectionSettings: (sectionId, settings) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        section.settings = {
            ...section.settings,
            ...settings,
        };

        get().pushHistoryDebounced(nextLayout);
    },

    moveSectionUp: (sectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const index = nextLayout.sections.findIndex((section) => section.id === sectionId);

        if (index <= 0) {
            return;
        }

        [nextLayout.sections[index - 1], nextLayout.sections[index]] = [
            nextLayout.sections[index],
            nextLayout.sections[index - 1],
        ];

        get().pushHistory(nextLayout);
    },

    moveSectionDown: (sectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const index = nextLayout.sections.findIndex((section) => section.id === sectionId);

        if (index === -1 || index >= nextLayout.sections.length - 1) {
            return;
        }

        [nextLayout.sections[index], nextLayout.sections[index + 1]] = [
            nextLayout.sections[index + 1],
            nextLayout.sections[index],
        ];

        get().pushHistory(nextLayout);
    },

    reorderSections: (fromIndex, toIndex) => {
        const nextLayout = cloneLayout(get().layout);

        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= nextLayout.sections.length ||
            toIndex >= nextLayout.sections.length ||
            fromIndex === toIndex
        ) {
            return;
        }

        const [moved] = nextLayout.sections.splice(fromIndex, 1);
        nextLayout.sections.splice(toIndex, 0, moved);

        get().pushHistory(nextLayout);
    },

    setSectionColumnPreset: (sectionId, preset) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const widths = widthsForPreset(preset);
        const existingWidgets = section.columns.flatMap((column) => column.widgets);

        section.settings = {
            ...section.settings,
            columnPreset: preset,
        };

        section.columns = widths.map((width, index) => ({
            id: nanoid(),
            width,
            settings: {},
            widgets: index === 0 ? existingWidgets : [],
        }));

        get().pushHistory(nextLayout);
    },

    addColumn: (sectionId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        section.columns.push({
            id: nanoid(),
            width: 0,
            settings: {},
            widgets: [],
        });

        const widths = equalWidths(section.columns.length);
        section.columns = section.columns.map((column, index) => ({
            ...column,
            width: widths[index],
        }));

        get().pushHistory(nextLayout);
    },

    duplicateColumn: (sectionId, columnId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const index = section.columns.findIndex((column) => column.id === columnId);

        if (index === -1) {
            return;
        }

        const sourceColumn = section.columns[index];
        const duplicatedColumn: Column = {
            ...sourceColumn,
            id: nanoid(),
            settings: { ...sourceColumn.settings },
            widgets: sourceColumn.widgets.map((widget) => cloneWidgetWithId(widget)),
        };

        section.columns.splice(index + 1, 0, duplicatedColumn);

        const widths = equalWidths(section.columns.length);
        section.columns = section.columns.map((column, widthIndex) => ({
            ...column,
            width: widths[widthIndex],
        }));

        get().pushHistory(nextLayout);
    },

    deleteColumn: (sectionId, columnId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section || section.columns.length <= 1) {
            return;
        }

        const before = section.columns.length;
        section.columns = section.columns.filter((column) => column.id !== columnId);

        if (section.columns.length === before) {
            return;
        }

        const widths = equalWidths(section.columns.length);
        section.columns = section.columns.map((column, index) => ({
            ...column,
            width: widths[index],
        }));

        get().pushHistory(nextLayout);
    },

    updateColumnWidth: (sectionId, columnId, width) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const safeWidth = Math.max(0, Math.min(100, width));
        const otherColumns = section.columns.filter((entry) => entry.id !== columnId);

        column.width = safeWidth;

        if (otherColumns.length === 0) {
            column.width = 100;
            get().pushHistory(nextLayout);
            return;
        }

        const remaining = Math.max(0, 100 - safeWidth);
        const base = Math.floor(remaining / otherColumns.length);
        const remainder = remaining - base * otherColumns.length;

        otherColumns.forEach((entry, index) => {
            entry.width = base + (index < remainder ? 1 : 0);
        });

        get().pushHistory(nextLayout);
    },

    updateColumnSettings: (sectionId, columnId, settings) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        column.settings = {
            ...(column.settings ?? {}),
            ...settings,
        };

        get().pushHistoryDebounced(nextLayout);
    },

    reorderColumns: (sectionId, fromIndex, toIndex) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= section.columns.length ||
            toIndex >= section.columns.length ||
            fromIndex === toIndex
        ) {
            return;
        }

        const [moved] = section.columns.splice(fromIndex, 1);
        section.columns.splice(toIndex, 0, moved);

        get().pushHistory(nextLayout);
    },

    addWidget: (sectionId, columnId, widgetType, afterWidgetId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const widget: Widget = {
            id: nanoid(),
            type: widgetType,
            settings: defaultWidgetSettings(widgetType),
        };

        if (!afterWidgetId) {
            column.widgets.push(widget);
        } else {
            const index = column.widgets.findIndex((entry) => entry.id === afterWidgetId);

            if (index === -1) {
                column.widgets.push(widget);
            } else {
                column.widgets.splice(index + 1, 0, widget);
            }
        }

        get().pushHistory(nextLayout);
    },

    duplicateWidget: (sectionId, columnId, widgetId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const index = column.widgets.findIndex((widget) => widget.id === widgetId);

        if (index === -1) {
            return;
        }

        const sourceWidget = column.widgets[index];
        const duplicatedWidget: Widget = {
            ...sourceWidget,
            id: nanoid(),
            settings: { ...sourceWidget.settings },
        };

        column.widgets.splice(index + 1, 0, duplicatedWidget);
        get().pushHistory(nextLayout);
    },

    deleteWidget: (sectionId, columnId, widgetId) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const before = column.widgets.length;
        column.widgets = column.widgets.filter((widget) => widget.id !== widgetId);

        if (column.widgets.length === before) {
            return;
        }

        get().pushHistory(nextLayout);
    },

    updateWidgetSettings: (sectionId, columnId, widgetId, settings) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const widget = column.widgets.find((entry) => entry.id === widgetId);

        if (!widget) {
            return;
        }

        widget.settings = {
            ...widget.settings,
            ...settings,
        };

        get().pushHistoryDebounced(nextLayout);
    },

    copyWidget: (sectionId, columnId, widgetId) => {
        const section = findSection(get().layout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const widget = column.widgets.find((entry) => entry.id === widgetId);

        if (!widget) {
            return;
        }

        set({
            copiedWidget: cloneWidgetWithId(widget),
        });
    },

    pasteWidget: (sectionId, columnId, widgetId) => {
        const state = get();

        if (!state.copiedWidget) {
            return;
        }

        const nextLayout = cloneLayout(state.layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const insertAt = column.widgets.findIndex((entry) => entry.id === widgetId);
        const duplicated = cloneWidgetWithId(state.copiedWidget);

        if (insertAt === -1) {
            column.widgets.push(duplicated);
        } else {
            column.widgets.splice(insertAt + 1, 0, duplicated);
        }

        get().pushHistory(nextLayout);
    },

    copyStyle: (sectionId, columnId, widgetId) => {
        const section = findSection(get().layout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        const widget = column.widgets.find((entry) => entry.id === widgetId);

        if (!widget) {
            return;
        }

        const copiedStyle: SharedStyleSettings = {};

        for (const key of SHARED_STYLE_KEYS) {
            const value = widget.settings[key];

            if (value !== undefined) {
                (copiedStyle as Record<string, unknown>)[key] = value;
            }
        }

        set({ copiedStyle });
    },

    pasteStyle: (sectionId, columnId, widgetId) => {
        const state = get();

        if (!state.copiedStyle) {
            return;
        }

        state.updateWidgetSettings(sectionId, columnId, widgetId, state.copiedStyle);
    },

    reorderWidgets: (sectionId, columnId, fromIndex, toIndex) => {
        const nextLayout = cloneLayout(get().layout);
        const section = findSection(nextLayout.sections, sectionId);

        if (!section) {
            return;
        }

        const column = findColumn(section, columnId);

        if (!column) {
            return;
        }

        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= column.widgets.length ||
            toIndex >= column.widgets.length ||
            fromIndex === toIndex
        ) {
            return;
        }

        const [moved] = column.widgets.splice(fromIndex, 1);
        column.widgets.splice(toIndex, 0, moved);

        get().pushHistory(nextLayout);
    },

    moveWidget: (fromSectionId, fromColumnId, fromIndex, toSectionId, toColumnId, toIndex) => {
        const nextLayout = cloneLayout(get().layout);
        const fromSection = findSection(nextLayout.sections, fromSectionId);
        const toSection = findSection(nextLayout.sections, toSectionId);

        if (!fromSection || !toSection) {
            return;
        }

        const fromColumn = findColumn(fromSection, fromColumnId);
        const toColumn = findColumn(toSection, toColumnId);

        if (!fromColumn || !toColumn) {
            return;
        }

        if (fromIndex < 0 || fromIndex >= fromColumn.widgets.length) {
            return;
        }

        const [movedWidget] = fromColumn.widgets.splice(fromIndex, 1);

        if (!movedWidget) {
            return;
        }

        const safeToIndex = Math.max(0, Math.min(toIndex, toColumn.widgets.length));
        toColumn.widgets.splice(safeToIndex, 0, movedWidget);

        get().pushHistory(nextLayout);
    },
}));

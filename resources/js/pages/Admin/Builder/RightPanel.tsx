import { useMemo } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import SectionSettingsPanel from './SectionSettingsPanel';
import ColumnSettingsPanel from './ColumnSettingsPanel';
import WidgetSettingsPanel from './WidgetSettingsPanel';

export default function RightPanel() {
    const selection = useBuilderStore((state) => state.selection);
    const layout = useBuilderStore((state) => state.layout);

    const selectedSection = useMemo(() => {
        if (!selection.sectionId) {
            return null;
        }

        return layout.sections.find((section) => section.id === selection.sectionId) ?? null;
    }, [layout.sections, selection.sectionId]);

    const selectedColumn = useMemo(() => {
        if (!selectedSection || !selection.columnId) {
            return null;
        }

        return selectedSection.columns.find((column) => column.id === selection.columnId) ?? null;
    }, [selectedSection, selection.columnId]);

    const selectedWidget = useMemo(() => {
        if (!selectedColumn || !selection.widgetId) {
            return null;
        }

        return selectedColumn.widgets.find((widget) => widget.id === selection.widgetId) ?? null;
    }, [selectedColumn, selection.widgetId]);

    return (
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-neutral-700 bg-[#1e1e2e] p-4 text-neutral-100">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-neutral-300 uppercase">Settings</h2>

            <div className="mt-4">
                {!selection.type ? (
                    <div className="rounded-lg border border-neutral-700 bg-[#26263a] p-3 text-sm text-neutral-300">
                        Select an element to edit its settings.
                    </div>
                ) : null}

                {selection.type === 'section' && selectedSection ? (
                    <SectionSettingsPanel section={selectedSection} />
                ) : null}

                {selection.type === 'column' && selectedSection && selectedColumn ? (
                    <ColumnSettingsPanel sectionId={selectedSection.id} column={selectedColumn} />
                ) : null}

                {selection.type === 'widget' && selectedSection && selectedColumn && selectedWidget ? (
                    <WidgetSettingsPanel sectionId={selectedSection.id} columnId={selectedColumn.id} widget={selectedWidget} />
                ) : null}
            </div>
        </aside>
    );
}

import { useBuilderStore } from '@/stores/builderStore';
import type { Column } from '@/types/builder';

type Props = {
    sectionId: string;
    column: Column;
};

function toPixels(value?: string): string {
    if (!value) {
        return '';
    }

    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? '' : String(parsed);
}

export default function ColumnSettingsPanel({ sectionId, column }: Props) {
    const updateColumnWidth = useBuilderStore((state) => state.updateColumnWidth);
    const updateColumnSettings = useBuilderStore((state) => state.updateColumnSettings);

    const updatePxField = (
        field: 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft',
        value: string,
    ) => {
        if (value === '') {
            updateColumnSettings(sectionId, column.id, { [field]: '' });
            return;
        }

        updateColumnSettings(sectionId, column.id, { [field]: `${value}px` });
    };

    return (
        <div className="space-y-4 rounded-lg border border-neutral-700 bg-[#26263a] p-3 text-sm">
            <p className="text-xs font-semibold tracking-wide text-neutral-300 uppercase">Column</p>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Width %</span>
                <input
                    type="number"
                    min={0}
                    max={100}
                    value={column.width}
                    onChange={(event) => updateColumnWidth(sectionId, column.id, Number(event.target.value || 0))}
                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                />
            </label>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Background Color</span>
                <input
                    type="color"
                    value={column.settings?.backgroundColor ?? '#ffffff'}
                    onChange={(event) => updateColumnSettings(sectionId, column.id, { backgroundColor: event.target.value })}
                    className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                />
            </label>

            <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Top</span>
                    <input
                        type="number"
                        value={toPixels(column.settings?.paddingTop)}
                        onChange={(event) => updatePxField('paddingTop', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Right</span>
                    <input
                        type="number"
                        value={toPixels(column.settings?.paddingRight)}
                        onChange={(event) => updatePxField('paddingRight', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Bottom</span>
                    <input
                        type="number"
                        value={toPixels(column.settings?.paddingBottom)}
                        onChange={(event) => updatePxField('paddingBottom', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Left</span>
                    <input
                        type="number"
                        value={toPixels(column.settings?.paddingLeft)}
                        onChange={(event) => updatePxField('paddingLeft', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
            </div>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Vertical Align</span>
                <select
                    value={column.settings?.verticalAlign ?? 'top'}
                    onChange={(event) =>
                        updateColumnSettings(sectionId, column.id, {
                            verticalAlign: event.target.value as 'top' | 'center' | 'bottom',
                        })
                    }
                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                >
                    <option value="top">Top</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                </select>
            </label>
        </div>
    );
}

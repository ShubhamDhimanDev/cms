import { Upload } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import type { Section } from '@/types/builder';

type Props = {
    section: Section;
};

function toPixels(value?: string): string {
    if (!value) {
        return '';
    }

    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? '' : String(parsed);
}

export default function SectionSettingsPanel({ section }: Props) {
    const updateSectionSettings = useBuilderStore((state) => state.updateSectionSettings);

    const updatePxField = (field: 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft' | 'marginTop' | 'marginBottom' | 'columnGap', value: string) => {
        if (value === '') {
            updateSectionSettings(section.id, { [field]: '' });
            return;
        }

        updateSectionSettings(section.id, { [field]: `${value}px` });
    };

    return (
        <div className="space-y-4 rounded-lg border border-neutral-700 bg-[#26263a] p-3 text-sm">
            <p className="text-xs font-semibold tracking-wide text-neutral-300 uppercase">Section</p>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Background Color</span>
                <input
                    type="color"
                    value={section.settings.background ?? '#ffffff'}
                    onChange={(event) => updateSectionSettings(section.id, { background: event.target.value })}
                    className="h-9 w-full rounded border border-neutral-600 bg-transparent"
                />
            </label>

            <div className="space-y-1">
                <span className="text-xs text-neutral-300">Background Image</span>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={section.settings.backgroundImage ?? ''}
                        onChange={(event) => updateSectionSettings(section.id, { backgroundImage: event.target.value })}
                        placeholder="https://..."
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                    <button
                        type="button"
                        className="inline-flex h-9 items-center gap-1 rounded border border-neutral-600 px-2 text-xs text-neutral-200 hover:bg-neutral-700"
                    >
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                    </button>
                </div>
            </div>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Background Size</span>
                <select
                    value={section.settings.backgroundSize ?? 'cover'}
                    onChange={(event) =>
                        updateSectionSettings(section.id, {
                            backgroundSize: event.target.value as 'cover' | 'contain' | 'auto',
                        })
                    }
                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                >
                    <option value="cover">cover</option>
                    <option value="contain">contain</option>
                    <option value="auto">auto</option>
                </select>
            </label>

            <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Top (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.paddingTop)}
                        onChange={(event) => updatePxField('paddingTop', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Right (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.paddingRight)}
                        onChange={(event) => updatePxField('paddingRight', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Bottom (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.paddingBottom)}
                        onChange={(event) => updatePxField('paddingBottom', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Padding Left (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.paddingLeft)}
                        onChange={(event) => updatePxField('paddingLeft', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Margin Top (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.marginTop)}
                        onChange={(event) => updatePxField('marginTop', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
                <label className="space-y-1">
                    <span className="text-xs text-neutral-300">Margin Bottom (px)</span>
                    <input
                        type="number"
                        value={toPixels(section.settings.marginBottom)}
                        onChange={(event) => updatePxField('marginBottom', event.target.value)}
                        className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                    />
                </label>
            </div>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Max Width</span>
                <input
                    type="text"
                    value={section.settings.maxWidth ?? ''}
                    onChange={(event) => updateSectionSettings(section.id, { maxWidth: event.target.value })}
                    placeholder="1200px or 100%"
                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                />
            </label>

            <label className="flex items-center justify-between rounded border border-neutral-700 px-2 py-2">
                <span className="text-xs text-neutral-200">Full Width</span>
                <input
                    type="checkbox"
                    checked={Boolean(section.settings.fullWidth)}
                    onChange={(event) => updateSectionSettings(section.id, { fullWidth: event.target.checked })}
                    className="h-4 w-4"
                />
            </label>

            <label className="block space-y-1">
                <span className="text-xs text-neutral-300">Column Gap (px)</span>
                <input
                    type="number"
                    value={toPixels(section.settings.columnGap)}
                    onChange={(event) => updatePxField('columnGap', event.target.value)}
                    className="h-9 w-full rounded border border-neutral-600 bg-neutral-900 px-2 text-neutral-100 outline-none focus:border-sky-500"
                />
            </label>
        </div>
    );
}

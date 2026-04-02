import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import SectionBlock from '@/pages/Admin/Builder/SectionBlock';

export default function Canvas() {
    const layout = useBuilderStore((state) => state.layout);
    const device = useBuilderStore((state) => state.device);
    const addSection = useBuilderStore((state) => state.addSection);

    const canvasContainerClass =
        device === 'tablet' ? 'mx-auto max-w-[768px]' : device === 'mobile' ? 'mx-auto max-w-[375px]' : 'max-w-full';

    return (
        <main className="min-w-0 flex-1 overflow-y-auto bg-neutral-100 px-4 py-5 sm:px-6">
            <div className={`${canvasContainerClass} transition-all duration-200`}>
                <div className="space-y-4">
                    {layout.sections.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">
                            Start by adding a section or dragging a widget into a column.
                        </div>
                    ) : (
                        <SortableContext items={layout.sections.map((section) => section.id)} strategy={verticalListSortingStrategy}>
                            {layout.sections.map((section, index) => (
                                <SectionBlock key={section.id} section={section} index={index} total={layout.sections.length} />
                            ))}
                        </SortableContext>
                    )}

                    <div className="py-6">
                        <button
                            type="button"
                            onClick={() => addSection()}
                            className="mx-auto flex min-h-16 w-full max-w-xl items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 bg-white text-sm font-medium text-neutral-600 transition hover:border-sky-400 hover:text-sky-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Section
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

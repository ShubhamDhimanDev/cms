import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PageBuilderBlock } from '@/types/cms';

type Props = {
    blocks: PageBuilderBlock[];
    onChange: (blocks: PageBuilderBlock[]) => void;
};

function makeId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeDefaultBlock(type: PageBuilderBlock['type']): PageBuilderBlock {
    switch (type) {
        case 'heading':
            return { id: makeId(), type: 'heading', level: 2, content: 'New heading' };
        case 'text':
            return { id: makeId(), type: 'text', content: 'Write your paragraph...' };
        case 'image':
            return { id: makeId(), type: 'image', url: '', content: 'Image alt text' };
        case 'button':
            return { id: makeId(), type: 'button', text: 'Click me', url: '' };
    }
}

function updateBlock(
    blocks: PageBuilderBlock[],
    id: string,
    updater: (block: PageBuilderBlock) => PageBuilderBlock,
): PageBuilderBlock[] {
    return blocks.map((block) => (block.id === id ? updater(block) : block));
}

function reorder(blocks: PageBuilderBlock[], fromIndex: number, toIndex: number): PageBuilderBlock[] {
    const copy = [...blocks];
    const [moved] = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, moved);

    return copy;
}

export default function PageBuilderEditor({ blocks, onChange }: Props) {
    const draggedIndexRef = useRef<number>(-1);

    return (
        <section className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-neutral-900">Page Builder</p>

                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...blocks, makeDefaultBlock('heading')])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Heading
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...blocks, makeDefaultBlock('text')])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Text
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...blocks, makeDefaultBlock('image')])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Image
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...blocks, makeDefaultBlock('button')])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Button
                </Button>
            </div>

            {blocks.length === 0 ? (
                <p className="rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm text-neutral-500">
                    Add blocks and drag them to reorder, similar to a visual builder.
                </p>
            ) : null}

            <div className="space-y-3">
                {blocks.map((block, index) => (
                    <article
                        key={block.id}
                        draggable
                        onDragStart={() => {
                            draggedIndexRef.current = index;
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                        }}
                        onDrop={() => {
                            if (draggedIndexRef.current === -1 || draggedIndexRef.current === index) {
                                return;
                            }

                            onChange(reorder(blocks, draggedIndexRef.current, index));
                            draggedIndexRef.current = -1;
                        }}
                        className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs"
                    >
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700">
                                <GripVertical className="h-4 w-4" />
                                {block.type.charAt(0).toUpperCase() + block.type.slice(1)} block
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onChange(blocks.filter((item) => item.id !== block.id))}
                                aria-label="Delete block"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {block.type === 'heading' ? (
                            <div className="grid gap-3 md:grid-cols-4">
                                <div className="grid gap-2">
                                    <Label htmlFor={`level-${block.id}`}>Level</Label>
                                    <select
                                        id={`level-${block.id}`}
                                        className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                                        value={block.level}
                                        onChange={(event) => {
                                            const level = Number(event.target.value) as 1 | 2 | 3;
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, level })));
                                        }}
                                    >
                                        <option value={1}>H1</option>
                                        <option value={2}>H2</option>
                                        <option value={3}>H3</option>
                                    </select>
                                </div>
                                <div className="grid gap-2 md:col-span-3">
                                    <Label htmlFor={`content-${block.id}`}>Heading text</Label>
                                    <Input
                                        id={`content-${block.id}`}
                                        value={block.content}
                                        onChange={(event) => {
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, content: event.target.value })));
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {block.type === 'text' ? (
                            <div className="grid gap-2">
                                <Label htmlFor={`content-${block.id}`}>Paragraph text</Label>
                                <textarea
                                    id={`content-${block.id}`}
                                    rows={4}
                                    value={block.content}
                                    onChange={(event) => {
                                        onChange(updateBlock(blocks, block.id, () => ({ ...block, content: event.target.value })));
                                    }}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                                />
                            </div>
                        ) : null}

                        {block.type === 'image' ? (
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor={`url-${block.id}`}>Image URL</Label>
                                    <Input
                                        id={`url-${block.id}`}
                                        value={block.url}
                                        placeholder="https://..."
                                        onChange={(event) => {
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, url: event.target.value })));
                                        }}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor={`alt-${block.id}`}>Alt text</Label>
                                    <Input
                                        id={`alt-${block.id}`}
                                        value={block.content ?? ''}
                                        onChange={(event) => {
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, content: event.target.value })));
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {block.type === 'button' ? (
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor={`text-${block.id}`}>Button text</Label>
                                    <Input
                                        id={`text-${block.id}`}
                                        value={block.text}
                                        onChange={(event) => {
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, text: event.target.value })));
                                        }}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor={`url-${block.id}`}>Button URL</Label>
                                    <Input
                                        id={`url-${block.id}`}
                                        value={block.url}
                                        placeholder="https://..."
                                        onChange={(event) => {
                                            onChange(updateBlock(blocks, block.id, () => ({ ...block, url: event.target.value })));
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </article>
                ))}
            </div>
        </section>
    );
}

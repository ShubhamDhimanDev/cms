import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useCallback, useId, useState } from 'react';
import MediaPickerModal from '@/components/cms/media-picker-modal';
import type { PostBlock } from '@/types/cms';

type Props = {
    blocks: PostBlock[];
    onChange: (blocks: PostBlock[]) => void;
};

type BlockType = PostBlock['type'];

const BLOCK_LABELS: Record<BlockType, string> = {
    heading: 'Heading',
    paragraph: 'Paragraph',
    image: 'Image',
    list: 'List',
    quote: 'Quote',
    divider: 'Divider',
};

function makeId() {
    return Math.random().toString(36).slice(2, 10);
}

function makeBlock(type: BlockType): PostBlock {
    switch (type) {
        case 'heading':
            return { id: makeId(), type: 'heading', level: 2, content: '' };
        case 'paragraph':
            return { id: makeId(), type: 'paragraph', content: '' };
        case 'image':
            return { id: makeId(), type: 'image', url: '', alt: '' };
        case 'list':
            return { id: makeId(), type: 'list', listType: 'ul', items: [''] };
        case 'quote':
            return { id: makeId(), type: 'quote', content: '' };
        case 'divider':
            return { id: makeId(), type: 'divider' };
    }
}

export default function PostBlockEditor({ blocks, onChange }: Props) {
    const uid = useId();

    const addBlock = useCallback(
        (type: BlockType) => {
            onChange([...blocks, makeBlock(type)]);
        },
        [blocks, onChange],
    );

    const updateBlock = useCallback(
        (index: number, updated: PostBlock) => {
            const next = [...blocks];
            next[index] = updated;
            onChange(next);
        },
        [blocks, onChange],
    );

    const removeBlock = useCallback(
        (index: number) => {
            onChange(blocks.filter((_, i) => i !== index));
        },
        [blocks, onChange],
    );

    const moveBlock = useCallback(
        (index: number, direction: 'up' | 'down') => {
            const next = [...blocks];
            const target = direction === 'up' ? index - 1 : index + 1;
            if (target < 0 || target >= next.length) {
                return;
            }
            [next[index], next[target]] = [next[target], next[index]];
            onChange(next);
        },
        [blocks, onChange],
    );

    return (
        <div className="space-y-3">
            {blocks.map((block, index) => (
                <BlockRow
                    key={block.id}
                    block={block}
                    index={index}
                    total={blocks.length}
                    uid={uid}
                    onUpdate={(updated) => updateBlock(index, updated)}
                    onRemove={() => removeBlock(index)}
                    onMove={(dir) => moveBlock(index, dir)}
                />
            ))}

            <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                    <Plus className="h-3.5 w-3.5" />
                    Add block
                </span>
                {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => addBlock(type)}
                        className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
                    >
                        {BLOCK_LABELS[type]}
                    </button>
                ))}
            </div>
        </div>
    );
}

type BlockRowProps = {
    block: PostBlock;
    index: number;
    total: number;
    uid: string;
    onUpdate: (block: PostBlock) => void;
    onRemove: () => void;
    onMove: (dir: 'up' | 'down') => void;
};

function BlockRow({ block, index, total, uid, onUpdate, onRemove, onMove }: BlockRowProps) {
    return (
        <div className="group relative flex gap-2">
            <div className="flex flex-col items-center gap-0.5 pt-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => onMove('up')}
                    className="rounded p-0.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                    aria-label="Move block up"
                >
                    <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    disabled={index === total - 1}
                    onClick={() => onMove('down')}
                    className="rounded p-0.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                    aria-label="Move block down"
                >
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="min-w-0 flex-1">
                <BlockInput block={block} uid={uid} index={index} onUpdate={onUpdate} />
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="mt-1 self-start rounded p-1 text-neutral-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                aria-label="Remove block"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

type BlockInputProps = { block: PostBlock; uid: string; index: number; onUpdate: (b: PostBlock) => void };

function BlockInput({ block, uid, index, onUpdate }: BlockInputProps) {
    const inputClass =
        'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring';

    if (block.type === 'heading') {
        return (
            <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-500">Heading</span>
                    <select
                        value={block.level}
                        onChange={(e) => onUpdate({ ...block, level: Number(e.target.value) as 1 | 2 | 3 })}
                        className="h-7 rounded border border-input bg-transparent px-1.5 text-xs focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value={1}>H1</option>
                        <option value={2}>H2</option>
                        <option value={3}>H3</option>
                    </select>
                </div>
                <input
                    id={`${uid}-${index}-heading`}
                    type="text"
                    value={block.content}
                    onChange={(e) => onUpdate({ ...block, content: e.target.value })}
                    placeholder="Heading text…"
                    className={`${inputClass} font-semibold`}
                />
            </div>
        );
    }

    if (block.type === 'paragraph') {
        return (
            <textarea
                id={`${uid}-${index}-paragraph`}
                rows={3}
                value={block.content}
                onChange={(e) => onUpdate({ ...block, content: e.target.value })}
                placeholder="Paragraph text…"
                className={inputClass}
            />
        );
    }

    if (block.type === 'image') {
        return <ImageBlockInput block={block} uid={uid} index={index} onUpdate={onUpdate} inputClass={inputClass} />;
    }

    if (block.type === 'list') {
        return (
            <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-500">List</span>
                    <select
                        value={block.listType}
                        onChange={(e) => onUpdate({ ...block, listType: e.target.value as 'ul' | 'ol' })}
                        className="h-7 rounded border border-input bg-transparent px-1.5 text-xs focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="ul">Unordered (•)</option>
                        <option value="ol">Ordered (1.)</option>
                    </select>
                </div>
                {block.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-1.5">
                        <span className="w-5 shrink-0 text-center text-sm text-neutral-400">
                            {block.listType === 'ol' ? `${itemIndex + 1}.` : '•'}
                        </span>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const items = [...block.items];
                                items[itemIndex] = e.target.value;
                                onUpdate({ ...block, items });
                            }}
                            placeholder="List item…"
                            className={inputClass}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (block.items.length <= 1) {
                                    return;
                                }
                                onUpdate({ ...block, items: block.items.filter((_, i) => i !== itemIndex) });
                            }}
                            className="shrink-0 rounded p-1 text-neutral-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                            disabled={block.items.length <= 1}
                            aria-label="Remove item"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => onUpdate({ ...block, items: [...block.items, ''] })}
                    className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add item
                </button>
            </div>
        );
    }

    if (block.type === 'quote') {
        return (
            <textarea
                id={`${uid}-${index}-quote`}
                rows={2}
                value={block.content}
                onChange={(e) => onUpdate({ ...block, content: e.target.value })}
                placeholder="Quote text…"
                className={`${inputClass} border-l-4 border-l-neutral-400 pl-4`}
            />
        );
    }

    // divider
    return (
        <div className="flex items-center gap-3 py-2">
            <hr className="flex-1 border-neutral-300" />
            <span className="text-xs text-neutral-400">Divider</span>
            <hr className="flex-1 border-neutral-300" />
        </div>
    );
}

type ImageBlockInputProps = {
    block: Extract<PostBlock, { type: 'image' }>;
    uid: string;
    index: number;
    onUpdate: (b: PostBlock) => void;
    inputClass: string;
};

function ImageBlockInput({ block, uid, index, onUpdate, inputClass }: ImageBlockInputProps) {
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <input
                    id={`${uid}-${index}-image-url`}
                    type="url"
                    value={block.url}
                    onChange={(e) => onUpdate({ ...block, url: e.target.value })}
                    placeholder="Image URL…"
                    className={`${inputClass} flex-1`}
                />
                <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="shrink-0 rounded-md border border-input bg-transparent px-2.5 py-2 text-xs font-medium text-neutral-600 shadow-xs transition hover:bg-neutral-50"
                >
                    Choose from media
                </button>
            </div>
            <input
                id={`${uid}-${index}-image-alt`}
                type="text"
                value={block.alt}
                onChange={(e) => onUpdate({ ...block, alt: e.target.value })}
                placeholder="Alt text (for accessibility)…"
                className={inputClass}
            />
            {block.url ? (
                <img src={block.url} alt={block.alt} className="h-48 w-full rounded-md border border-neutral-200 object-cover" />
            ) : null}

            <MediaPickerModal
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={(url) => onUpdate({ ...block, url })}
            />
        </div>
    );
}

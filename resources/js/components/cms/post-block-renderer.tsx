import type { PostBlock } from '@/types/cms';

type Props = {
    blocks: PostBlock[];
};

export default function PostBlockRenderer({ blocks }: Props) {
    if (!Array.isArray(blocks) || blocks.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {blocks.map((block) => {
                if (block.type === 'heading') {
                    const shared = 'font-bold tracking-tight text-white';
                    if (block.level === 1) {
                        return (
                            <h1 key={block.id} className={`text-4xl ${shared}`}>
                                {block.content}
                            </h1>
                        );
                    }
                    if (block.level === 2) {
                        return (
                            <h2 key={block.id} className={`text-2xl ${shared}`}>
                                {block.content}
                            </h2>
                        );
                    }
                    return (
                        <h3 key={block.id} className={`text-xl ${shared}`}>
                            {block.content}
                        </h3>
                    );
                }

                if (block.type === 'paragraph') {
                    return (
                        <p key={block.id} className="whitespace-pre-wrap text-base leading-8 text-white/70">
                            {block.content}
                        </p>
                    );
                }

                if (block.type === 'image') {
                    if (!block.url) {
                        return null;
                    }
                    return (
                        <figure key={block.id}>
                            <img
                                src={block.url}
                                alt={block.alt || ''}
                                className="h-auto w-full rounded-xl border border-white/[0.06] object-cover"
                            />
                            {block.alt ? (
                                <figcaption className="mt-2 text-center text-sm text-white/35">{block.alt}</figcaption>
                            ) : null}
                        </figure>
                    );
                }

                if (block.type === 'list') {
                    const Tag = block.listType === 'ol' ? 'ol' : 'ul';
                    const listClass = block.listType === 'ol' ? 'list-decimal' : 'list-disc';
                    return (
                        <Tag key={block.id} className={`${listClass} space-y-2 pl-6 text-base leading-8 text-white/70`}>
                            {block.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </Tag>
                    );
                }

                if (block.type === 'quote') {
                    return (
                        <blockquote
                            key={block.id}
                            className="border-l-4 border-[#00b4e0] pl-5 text-base italic leading-8 text-white/60"
                        >
                            {block.content}
                        </blockquote>
                    );
                }

                if (block.type === 'divider') {
                    return <hr key={block.id} className="border-white/10" />;
                }

                return null;
            })}
        </div>
    );
}

import type { PageBuilderBlock } from '@/types/cms';

type Props = {
    blocks: PageBuilderBlock[];
};

export default function PageBlockRenderer({ blocks }: Props) {
    return (
        <div className="space-y-5">
            {blocks.map((block) => {
                if (block.type === 'heading') {
                    if (block.level === 1) {
                        return (
                            <h1 key={block.id} className="text-3xl font-semibold tracking-tight text-neutral-900">
                                {block.content}
                            </h1>
                        );
                    }

                    if (block.level === 2) {
                        return (
                            <h2 key={block.id} className="text-2xl font-semibold tracking-tight text-neutral-900">
                                {block.content}
                            </h2>
                        );
                    }

                    return (
                        <h3 key={block.id} className="text-xl font-semibold tracking-tight text-neutral-900">
                            {block.content}
                        </h3>
                    );
                }

                if (block.type === 'text') {
                    return (
                        <p key={block.id} className="text-base leading-7 whitespace-pre-wrap text-neutral-700">
                            {block.content}
                        </p>
                    );
                }

                if (block.type === 'image') {
                    if (!block.url) {
                        return null;
                    }

                    return (
                        <img
                            key={block.id}
                            src={block.url}
                            alt={block.content ?? 'Page image'}
                            className="h-auto w-full rounded-md border border-neutral-200 object-cover"
                        />
                    );
                }

                if (!block.url || !block.text) {
                    return null;
                }

                return (
                    <a
                        key={block.id}
                        href={block.url}
                        className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
                    >
                        {block.text}
                    </a>
                );
            })}
        </div>
    );
}

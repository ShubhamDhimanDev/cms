import { Head, Link, usePage } from '@inertiajs/react';
import CommentThread from '@/components/cms/comment-thread';
import PostBlockRenderer from '@/components/cms/post-block-renderer';
import SiteLayout from '@/layouts/site-layout';
import type { Post } from '@/types/cms';

type Props = {
    post: Post;
};

function formatDate(value: string | null): string {
    if (!value) {
        return 'Unscheduled';
    }

    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function BlogShow({ post }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    return (
        <SiteLayout title={`${post.title} | Blog`} activePage="blog">
            <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
                >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back to blog
                </Link>

                <header className="mt-8 border-b border-white/[0.08] pb-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/40">
                        <span>{formatDate(post.published_at)}</span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span>{post.author?.name ?? 'Unknown author'}</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white">{post.title}</h1>

                    {post.excerpt ? <p className="mt-4 text-lg leading-relaxed text-white/60">{post.excerpt}</p> : null}

                    <div className="mt-5 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                            <span
                                key={category.id}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>

                    {post.featured_image_url ? (
                        <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="mt-8 h-64 w-full rounded-2xl border border-white/[0.06] object-cover sm:h-80"
                        />
                    ) : null}
                </header>

                <article className="mt-10 max-w-none">
                    <PostBlockRenderer blocks={post.content} />
                </article>

                {flash?.success && (
                    <div className="mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        {flash.success}
                    </div>
                )}

                {post.comments_enabled ? (
                    <CommentThread
                        comments={post.comments ?? []}
                        postSlug={post.slug}
                        commentsRequireApproval={post.comments_require_approval}
                    />
                ) : (
                    <div className="mt-16 border-t border-white/[0.08] pt-10 text-sm text-white/40">
                        Comments are closed for this post.
                    </div>
                )}
            </main>
        </SiteLayout>
    );
}

BlogShow.layout = null;

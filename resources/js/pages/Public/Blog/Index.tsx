import { Link } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';
import type { PaginatedResponse, Post } from '@/types/cms';

type Props = {
    posts: PaginatedResponse<Post>;
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

export default function BlogIndex({ posts }: Props) {
    return (
        <SiteLayout title="Blog | Smart Move Education Group" activePage="blog">
            <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Blog</h1>
                    <p className="mt-3 text-base text-white/50">Latest updates, notes, and stories.</p>
                </div>

                {posts.data.length === 0 ? (
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center text-white/40">
                        No published posts yet.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="glass-card flex h-full flex-col rounded-2xl p-6 transition-all hover:border-white/10 hover:bg-white/[0.08]"
                            >
                                {post.featured_image_url ? (
                                    <img
                                        src={post.featured_image_url}
                                        alt={post.title}
                                        className="mb-4 h-44 w-full rounded-xl object-cover"
                                    />
                                ) : null}

                                <div className="mb-3 flex items-center justify-between gap-3 text-xs text-white/35">
                                    <span>{formatDate(post.published_at)}</span>
                                    <span>{post.author?.name ?? 'Unknown author'}</span>
                                </div>

                                <h2 className="text-lg font-semibold leading-snug text-white">{post.title}</h2>

                                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/50">
                                    {post.excerpt ?? 'Read the full post for details.'}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {post.categories.map((category) => (
                                        <span
                                            key={category.id}
                                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-5">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1 text-sm font-medium text-[#00b4e0] transition-opacity hover:opacity-75"
                                    >
                                        Read article
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-10 flex flex-wrap gap-2">
                    {posts.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                                link.active
                                    ? 'border-[#00b4e0] bg-[#00b4e0]/10 text-[#00b4e0]'
                                    : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white'
                            } ${!link.url ? 'pointer-events-none opacity-30' : ''}`}
                        >
                            {link.label.replace('&laquo; Previous', 'Previous').replace('Next &raquo;', 'Next')}
                        </Link>
                    ))}
                </div>
            </main>
        </SiteLayout>
    );
}

BlogIndex.layout = null;

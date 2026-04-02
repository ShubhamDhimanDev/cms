import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as postRoutes from '@/routes/admin/posts';
import type { PaginatedResponse, Post } from '@/types/cms';

type Props = {
    posts: PaginatedResponse<Post>;
};

function statusClass(status: Post['status']) {
    return status === 'published'
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-neutral-100 text-neutral-700';
}

export default function PostsIndex({ posts }: Props) {
    const onDelete = (post: Post) => {
        if (!window.confirm(`Delete post "${post.title}"?`)) {
            return;
        }

        router.delete(postRoutes.destroy.url({ post: post.id }));
    };

    return (
        <>
            <Head title="Posts" />

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>

                    <Link
                        href={postRoutes.create()}
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Post
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="w-full divide-y divide-neutral-200 text-sm">
                        <thead className="bg-neutral-50">
                            <tr className="text-left text-neutral-600">
                                <th className="px-4 py-3 font-medium">Title</th>
                                <th className="px-4 py-3 font-medium">Categories</th>
                                <th className="px-4 py-3 font-medium">Author</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {posts.data.map((post) => (
                                <tr key={post.id}>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-neutral-900">{post.title}</p>
                                        <p className="text-xs text-neutral-500">/{post.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {post.categories.map((category) => (
                                                <span key={category.id} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-700">{post.author?.name ?? '-'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(post.status)}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <a
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-sky-600 underline-offset-4 hover:underline"
                                            >
                                                View
                                            </a>
                                            <Link
                                                href={postRoutes.edit({ post: post.id })}
                                                className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(post)}
                                                className="text-sm font-medium text-red-600 underline-offset-4 hover:underline"
                                            >
                                                Delete
                                            </button>
                                            {(post.pending_comments_count ?? 0) > 0 && (
                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                    {post.pending_comments_count} pending
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap gap-2">
                    {posts.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={`rounded-md border px-3 py-1.5 text-sm ${
                                link.active
                                    ? 'border-neutral-900 bg-neutral-900 text-white'
                                    : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            {link.label.replace('&laquo; Previous', 'Previous').replace('Next &raquo;', 'Next')}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

PostsIndex.layout = withAdminLayout;

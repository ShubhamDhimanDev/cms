import { Head, Link, router } from '@inertiajs/react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as commentRoutes from '@/routes/admin/comments';
import type { PaginatedResponse, PostComment } from '@/types/cms';

type CommentWithPost = PostComment & {
    post: { id: number; title: string; slug: string } | null;
    email: string;
    is_approved: boolean;
};

type Props = {
    comments: PaginatedResponse<CommentWithPost>;
    pendingCount: number;
    currentStatus: string;
};

export default function CommentsIndex({ comments, pendingCount, currentStatus }: Props) {
    const onApprove = (comment: CommentWithPost) => {
        router.patch(commentRoutes.approve.url({ comment: comment.id }));
    };

    const onDelete = (comment: CommentWithPost) => {
        if (!window.confirm('Delete this comment?')) {
            return;
        }

        router.delete(commentRoutes.destroy.url({ comment: comment.id }));
    };

    const filterUrl = (status: string) => commentRoutes.index.url({ status: status === 'all' ? undefined : status });

    return (
        <>
            <Head title="Comments" />

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight">Comments</h1>
                        {pendingCount > 0 && (
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                {pendingCount} pending
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    {(['all', 'pending', 'approved'] as const).map((status) => (
                        <Link
                            key={status}
                            href={filterUrl(status)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                                currentStatus === status
                                    ? 'bg-neutral-900 text-white'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                        >
                            {status}
                        </Link>
                    ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    {comments.data.length === 0 ? (
                        <p className="px-4 py-8 text-center text-sm text-neutral-500">No comments found.</p>
                    ) : (
                        <table className="w-full divide-y divide-neutral-200 text-sm">
                            <thead className="bg-neutral-50">
                                <tr className="text-left text-neutral-600">
                                    <th className="px-4 py-3 font-medium">Author</th>
                                    <th className="px-4 py-3 font-medium">Comment</th>
                                    <th className="px-4 py-3 font-medium">Post</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {comments.data.map((comment) => (
                                    <tr key={comment.id}>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-neutral-900">{comment.name}</p>
                                            <p className="text-xs text-neutral-500">{comment.email}</p>
                                            {comment.website && (
                                                <a
                                                    href={comment.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-sky-600 hover:underline"
                                                >
                                                    {comment.website}
                                                </a>
                                            )}
                                            {comment.parent_id && (
                                                <p className="mt-0.5 text-xs text-neutral-400">Reply</p>
                                            )}
                                        </td>
                                        <td className="max-w-xs px-4 py-3 text-neutral-700">
                                            <p className="line-clamp-2">{comment.body}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            {comment.post ? (
                                                <a
                                                    href={`/blog/${comment.post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sky-600 hover:underline"
                                                >
                                                    {comment.post.title}
                                                </a>
                                            ) : (
                                                <span className="text-neutral-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {comment.is_approved ? (
                                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {!comment.is_approved && (
                                                    <button
                                                        type="button"
                                                        onClick={() => onApprove(comment)}
                                                        className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => onDelete(comment)}
                                                    className="text-sm font-medium text-red-600 underline-offset-4 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {comments.links.map((link, index) => (
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

CommentsIndex.layout = withAdminLayout;

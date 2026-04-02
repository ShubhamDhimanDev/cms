import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import * as blogCommentRoutes from '@/routes/blog/comments';
import type { PostComment } from '@/types/cms';

type CommentFormData = {
    parent_id: number | null;
    name: string;
    email: string;
    website: string;
    body: string;
};

type CommentFormProps = {
    postSlug: string;
    parentId?: number | null;
    onCancel?: () => void;
    compact?: boolean;
};

function CommentForm({ postSlug, parentId = null, onCancel, compact = false }: CommentFormProps) {
    const form = useForm<CommentFormData>({
        parent_id: parentId,
        name: '',
        email: '',
        website: '',
        body: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(blogCommentRoutes.store.url({ post: postSlug }), {
            onSuccess: () => {
                form.reset();
                onCancel?.();
            },
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            {!compact && (
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                            placeholder="Your name"
                        />
                        {form.errors.name && <p className="mt-1 text-xs text-red-400">{form.errors.name}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-white/60">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                            placeholder="your@email.com"
                        />
                        {form.errors.email && <p className="mt-1 text-xs text-red-400">{form.errors.email}</p>}
                    </div>
                </div>
            )}
            {compact && (
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                            placeholder="Your name *"
                        />
                        {form.errors.name && <p className="mt-1 text-xs text-red-400">{form.errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                            placeholder="Email *"
                        />
                        {form.errors.email && <p className="mt-1 text-xs text-red-400">{form.errors.email}</p>}
                    </div>
                </div>
            )}
            {!compact && (
                <div>
                    <label className="mb-1 block text-xs font-medium text-white/60">Website</label>
                    <input
                        type="url"
                        value={form.data.website}
                        onChange={(e) => form.setData('website', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                        placeholder="https://yourwebsite.com (optional)"
                    />
                    {form.errors.website && <p className="mt-1 text-xs text-red-400">{form.errors.website}</p>}
                </div>
            )}
            <div>
                <textarea
                    rows={compact ? 3 : 5}
                    value={form.data.body}
                    onChange={(e) => form.setData('body', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#00b4e0]/50 focus:outline-none focus:ring-1 focus:ring-[#00b4e0]/30"
                    placeholder="Write your comment…"
                />
                {form.errors.body && <p className="mt-1 text-xs text-red-400">{form.errors.body}</p>}
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-lg bg-[#00b4e0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00b4e0]/80 disabled:opacity-60"
                >
                    {form.processing ? 'Posting…' : 'Post Comment'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm text-white/40 hover:text-white/70"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

type CommentNodeProps = {
    comment: PostComment;
    postSlug: string;
    depth?: number;
};

function CommentNode({ comment, postSlug, depth = 0 }: CommentNodeProps) {
    const [replyOpen, setReplyOpen] = useState(false);

    const formattedDate = new Date(comment.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className={`${depth > 0 ? 'ml-6 border-l border-white/[0.08] pl-5' : ''}`}>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00b4e0]/20 text-sm font-semibold text-[#00b4e0]">
                        {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        {comment.website ? (
                            <a
                                href={comment.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-white hover:text-[#00b4e0]"
                            >
                                {comment.name}
                            </a>
                        ) : (
                            <span className="text-sm font-semibold text-white">{comment.name}</span>
                        )}
                        <span className="ml-2 text-xs text-white/30">{formattedDate}</span>
                    </div>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{comment.body}</p>
                <button
                    type="button"
                    onClick={() => setReplyOpen((prev) => !prev)}
                    className="mt-2 text-xs font-medium text-[#00b4e0]/70 hover:text-[#00b4e0]"
                >
                    {replyOpen ? 'Cancel reply' : 'Reply'}
                </button>
            </div>

            {replyOpen && (
                <div className="ml-6 mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <CommentForm
                        postSlug={postSlug}
                        parentId={comment.id}
                        onCancel={() => setReplyOpen(false)}
                        compact
                    />
                </div>
            )}

            {comment.replies.length > 0 && (
                <div className="mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                        <CommentNode key={reply.id} comment={reply} postSlug={postSlug} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

type CommentThreadProps = {
    comments: PostComment[];
    postSlug: string;
    commentsRequireApproval: boolean;
};

export default function CommentThread({ comments, postSlug, commentsRequireApproval }: CommentThreadProps) {
    return (
        <section className="mt-16 border-t border-white/[0.08] pt-12">
            <h2 className="mb-8 text-2xl font-bold text-white">
                {comments.length > 0 ? `${comments.length} Comment${comments.length === 1 ? '' : 's'}` : 'Leave a Comment'}
            </h2>

            {comments.length > 0 && (
                <div className="mb-10 space-y-4">
                    {comments.map((comment) => (
                        <CommentNode key={comment.id} comment={comment} postSlug={postSlug} />
                    ))}
                </div>
            )}

            {commentsRequireApproval && (
                <p className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300">
                    Comments are moderated and will appear after approval.
                </p>
            )}

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                <h3 className="mb-4 text-lg font-semibold text-white">Post a Comment</h3>
                <CommentForm postSlug={postSlug} />
            </div>
        </section>
    );
}

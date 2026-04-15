import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import MediaPickerModal from '@/components/cms/media-picker-modal';
import PostBlockEditor from '@/components/cms/post-block-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as postRoutes from '@/routes/admin/posts';
import type { Category, Post, PostBlock } from '@/types/cms';

type Props = {
    post: Post;
    categories: Category[];
};

type FormData = {
    title: string;
    slug: string;
    excerpt: string;
    keywords: string;
    content: PostBlock[];
    status: 'draft' | 'published';
    published_at: string;
    category_ids: number[];
    featured_image: File | null;
    featured_image_url: string;
    comments_enabled: boolean;
    comments_require_approval: boolean;
    _method?: 'put';
};

function toDateTimeLocal(value: string | null): string {
    if (!value) {
        return '';
    }

    return value.slice(0, 16);
}

export default function EditPost({ post, categories }: Props) {
    const form = useForm<FormData>({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        keywords: post.keywords ?? '',
        content: Array.isArray(post.content) ? post.content : [],
        status: post.status,
        published_at: toDateTimeLocal(post.published_at),
        category_ids: post.categories.map((category) => category.id),
        featured_image: null,
        featured_image_url: '',
        comments_enabled: post.comments_enabled ?? true,
        comments_require_approval: post.comments_require_approval ?? true,
    });
    const [slugTouched, setSlugTouched] = useState(Boolean(post.slug));
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const previewUrl = useMemo(() => {
        if (form.data.featured_image) {
            return URL.createObjectURL(form.data.featured_image);
        }

        return form.data.featured_image_url || post.featured_image_url;
    }, [form.data.featured_image, form.data.featured_image_url, post.featured_image_url]);

    const toggleCategory = (categoryId: number, checked: boolean) => {
        form.setData(
            'category_ids',
            checked
                ? [...form.data.category_ids, categoryId]
                : form.data.category_ids.filter((id) => id !== categoryId),
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            _method: 'put',
            published_at: data.status === 'published' && data.published_at ? data.published_at : null,
            // Only send one: file upload takes priority over URL
            featured_image_url: data.featured_image ? '' : data.featured_image_url,
        }));

        form.post(postRoutes.update.url({ post: post.id }), {
            forceFormData: true,
            onSuccess: () => {
                form.setData('featured_image', null);
                form.setData('featured_image_url', '');
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${post.title}`} />

            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>

                <form onSubmit={submit} className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={(event) => form.setData('title', event.target.value)}
                            onBlur={() => {
                                if (!slugTouched && !form.data.slug.trim()) {
                                    form.setData(
                                        'slug',
                                        form.data.title
                                            .toLowerCase()
                                            .trim()
                                            .replace(/[^a-z0-9\s-]/g, '')
                                            .replace(/\s+/g, '-')
                                            .replace(/-+/g, '-'),
                                    );
                                }
                            }}
                        />
                        <InputError message={form.errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={form.data.slug}
                            onChange={(event) => {
                                setSlugTouched(true);
                                form.setData('slug', event.target.value);
                            }}
                        />
                        <InputError message={form.errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <textarea
                            id="excerpt"
                            rows={3}
                            value={form.data.excerpt}
                            onChange={(event) => form.setData('excerpt', event.target.value)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <InputError message={form.errors.excerpt} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="keywords">SEO Keywords</Label>
                        <textarea
                            id="keywords"
                            rows={2}
                            placeholder="Separate keywords with commas"
                            value={form.data.keywords}
                            onChange={(event) => form.setData('keywords', event.target.value)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <InputError message={form.errors.keywords} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Content</Label>
                        <div className="rounded-lg border border-neutral-200 bg-white p-4">
                            <PostBlockEditor
                                blocks={form.data.content}
                                onChange={(blocks) => form.setData('content', blocks)}
                            />
                        </div>
                        <InputError message={form.errors.content} />
                    </div>

                    <div className="grid gap-2 md:grid-cols-2 md:items-start md:gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={form.data.status}
                                onChange={(event) => form.setData('status', event.target.value as FormData['status'])}
                                className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <InputError message={form.errors.status} />
                        </div>

                        {form.data.status === 'published' ? (
                            <div className="grid gap-2">
                                <Label htmlFor="published_at">Published At</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={form.data.published_at}
                                    onChange={(event) => form.setData('published_at', event.target.value)}
                                />
                                <InputError message={form.errors.published_at} />
                            </div>
                        ) : null}
                    </div>

                    <div className="grid gap-2">
                        <Label>Categories</Label>
                        <div className="grid gap-2 rounded-lg border border-neutral-200 p-3 sm:grid-cols-2">
                            {categories.map((category) => (
                                <label key={category.id} className="flex items-center gap-2 text-sm text-neutral-700">
                                    <input
                                        type="checkbox"
                                        checked={form.data.category_ids.includes(category.id)}
                                        onChange={(event) => toggleCategory(category.id, event.target.checked)}
                                        className="h-4 w-4 rounded border-neutral-300"
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                        <InputError message={form.errors.category_ids} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="featured_image">Featured Image</Label>

                        <div className="flex flex-wrap items-center gap-2">
                            <Input
                                id="featured_image"
                                type="file"
                                accept="image/*"
                                className="flex-1"
                                onChange={(event) => {
                                    form.setData('featured_image', event.target.files?.[0] ?? null);
                                    form.setData('featured_image_url', '');
                                }}
                            />
                            <Button type="button" variant="outline" onClick={() => setMediaPickerOpen(true)}>
                                Choose from media
                            </Button>
                        </div>

                        {previewUrl ? (
                            <img src={previewUrl} alt="Featured image preview" className="mt-2 h-44 w-full rounded-lg border border-neutral-200 object-cover" />
                        ) : null}

                        <InputError message={form.errors.featured_image} />
                        <InputError message={(form.errors as Record<string, string>).featured_image_url} />
                    </div>

                    <MediaPickerModal
                        open={mediaPickerOpen}
                        onClose={() => setMediaPickerOpen(false)}
                        onSelect={(url) => {
                            form.setData('featured_image_url', url);
                            form.setData('featured_image', null);
                        }}
                    />

                    <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                        <p className="text-sm font-medium text-neutral-700">Comment Settings</p>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
                            <input
                                type="checkbox"
                                checked={form.data.comments_enabled}
                                onChange={(e) => form.setData('comments_enabled', e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300"
                            />
                            Allow comments on this post
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
                            <input
                                type="checkbox"
                                checked={form.data.comments_require_approval}
                                onChange={(e) => form.setData('comments_require_approval', e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300"
                            />
                            Comments require approval before appearing
                        </label>
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        Update Post
                    </Button>
                </form>
            </div>
        </>
    );
}

EditPost.layout = withAdminLayout;

import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import PageBuilderEditor from '@/components/cms/page-builder-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as pageRoutes from '@/routes/admin/pages';
import type { PageBuilderBlock } from '@/types/cms';

function blocksToFallbackContent(blocks: PageBuilderBlock[]): string {
    return blocks
        .map((block) => {
            if (block.type === 'heading' || block.type === 'text') {
                return block.content.trim();
            }

            if (block.type === 'button') {
                return block.text.trim();
            }

            return '';
        })
        .filter(Boolean)
        .join('\n\n');
}

type FormData = {
    title: string;
    slug: string;
    content: string;
    builder_data: PageBuilderBlock[];
    meta_title: string;
    meta_description: string;
    status: 'draft' | 'published';
    published_at: string;
    featured_image: File | null;
};

export default function CreatePage() {
    const form = useForm<FormData>({
        title: '',
        slug: '',
        content: '',
        builder_data: [],
        meta_title: '',
        meta_description: '',
        status: 'draft',
        published_at: '',
        featured_image: null,
    });
    const [slugTouched, setSlugTouched] = useState(false);

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            content: data.content.trim() || blocksToFallbackContent(data.builder_data),
            published_at: data.status === 'published' && data.published_at ? data.published_at : null,
        }));

        form.post(pageRoutes.store.url(), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create Page" />

            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">Create Page</h1>

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
                        <Label htmlFor="content">Content</Label>
                        <textarea
                            id="content"
                            rows={10}
                            value={form.data.content}
                            onChange={(event) => form.setData('content', event.target.value)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <InputError message={form.errors.content} />
                    </div>

                    <PageBuilderEditor
                        blocks={form.data.builder_data}
                        onChange={(blocks) => form.setData('builder_data', blocks)}
                    />
                    <InputError message={form.errors.builder_data} />

                    <div className="grid gap-2">
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <Input
                            id="meta_title"
                            value={form.data.meta_title}
                            onChange={(event) => form.setData('meta_title', event.target.value)}
                        />
                        <InputError message={form.errors.meta_title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <textarea
                            id="meta_description"
                            rows={3}
                            value={form.data.meta_description}
                            onChange={(event) => form.setData('meta_description', event.target.value)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <InputError message={form.errors.meta_description} />
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
                        <Label htmlFor="featured_image">Featured Image</Label>
                        <Input
                            id="featured_image"
                            type="file"
                            accept="image/*"
                            onChange={(event) => form.setData('featured_image', event.target.files?.[0] ?? null)}
                        />
                        <InputError message={form.errors.featured_image} />
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        Save Page
                    </Button>
                </form>
            </div>
        </>
    );
}

CreatePage.layout = withAdminLayout;

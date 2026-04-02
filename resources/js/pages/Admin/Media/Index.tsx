import { Head, Link, useForm, router } from '@inertiajs/react';
import { Copy, UploadCloud } from 'lucide-react';
import type { DragEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as mediaRoutes from '@/routes/admin/media';
import type { MediaItem, PaginatedResponse } from '@/types/cms';

type Props = {
    media: PaginatedResponse<MediaItem>;
};

type UploadFormData = {
    file: File | null;
};

function humanSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/');
}

export default function MediaIndex({ media }: Props) {
    const uploadForm = useForm<UploadFormData>({
        file: null,
    });
    const [, copyToClipboard] = useClipboard();
    const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

    const submitUpload = () => {
        if (!uploadForm.data.file) {
            return;
        }

        uploadForm.post(mediaRoutes.upload.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => uploadForm.reset('file'),
        });
    };

    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];

        if (!file) {
            return;
        }

        uploadForm.setData('file', file);
    };

    const deleteMedia = (item: MediaItem) => {
        if (!window.confirm(`Delete media "${item.file_name}"?`)) {
            return;
        }

        router.delete(mediaRoutes.destroy.url({ medium: item.id }), {
            preserveScroll: true,
        });
    };

    const copyUrl = async (url: string) => {
        const didCopy = await copyToClipboard(url);

        if (!didCopy) {
            return;
        }

        setCopiedMessage('Copied!');
        window.setTimeout(() => setCopiedMessage(null), 1200);
    };

    return (
        <>
            <Head title="Media" />

            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
                </div>

                <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                    <Label
                        htmlFor="media-upload"
                        onDrop={onDrop}
                        onDragOver={(event) => event.preventDefault()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 px-4 py-8 text-center"
                    >
                        <UploadCloud className="mb-2 h-6 w-6 text-neutral-500" />
                        <span className="text-sm font-medium text-neutral-700">
                            Drag and drop a file here, or click to choose
                        </span>
                        <span className="mt-1 text-xs text-neutral-500">
                            Supports images, PDFs, and SVGs (up to 10 MB)
                        </span>
                    </Label>
                    <Input
                        id="media-upload"
                        type="file"
                        className="hidden"
                        onChange={(event) => uploadForm.setData('file', event.target.files?.[0] ?? null)}
                    />

                    <div className="mt-3 flex items-center gap-3">
                        <Button type="button" disabled={!uploadForm.data.file || uploadForm.processing} onClick={submitUpload}>
                            Upload File
                        </Button>
                        {uploadForm.data.file ? (
                            <span className="text-sm text-neutral-600">{uploadForm.data.file.name}</span>
                        ) : null}
                    </div>
                </section>

                {copiedMessage ? (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                        {copiedMessage}
                    </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {media.data.map((item) => (
                        <article key={item.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                            <div className="aspect-square bg-neutral-100">
                                {isImage(item.mime_type) ? (
                                    <img src={item.url} alt={item.file_name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full items-center justify-center px-3 text-center text-xs text-neutral-500">
                                        {item.mime_type}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 p-3 text-sm">
                                <p className="truncate font-medium text-neutral-900">{item.file_name}</p>
                                <p className="text-xs text-neutral-600">{humanSize(item.size)}</p>
                                <p className="truncate text-xs text-neutral-500">{item.mime_type}</p>

                                <div className="flex items-center gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => copyUrl(item.url)}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 underline-offset-4 hover:underline"
                                    >
                                        <Copy className="h-3.5 w-3.5" />
                                        Copy URL
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => deleteMedia(item)}
                                        className="text-xs font-medium text-red-600 underline-offset-4 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    {media.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? '#'}
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

MediaIndex.layout = withAdminLayout;

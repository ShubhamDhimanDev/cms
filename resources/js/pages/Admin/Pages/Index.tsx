import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as pageRoutes from '@/routes/admin/pages';
import type { Page, PaginatedResponse } from '@/types/cms';

type Props = {
    pages: PaginatedResponse<Page>;
};

function statusClass(status: Page['status']) {
    return status === 'published'
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-neutral-100 text-neutral-700';
}

function formatDate(value: string | null) {
    return value ? new Date(value).toLocaleString() : '-';
}

export default function PagesIndex({ pages }: Props) {
    const onDelete = (page: Page) => {
        if (!window.confirm(`Delete page "${page.title}"?`)) {
            return;
        }

        router.delete(pageRoutes.destroy.url({ page: page.id }));
    };

    return (
        <>
            <Head title="Pages" />

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight">Pages</h1>

                    <button
                        type="button"
                        onClick={() => router.post(pageRoutes.builderCreate.url())}
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Page
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="w-full divide-y divide-neutral-200 text-sm">
                        <thead className="bg-neutral-50">
                            <tr className="text-left text-neutral-600">
                                <th className="px-4 py-3 font-medium">Title</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Published At</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {pages.data.map((page) => (
                                <tr key={page.id}>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-neutral-900">{page.title}</p>
                                        <p className="text-xs text-neutral-500">/{page.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(page.status)}`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-700">{formatDate(page.published_at)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={pageRoutes.builder({ page: page.id })}
                                                className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(page)}
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
                </div>

                <div className="flex flex-wrap gap-2">
                    {pages.links.map((link, index) => (
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

PagesIndex.layout = withAdminLayout;

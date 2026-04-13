import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as eventRoutes from '@/routes/admin/events';
import * as eventRegistrantRoutes from '@/routes/admin/events/registrants';
import type { PaginatedResponse, EventRegistrant } from '@/types/cms';

type EventData = {
    id: number;
    title: string;
    starts_at: string;
    status: string;
    max_registrants: number | null;
};

type Props = {
    event: EventData;
    registrants: PaginatedResponse<EventRegistrant>;
};

function statusClass(status: EventRegistrant['status']) {
    switch (status) {
        case 'confirmed':
            return 'bg-emerald-100 text-emerald-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-neutral-100 text-neutral-700';
    }
}

export default function EventRegistrants({ event, registrants }: Props) {
    const handleDelete = (registrant: EventRegistrant) => {
        if (!window.confirm(`Delete registration for "${registrant.name}"?`)) {
            return;
        }

        router.delete(
            eventRegistrantRoutes.destroy.url({
                event: event.id,
                registrant: registrant.id,
            })
        );
    };

    return (
        <>
            <Head title={`Registrants: ${event.title}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link
                        href={eventRoutes.index()}
                        className="rounded-lg p-2 hover:bg-neutral-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Event Registrants</h1>
                        <p className="text-sm text-neutral-600">{event.title}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">Total Registrations</p>
                        <p className="mt-1 text-3xl font-bold text-neutral-900">
                            {registrants.total}
                            {event.max_registrants && <span className="text-lg text-neutral-600"> / {event.max_registrants}</span>}
                        </p>
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">Confirmed</p>
                        <p className="mt-1 text-3xl font-bold text-emerald-600">
                            {registrants.data.filter((r) => r.status === 'confirmed').length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">Cancelled</p>
                        <p className="mt-1 text-3xl font-bold text-red-600">
                            {registrants.data.filter((r) => r.status === 'cancelled').length}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="w-full divide-y divide-neutral-200 text-sm">
                        <thead className="bg-neutral-50">
                            <tr className="text-left text-neutral-600">
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Notes</th>
                                <th className="px-4 py-3 font-medium">Registered On</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {registrants.data.map((registrant) => (
                                <tr key={registrant.id}>
                                    <td className="px-4 py-3 font-medium text-neutral-900">{registrant.name}</td>
                                    <td className="px-4 py-3">
                                        <a href={`mailto:${registrant.email}`} className="text-sky-600 hover:underline">
                                            {registrant.email}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-700">{registrant.phone || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(registrant.status)}`}>
                                            {registrant.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 max-w-xs truncate text-neutral-700">
                                        {registrant.notes ? (
                                            <span title={registrant.notes}>{registrant.notes}</span>
                                        ) : (
                                            <span className="text-neutral-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-700">
                                        {new Date(registrant.created_at).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(registrant)}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {registrants.data.length === 0 && (
                        <div className="px-4 py-8 text-center">
                            <p className="text-neutral-600">No registrations yet</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {registrants.links.length > 2 && (
                    <div className="flex flex-wrap gap-2">
                        {registrants.links.map((link, index) => (
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
                )}
            </div>
        </>
    );
}

EventRegistrants.layout = withAdminLayout;

import { Head, Link, router } from '@inertiajs/react';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as eventRoutes from '@/routes/admin/events';
import * as eventRegistrantRoutes from '@/routes/admin/events/registrants';
import type { PaginatedResponse, Event } from '@/types/cms';

type Props = {
    events: PaginatedResponse<Event>;
};

function statusClass(status: Event['status']) {
    switch (status) {
        case 'published':
            return 'bg-emerald-100 text-emerald-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-neutral-100 text-neutral-700';
    }
}

function typeClass(type: Event['type']) {
    return type === 'online'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-purple-100 text-purple-700';
}

function formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function EventsIndex({ events }: Props) {
    const onDelete = (event: Event) => {
        if (!window.confirm(`Delete event "${event.title}"?`)) {
            return;
        }

        router.delete(eventRoutes.destroy.url({ event: event.id }));
    };

    return (
        <>
            <Head title="Events" />

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight">Events</h1>

                    <Link
                        href={eventRoutes.create()}
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Event
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="w-full divide-y divide-neutral-200 text-sm">
                        <thead className="bg-neutral-50">
                            <tr className="text-left text-neutral-600">
                                <th className="px-4 py-3 font-medium">Event</th>
                                <th className="px-4 py-3 font-medium">Type</th>
                                <th className="px-4 py-3 font-medium">Date & Time</th>
                                <th className="px-4 py-3 font-medium">Registrants</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {events.data.map((event) => (
                                <tr key={event.id}>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-neutral-900">{event.title}</p>
                                        <p className="text-xs text-neutral-500">/{event.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${typeClass(event.type)}`}>
                                            {event.type === 'online' ? <Calendar className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                                            {event.type === 'online' ? 'Online' : 'In-Person'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-700">
                                        {formatDate(event.starts_at)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-neutral-500" />
                                            <span>{event.confirmed_registrants_count ?? 0}</span>
                                            {event.max_registrants && (
                                                <span className="text-neutral-500">/ {event.max_registrants}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={eventRegistrantRoutes.index.url({ event: event.id })}
                                                className="text-sm font-medium text-sky-600 underline-offset-4 hover:underline"
                                            >
                                                Registrants
                                            </Link>
                                            <Link
                                                href={eventRoutes.edit({ event: event.id })}
                                                className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(event)}
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
                    {events.links.map((link, index) => (
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

EventsIndex.layout = withAdminLayout;

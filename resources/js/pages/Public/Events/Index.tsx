import { Link, router } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';
import type { Event, PaginatedResponse } from '@/types/cms';
import * as eventRoutes from '@/routes/events';

type FilterValue = 'upcoming' | 'past' | 'all';

type Props = {
    events: PaginatedResponse<Event>;
    filter: FilterValue;
};

function formatDate(dateString: string, timezone: string): string {
    return new Date(dateString).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
    });
}

function typeBadgeClass(type: Event['type']): string {
    return type === 'online'
        ? 'border-[#bcc2ff]/30 bg-[#bcc2ff]/10 text-[#bcc2ff]'
        : 'border-[#50ddb8]/30 bg-[#50ddb8]/10 text-[#50ddb8]';
}

export default function EventsIndex({ events, filter }: Props) {
    const filters: { value: FilterValue; label: string }[] = [
        { value: 'upcoming', label: 'Upcoming Events' },
        { value: 'past', label: 'Past Events' },
        { value: 'all', label: 'All' },
    ];

    function setFilter(value: FilterValue) {
        router.get(eventRoutes.index.url(), value === 'upcoming' ? {} : { filter: value }, {
            preserveScroll: false,
            replace: true,
        });
    }

    return (
        <SiteLayout title="Events | Smart Move Education Group" activePage="events">
            <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                <header className="mb-10 reveal visible">
                    <p className="font-label text-secondary-container mb-3 text-xs font-bold uppercase tracking-[0.2em]">WHAT'S ON</p>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Events</h1>
                    <p className="mt-3 max-w-2xl text-base text-white/50">
                        Join our information sessions, open days, and student support workshops.
                    </p>
                </header>

                {/* Filter tabs */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                                filter === f.value
                                    ? 'border-[#00b4e0] bg-[#00b4e0]/15 text-[#00b4e0]'
                                    : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {events.data.length === 0 ? (
                    <div className="glass-card rounded-2xl p-10 text-center text-white/50">
                        {filter === 'past' ? 'No past events found.' : filter === 'upcoming' ? 'No upcoming events at the moment. Please check back soon.' : 'No events found.'}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.data.map((event, index) => (
                            <article
                                key={event.id}
                                className={`group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all hover:border-white/15 hover:bg-white/[0.05] reveal ${index > 0 ? 'reveal-d1 visible' : 'visible'}`}
                            >
                                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-3">
                                        <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${typeBadgeClass(event.type)}`}>
                                            {event.type === 'online' ? 'Online' : 'In-Person'}
                                        </span>

                                        <h2 className="text-xl font-bold text-white md:text-2xl">{event.title}</h2>

                                        {event.excerpt && (
                                            <p className="max-w-2xl text-sm leading-relaxed text-white/55">{event.excerpt}</p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/45">
                                            <span className="inline-flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                {formatDate(event.starts_at, event.timezone)}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {event.type === 'online' ? 'videocam' : 'location_on'}
                                                </span>
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="shrink-0">
                                        <Link
                                            href={eventRoutes.show.url({ event: event.slug })}
                                            className="inline-flex items-center gap-2 rounded-full border border-secondary-container/40 px-5 py-2.5 text-sm font-bold text-white transition hover:border-secondary-container hover:text-secondary-container"
                                        >
                                            View & Register
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-10 flex flex-wrap gap-2">
                    {events.links.map((link, index) => (
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

EventsIndex.layout = null;

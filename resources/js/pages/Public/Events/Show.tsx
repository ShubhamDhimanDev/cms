import { Head, Link, useForm, usePage } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';
import type { Event } from '@/types/cms';
import * as eventRoutes from '@/routes/events';

type PublicEvent = Event & {
    confirmed_registrants_count: number;
    is_full: boolean;
    is_registration_open: boolean;
};

type Props = {
    event: PublicEvent;
};

type FlashProps = {
    flash?: {
        success?: string;
    };
};

function formatDateTime(dateString: string, timezone: string): string {
    return new Date(dateString).toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
    });
}

export default function EventShow({ event }: Props) {
    const { flash } = usePage<FlashProps>().props;
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(eventRoutes.register.url({ event: event.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'email', 'phone', 'notes');
            },
        });
    };

    return (
        <SiteLayout title={`${event.title} | Events`} activePage="events">
            <Head title={`${event.title} | Events`} />

            <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                <Link
                    href={eventRoutes.index.url()}
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
                >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back to events
                </Link>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                    event.type === 'online'
                                        ? 'border-[#bcc2ff]/30 bg-[#bcc2ff]/10 text-[#bcc2ff]'
                                        : 'border-[#50ddb8]/30 bg-[#50ddb8]/10 text-[#50ddb8]'
                                }`}
                            >
                                {event.type === 'online' ? 'Online' : 'In-Person'}
                            </span>

                            {event.is_full && (
                                <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-300">
                                    Fully booked
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{event.title}</h1>

                        {event.excerpt && (
                            <p className="mt-4 text-base leading-relaxed text-white/60">{event.excerpt}</p>
                        )}

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="glass-card rounded-xl p-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Date & Time</p>
                                <p className="mt-2 text-sm text-white">{formatDateTime(event.starts_at, event.timezone)}</p>
                                {event.ends_at && (
                                    <p className="mt-1 text-xs text-white/50">Ends: {formatDateTime(event.ends_at, event.timezone)}</p>
                                )}
                            </div>

                            <div className="glass-card rounded-xl p-4">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Location</p>
                                <p className="mt-2 text-sm text-white">{event.location}</p>
                                {event.type === 'online' && (
                                    <p className="mt-2 text-xs text-white/50">
                                        Joining link will be shared via email after registration.
                                    </p>
                                )}
                            </div>

                            <div className="glass-card rounded-xl p-4 sm:col-span-2">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Registrations</p>
                                <p className="mt-2 text-sm text-white">
                                    {event.confirmed_registrants_count}
                                    {event.max_registrants ? ` / ${event.max_registrants}` : ''} confirmed
                                </p>
                                {event.registration_ends_at && (
                                    <p className="mt-1 text-xs text-white/50">
                                        Registration closes: {formatDateTime(event.registration_ends_at, event.timezone)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-white">Register for this event</h2>
                        <p className="mt-2 text-sm text-white/50">Fill in your details and we will send confirmation to your email.</p>

                        {flash?.success && (
                            <div className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                                <p className="font-semibold text-emerald-200">Thank you for registering.</p>
                                <p className="mt-1">{flash.success}</p>
                            </div>
                        )}

                        {errors.event && (
                            <div className="mt-5 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {errors.event}
                            </div>
                        )}

                        {!event.is_registration_open && !event.is_full && (
                            <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                                Registration for this event is closed.
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/70">Full Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-secondary-container focus:outline-none"
                                    placeholder="Your name"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/70">Email *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-secondary-container focus:outline-none"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/70">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-secondary-container focus:outline-none"
                                    placeholder="Optional"
                                />
                                {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/70">Notes</label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-secondary-container focus:outline-none"
                                    placeholder="Anything you'd like us to know"
                                />
                                {errors.notes && <p className="mt-1 text-xs text-red-300">{errors.notes}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || event.is_full || !event.is_registration_open}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary-container px-5 py-3 text-sm font-bold text-on-secondary transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing
                                    ? 'Submitting...'
                                    : event.is_full
                                      ? 'Event is fully booked'
                                      : !event.is_registration_open
                                        ? 'Registration closed'
                                        : 'Submit'}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </SiteLayout>
    );
}

EventShow.layout = null;

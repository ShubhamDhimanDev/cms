import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as eventRoutes from '@/routes/admin/events';
import { useState } from 'react';

const timezoneOptions = [
    'Europe/London',
    'UTC',
    'GMT',
    'Europe/Belfast',
    'Europe/Dublin',
    'Europe/Guernsey',
    'Europe/Isle_of_Man',
    'Europe/Jersey',
    'Europe/Lisbon',
    'Europe/Paris',
    'Europe/Berlin',
    'Atlantic/Reykjavik',
    'America/New_York',
    'America/Chicago',
    'America/Los_Angeles',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Singapore',
    'Asia/Kuala_Lumpur',
    'Australia/Sydney',
] as const;

export default function CreateEvent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        type: 'online',
        starts_at: '',
        ends_at: '',
        registration_ends_at: '',
        timezone: 'Europe/London',
        location: '',
        location_url: '',
        status: 'draft',
        max_registrants: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        post(eventRoutes.store(), {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const inputClass = (fieldName: keyof typeof errors) =>
        `w-full rounded-lg border px-3 py-2 text-sm ${
            errors[fieldName]
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900'
        }`;

    const dateTimeInputClass = (fieldName: keyof typeof errors) =>
        `${inputClass(fieldName)} [color-scheme:light] [&&::-webkit-calendar-picker-indicator]:cursor-pointer [&&::-webkit-calendar-picker-indicator]:opacity-100`;

    return (
        <>
            <Head title="Create Event" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link
                        href={eventRoutes.index()}
                        className="rounded-lg p-2 hover:bg-neutral-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">Create Event</h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-neutral-900">Basic Information</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={inputClass('title')}
                                placeholder="e.g., Open Information Session"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className={inputClass('slug')}
                                placeholder="Auto-generated from title"
                            />
                            {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Excerpt
                            </label>
                            <textarea
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className={inputClass('excerpt')}
                                placeholder="Brief description of the event"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Event Type & Location */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-neutral-900">Event Details</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Type *
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value as 'online' | 'in_person')}
                                className={inputClass('type')}
                            >
                                <option value="online">Online</option>
                                <option value="in_person">In-Person</option>
                            </select>
                            {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Location *
                            </label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={inputClass('location')}
                                placeholder={data.type === 'online' ? 'Zoom Webinar' : 'London Campus'}
                            />
                            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Location URL
                            </label>
                            <input
                                type="url"
                                value={data.location_url}
                                onChange={(e) => setData('location_url', e.target.value)}
                                className={inputClass('location_url')}
                                placeholder="e.g., https://zoom.us/j/..."
                            />
                            {errors.location_url && <p className="mt-1 text-xs text-red-600">{errors.location_url}</p>}
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-neutral-900">Date & Time</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Starts At *
                            </label>
                            <input
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(e) => setData('starts_at', e.target.value)}
                                className={dateTimeInputClass('starts_at')}
                            />
                            {errors.starts_at && <p className="mt-1 text-xs text-red-600">{errors.starts_at}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Ends At
                            </label>
                            <input
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(e) => setData('ends_at', e.target.value)}
                                className={dateTimeInputClass('ends_at')}
                            />
                            {errors.ends_at && <p className="mt-1 text-xs text-red-600">{errors.ends_at}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Registration Ends At
                            </label>
                            <input
                                type="datetime-local"
                                value={data.registration_ends_at}
                                onChange={(e) => setData('registration_ends_at', e.target.value)}
                                className={dateTimeInputClass('registration_ends_at')}
                            />
                            <p className="mt-1 text-xs text-neutral-500">Optional. Leave empty to keep registration open until event start time.</p>
                            {errors.registration_ends_at && <p className="mt-1 text-xs text-red-600">{errors.registration_ends_at}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Timezone
                            </label>
                            <select
                                value={data.timezone}
                                onChange={(e) => setData('timezone', e.target.value)}
                                className={inputClass('timezone')}
                            >
                                {timezoneOptions.map((timezone) => (
                                    <option key={timezone} value={timezone}>
                                        {timezone}
                                    </option>
                                ))}
                            </select>
                            {errors.timezone && <p className="mt-1 text-xs text-red-600">{errors.timezone}</p>}
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-neutral-900">Registration</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Max Registrants
                            </label>
                            <input
                                type="number"
                                value={data.max_registrants}
                                onChange={(e) => setData('max_registrants', e.target.value)}
                                className={inputClass('max_registrants')}
                                placeholder="Leave empty for unlimited"
                                min="1"
                            />
                            {errors.max_registrants && <p className="mt-1 text-xs text-red-600">{errors.max_registrants}</p>}
                        </div>
                    </div>

                    {/* Publishing */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-neutral-900">Publishing</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Status *
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as any)}
                                className={inputClass('status')}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 border-t border-neutral-200 pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Event'}
                        </button>
                        <Link
                            href={eventRoutes.index()}
                            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateEvent.layout = withAdminLayout;

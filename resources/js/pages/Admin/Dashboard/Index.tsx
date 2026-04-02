import { Head } from '@inertiajs/react';
import { FileText, Image, Newspaper } from 'lucide-react';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';

type DashboardProps = {
    totalPages: number;
    totalPosts: number;
    totalMedia: number;
};

export default function AdminDashboard({ totalPages, totalPosts, totalMedia }: DashboardProps) {
    const stats = [
        { label: 'Total Pages', value: totalPages, icon: FileText },
        { label: 'Total Posts', value: totalPosts, icon: Newspaper },
        { label: 'Total Media', value: totalMedia, icon: Image },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat) => (
                        <section key={stat.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                                <stat.icon className="h-4 w-4 text-neutral-500" />
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-neutral-900">{stat.value}</p>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = withAdminLayout;

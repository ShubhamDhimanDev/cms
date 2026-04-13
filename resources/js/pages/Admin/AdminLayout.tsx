import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FileText, Newspaper, Tags, Image, MessageSquare, Calendar } from 'lucide-react';
import type { ReactNode } from 'react';
import admin from '@/routes/admin';

type SharedProps = {
    flash?: {
        success?: string;
    };
};

type NavItem = {
    label: string;
    href: string;
    icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
    { label: 'Dashboard', href: admin.dashboard.url(), icon: LayoutDashboard },
    { label: 'Pages', href: admin.pages.index.url(), icon: FileText },
    { label: 'Posts', href: admin.posts.index.url(), icon: Newspaper },
    { label: 'Events', href: admin.events.index.url(), icon: Calendar },
    { label: 'Categories', href: admin.categories.index.url(), icon: Tags },
    { label: 'Media', href: admin.media.index.url(), icon: Image },
    { label: 'Comments', href: admin.comments.index.url(), icon: MessageSquare },
];

export function withAdminLayout({ children }: { children: ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const page = usePage<SharedProps>();
    const currentPath = page.url.split('?')[0].replace(/\/$/, '') || '/';

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
                <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm lg:flex lg:flex-col">
                    <p className="px-2 text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                        CMS Admin
                    </p>

                    <nav className="mt-4 flex flex-1 flex-col gap-1">
                        {navItems.map((item) => {
                            const itemPath = item.href.replace(/\/$/, '') || '/';
                            const isDashboard = item.label === 'Dashboard';
                            const isActive = isDashboard
                                ? currentPath === itemPath
                                : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-neutral-900 text-white'
                                            : 'text-neutral-700 hover:bg-neutral-100'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <main className="min-w-0 flex-1">
                    {page.props.flash?.success ? (
                        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {page.props.flash.success}
                        </div>
                    ) : null}

                    {children}
                </main>
            </div>
        </div>
    );
}

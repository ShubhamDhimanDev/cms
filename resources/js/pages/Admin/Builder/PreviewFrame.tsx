import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useMemo, useState } from 'react';
import PageRenderer from '@/components/Builder/PageRenderer';
import * as pageRoutes from '@/routes/admin/pages';
import type { BuilderLayout } from '@/types/builder';

type Device = 'desktop' | 'tablet' | 'mobile';

type Props = {
    page: {
        id: number;
        title: string;
    };
    layout: BuilderLayout | null;
};

export default function PreviewFrame({ page, layout }: Props) {
    const [device, setDevice] = useState<Device>('desktop');

    const maxWidth = useMemo(() => {
        if (device === 'tablet') {
            return '768px';
        }

        if (device === 'mobile') {
            return '375px';
        }

        return '100%';
    }, [device]);

    const safeLayout = layout ?? { sections: [] };

    return (
        <>
            <Head title={`Preview - ${page.title}`} />

            <div className="min-h-screen bg-neutral-100 text-neutral-900">
                <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            href={pageRoutes.builder.url({ page: page.id })}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Editor
                        </Link>

                        <p className="truncate text-sm font-semibold">{page.title}</p>
                    </div>

                    <div className="flex items-center gap-1 rounded-md border border-neutral-200 p-1">
                        <button
                            type="button"
                            onClick={() => setDevice('desktop')}
                            className={`rounded px-2 py-1 text-xs font-medium ${
                                device === 'desktop' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                            }`}
                        >
                            <span className="inline-flex items-center gap-1">
                                <Monitor className="h-3.5 w-3.5" />
                                Desktop
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setDevice('tablet')}
                            className={`rounded px-2 py-1 text-xs font-medium ${
                                device === 'tablet' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                            }`}
                        >
                            <span className="inline-flex items-center gap-1">
                                <Tablet className="h-3.5 w-3.5" />
                                Tablet
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setDevice('mobile')}
                            className={`rounded px-2 py-1 text-xs font-medium ${
                                device === 'mobile' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                            }`}
                        >
                            <span className="inline-flex items-center gap-1">
                                <Smartphone className="h-3.5 w-3.5" />
                                Mobile
                            </span>
                        </button>
                    </div>
                </header>

                <div className="px-4 pt-20 pb-8">
                    <div className="mx-auto rounded-lg border border-neutral-200 bg-white shadow-sm" style={{ maxWidth }}>
                        <PageRenderer layout={safeLayout} isBuilder={false} />
                    </div>
                </div>
            </div>
        </>
    );
}

PreviewFrame.layout = null;

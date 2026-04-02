import { Head } from '@inertiajs/react';
import PageRenderer from '@/components/Builder/PageRenderer';
import type { BuilderLayout } from '@/types/builder';

type Props = {
    page: {
        id: number;
        title: string;
        slug: string;
        meta_title: string | null;
        meta_description: string | null;
    };
    layout: BuilderLayout | null;
};

export default function PageView({ page, layout }: Props) {
    const safeLayout = layout ?? { sections: [] };

    return (
        <>
            <Head>
                <title>{page.meta_title ?? page.title}</title>
                <meta name="description" content={page.meta_description ?? ''} />
            </Head>

            <main className="min-h-screen bg-white">
                <PageRenderer layout={safeLayout} isBuilder={false} />
            </main>
        </>
    );
}

PageView.layout = null;

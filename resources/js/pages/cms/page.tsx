import { Head } from '@inertiajs/react';
import PageBlockRenderer from '@/components/cms/page-block-renderer';
import type { Page as CmsPage } from '@/types/cms';

interface CmsPageProps {
    page: CmsPage;
}

export default function CmsPageShow({ page }: CmsPageProps) {
    const blocks = page.builder_data ?? [];

    return (
        <>
            <Head>
                <title>{page.meta_title ?? page.title}</title>
                {page.meta_description ? (
                    <meta name="description" content={page.meta_description} />
                ) : null}
            </Head>

            <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
                        {page.title}
                    </h1>

                    {page.featured_image_url ? (
                        <img
                            src={page.featured_image_url}
                            alt={page.title}
                            className="mt-6 h-auto w-full rounded-md object-cover"
                        />
                    ) : null}

                    <div className="mt-6">
                        {blocks.length > 0 ? (
                            <PageBlockRenderer blocks={blocks} />
                        ) : (
                            <div
                                className="prose prose-neutral max-w-none"
                                dangerouslySetInnerHTML={{ __html: page.content }}
                            />
                        )}
                    </div>
                </article>
            </main>
        </>
    );
}

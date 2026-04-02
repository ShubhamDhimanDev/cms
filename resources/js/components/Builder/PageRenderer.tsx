import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import type { BuilderLayout, Section, Widget } from '@/types/builder';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

type PageRendererProps = {
    layout: BuilderLayout;
    device?: DeviceMode;
    isBuilder?: boolean;
};

function toEmbedUrl(url: string): string {
    const trimmed = url.trim();

    if (!trimmed) {
        return '';
    }

    try {
        const parsed = new URL(trimmed);
        const host = parsed.hostname.replace('www.', '');

        if (host.includes('youtube.com')) {
            const id = parsed.searchParams.get('v');

            return id ? `https://www.youtube.com/embed/${id}` : trimmed;
        }

        if (host.includes('youtu.be')) {
            const id = parsed.pathname.replace('/', '');

            return id ? `https://www.youtube.com/embed/${id}` : trimmed;
        }

        if (host.includes('vimeo.com')) {
            const id = parsed.pathname.split('/').filter(Boolean).at(-1);

            return id ? `https://player.vimeo.com/video/${id}` : trimmed;
        }

        return trimmed;
    } catch {
        return trimmed;
    }
}

function sectionStyle(section: Section): CSSProperties {
    const settings = section.settings;

    return {
        backgroundColor: settings.background,
        backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : undefined,
        backgroundSize: settings.backgroundSize,
        paddingTop: settings.paddingTop,
        paddingRight: settings.paddingRight,
        paddingBottom: settings.paddingBottom,
        paddingLeft: settings.paddingLeft,
        marginTop: settings.marginTop,
        marginBottom: settings.marginBottom,
    };
}

function widgetStyle(widget: Widget): CSSProperties {
    const settings = widget.settings;

    return {
        color: settings.color,
        backgroundColor: settings.backgroundColor,
        fontSize: settings.fontSize,
        fontWeight: settings.fontWeight,
        textAlign: settings.textAlign,
        padding: settings.padding,
        margin: settings.margin,
        borderRadius: settings.borderRadius,
        border: settings.border,
        lineHeight: settings.lineHeight,
        letterSpacing: settings.letterSpacing,
    };
}

function renderWidget(widget: Widget, isBuilder: boolean): ReactElement {
    const settings = widget.settings;
    const style = widgetStyle(widget);
    const widgetType = widget.type as string;

    switch (widgetType) {
        case 'heading': {
            const tag = settings.tag ?? 'h2';
            const text = settings.text?.trim() || 'Heading';
            const Tag = tag;

            return <Tag style={style}>{text}</Tag>;
        }

        case 'text': {
            const html = settings.content?.trim() || '<p></p>';

            return <div style={style} dangerouslySetInnerHTML={{ __html: html }} />;
        }

        case 'image': {
            const src = settings.src?.trim();

            if (!src) {
                return <div className="rounded border border-dashed border-neutral-300 bg-neutral-100 p-6 text-center text-xs text-neutral-500">Image</div>;
            }

            return (
                <img
                    src={src}
                    alt={settings.alt ?? ''}
                    style={{
                        ...style,
                        width: settings.width || '100%',
                        display: 'block',
                    }}
                />
            );
        }

        case 'button': {
            const variant = settings.variant ?? 'solid';
            const buttonStyle: CSSProperties = {
                ...style,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                border: style.border ?? '1px solid transparent',
                backgroundColor: variant === 'ghost' ? 'transparent' : settings.backgroundColor ?? '#2563eb',
                color: settings.color ?? (variant === 'outline' ? '#2563eb' : '#ffffff'),
                padding: settings.padding ?? '10px 16px',
            };

            return (
                <a
                    href={settings.url || '#'}
                    target={settings.target ?? '_self'}
                    rel={settings.target === '_blank' ? 'noopener noreferrer' : undefined}
                    style={buttonStyle}
                    onClick={(event) => {
                        if (isBuilder) {
                            event.preventDefault();
                        }
                    }}
                >
                    {settings.label?.trim() || 'Button'}
                </a>
            );
        }

        case 'divider': {
            return (
                <hr
                    style={{
                        border: 'none',
                        borderTop: `${settings.height || '1px'} ${settings.dividerStyle || 'solid'} ${settings.color || '#d4d4d8'}`,
                        margin: settings.margin || '20px 0',
                    }}
                />
            );
        }

        case 'spacer': {
            const height = settings.height || '40px';

            return <div aria-hidden="true" style={{ height }} />;
        }

        case 'video': {
            const embedUrl = toEmbedUrl(settings.videoUrl ?? '');

            if (!embedUrl) {
                return <div className="rounded border border-dashed border-neutral-300 bg-neutral-100 p-6 text-center text-xs text-neutral-500">Video URL</div>;
            }

            return (
                <div style={{ ...style, position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                        src={embedUrl}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                    />
                </div>
            );
        }

        case 'google-maps': {
            const mapsUrl = settings.videoUrl?.trim();

            if (!mapsUrl) {
                return <div className="rounded border border-dashed border-neutral-300 bg-neutral-100 p-6 text-center text-xs text-neutral-500">Map URL</div>;
            }

            return (
                <div style={{ ...style, position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                        src={mapsUrl}
                        title="Google Map"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                    />
                </div>
            );
        }

        case 'html': {
            if (isBuilder) {
                return <pre className="overflow-auto rounded bg-neutral-900 p-3 text-xs text-neutral-100">{settings.html ?? ''}</pre>;
            }

            return <div style={style} dangerouslySetInnerHTML={{ __html: settings.html ?? '' }} />;
        }

        default: {
            return <div className="rounded border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">Unsupported widget</div>;
        }
    }
}

export default function PageRenderer({ layout, isBuilder = false }: PageRendererProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const globalStyles = layout.globalStyles ?? {};
    const pageSettings = layout.pageSettings ?? {};

    const customCss = useMemo(() => {
        const rules: string[] = [];

        if (pageSettings.customCss) {
            rules.push(pageSettings.customCss);
        }

        for (const section of layout.sections) {
            const sectionCss = (section.settings as { customCSS?: string }).customCSS;

            if (sectionCss) {
                rules.push(sectionCss);
            }

            for (const column of section.columns) {
                for (const widget of column.widgets) {
                    const widgetCss = (widget.settings as { customCSS?: string }).customCSS;

                    if (widgetCss) {
                        rules.push(widgetCss);
                    }
                }
            }
        }

        return rules.join('\n');
    }, [layout, pageSettings.customCss]);

    const globalCssVariables = useMemo(
        () => ({
            '--global-primary-color': globalStyles.primaryColor,
            '--global-secondary-color': globalStyles.secondaryColor,
            '--global-accent-color': globalStyles.accentColor,
            '--global-text-color': globalStyles.textColor,
            '--global-font-body': globalStyles.bodyFont,
            '--global-font-heading': globalStyles.headingFont,
        }),
        [
            globalStyles.accentColor,
            globalStyles.bodyFont,
            globalStyles.headingFont,
            globalStyles.primaryColor,
            globalStyles.secondaryColor,
            globalStyles.textColor,
        ],
    );

    useEffect(() => {
        if (isBuilder || !rootRef.current) {
            return;
        }

        const root = rootRef.current;
        const motionItems = Array.from(root.querySelectorAll<HTMLElement>('[data-motion]'));

        if (motionItems.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('pb-motion-visible');
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.2 },
        );

        for (const item of motionItems) {
            observer.observe(item);
        }

        return () => {
            observer.disconnect();
        };
    }, [isBuilder, layout]);

    useEffect(() => {
        if (isBuilder || !rootRef.current) {
            return;
        }

        const counters = Array.from(rootRef.current.querySelectorAll<HTMLElement>('[data-counter-target]'));

        for (const counter of counters) {
            const target = Number(counter.dataset.counterTarget);

            if (!Number.isFinite(target)) {
                continue;
            }

            const start = performance.now();
            const duration = 1200;

            const tick = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.round(target * progress);

                counter.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        }
    }, [isBuilder, layout]);

    if (!layout.sections.length) {
        return <div ref={rootRef} className="p-6 text-sm text-neutral-500">No sections found.</div>;
    }

    return (
        <div ref={rootRef} className="pb-render-root" style={globalCssVariables as CSSProperties}>
            {!isBuilder ? (
                <style>{`
                    .pb-render-root {
                        color: var(--global-text-color, inherit);
                        font-family: var(--global-font-body, inherit);
                    }
                    .pb-render-root h1,
                    .pb-render-root h2,
                    .pb-render-root h3,
                    .pb-render-root h4,
                    .pb-render-root h5,
                    .pb-render-root h6 {
                        font-family: var(--global-font-heading, var(--global-font-body, inherit));
                    }
                    .pb-motion {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 500ms ease, transform 500ms ease;
                    }
                    .pb-motion.pb-motion-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}</style>
            ) : null}

            {customCss ? <style>{customCss}</style> : null}

            {layout.sections.map((section) => {
                const settings = section.settings;
                const gap = settings.columnGap || '0px';

                return (
                    <section
                        id={section.id}
                        key={section.id}
                        style={sectionStyle(section)}
                        className={isBuilder ? undefined : 'pb-motion'}
                        data-motion={isBuilder ? undefined : 'fade-up'}
                    >
                        <div
                            style={{
                                maxWidth: pageSettings.stretchSection || settings.fullWidth ? '100%' : settings.maxWidth || '1200px',
                                marginInline: pageSettings.stretchSection || settings.fullWidth ? undefined : 'auto',
                                width: '100%',
                            }}
                        >
                            <div style={{ display: 'flex', gap, flexWrap: 'wrap' }}>
                                {section.columns.map((column) => (
                                    <div
                                        key={column.id}
                                        style={{
                                            flex: `0 0 ${column.width}%`,
                                            width: `${column.width}%`,
                                            backgroundColor: column.settings?.backgroundColor,
                                            paddingTop: column.settings?.paddingTop,
                                            paddingRight: column.settings?.paddingRight,
                                            paddingBottom: column.settings?.paddingBottom,
                                            paddingLeft: column.settings?.paddingLeft,
                                        }}
                                    >
                                        {column.widgets.map((widget) => (
                                            <div
                                                key={widget.id}
                                                id={widget.settings.customId || undefined}
                                                style={{ marginBottom: '12px' }}
                                                data-motion={isBuilder ? undefined : 'fade-up'}
                                                data-counter-target={(widget.settings as { counterTarget?: string }).counterTarget}
                                                className={[
                                                    widget.settings.customClass || '',
                                                    isBuilder ? '' : 'pb-motion',
                                                ]
                                                    .join(' ')
                                                    .trim()}
                                            >
                                                {renderWidget(widget, isBuilder)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

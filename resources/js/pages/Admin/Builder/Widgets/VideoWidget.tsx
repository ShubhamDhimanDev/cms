import { PlaySquare } from 'lucide-react';
import { useMemo } from 'react';
import type { Widget } from '@/types/builder';

type VideoWidgetProps = {
    widget: Widget;
    isSelected: boolean;
};

function toEmbedUrl(videoUrl: string, autoplay: boolean): string | null {
    const source = videoUrl.trim();

    if (!source) {
        return null;
    }

    const youtubeMatch =
        source.match(/youtube\.com\/watch\?v=([\w-]{6,})/i) ||
        source.match(/youtu\.be\/([\w-]{6,})/i) ||
        source.match(/youtube\.com\/embed\/([\w-]{6,})/i) ||
        source.match(/youtube\.com\/shorts\/([\w-]{6,})/i);

    if (youtubeMatch?.[1]) {
        const params = new URLSearchParams();

        if (autoplay) {
            params.set('autoplay', '1');
            params.set('mute', '1');
        }

        const suffix = params.toString() ? `?${params.toString()}` : '';
        return `https://www.youtube.com/embed/${youtubeMatch[1]}${suffix}`;
    }

    const vimeoMatch = source.match(/vimeo\.com\/(?:video\/)?(\d+)/i);

    if (vimeoMatch?.[1]) {
        const params = autoplay ? '?autoplay=1&muted=1' : '';
        return `https://player.vimeo.com/video/${vimeoMatch[1]}${params}`;
    }

    return null;
}

export default function VideoWidget({ widget, isSelected }: VideoWidgetProps) {
    const embedUrl = toEmbedUrl(widget.settings.videoUrl ?? '', widget.settings.autoplay ?? false);

    const style = useMemo(
        () => ({
            border: widget.settings.border,
            borderRadius: widget.settings.borderRadius,
            padding: widget.settings.padding,
        }),
        [widget.settings],
    );

    if (!embedUrl) {
        return (
            <div
                style={style}
                className={`flex aspect-video items-center justify-center rounded-md border border-dashed ${
                    isSelected ? 'border-sky-300 bg-sky-50' : 'border-neutral-300 bg-neutral-100'
                }`}
            >
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <PlaySquare className="h-4 w-4" />
                    Add YouTube or Vimeo URL
                </div>
            </div>
        );
    }

    return (
        <div style={style} className="overflow-hidden rounded-md">
            <iframe
                src={embedUrl}
                title="Video widget"
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

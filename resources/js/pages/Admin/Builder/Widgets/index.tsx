import type { Widget } from '@/types/builder';
import ButtonWidget from './ButtonWidget';
import DividerWidget from './DividerWidget';
import HeadingWidget from './HeadingWidget';
import HtmlWidget from './HtmlWidget';
import ImageWidget from './ImageWidget';
import SpacerWidget from './SpacerWidget';
import TextWidget from './TextWidget';
import VideoWidget from './VideoWidget';

interface Props {
    widget: Widget;
    isSelected: boolean;
}

export function WidgetRenderer({ widget, isSelected }: Props) {
    switch (widget.type) {
        case 'heading':
            return <HeadingWidget widget={widget} isSelected={isSelected} />;
        case 'text':
            return <TextWidget widget={widget} isSelected={isSelected} />;
        case 'image':
            return <ImageWidget widget={widget} isSelected={isSelected} />;
        case 'button':
            return <ButtonWidget widget={widget} isSelected={isSelected} />;
        case 'divider':
            return <DividerWidget widget={widget} isSelected={isSelected} />;
        case 'spacer':
            return <SpacerWidget widget={widget} isSelected={isSelected} />;
        case 'video':
            return <VideoWidget widget={widget} isSelected={isSelected} />;
        case 'html':
            return <HtmlWidget widget={widget} isSelected={isSelected} />;
        default:
            return null;
    }
}

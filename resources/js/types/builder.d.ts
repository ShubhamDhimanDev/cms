export type WidgetType =
    | 'heading'
    | 'text'
    | 'image'
    | 'button'
    | 'divider'
    | 'spacer'
    | 'video'
    | 'html'

export interface WidgetSettings {
    // heading
    text?: string
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    // text
    content?: string
    // image
    src?: string
    alt?: string
    width?: string
    // button
    label?: string
    url?: string
    target?: '_self' | '_blank'
    variant?: 'solid' | 'outline' | 'ghost'
    // shared style
    color?: string
    backgroundColor?: string
    fontSize?: string
    fontWeight?: string
    textAlign?: 'left' | 'center' | 'right'
    padding?: string
    margin?: string
    borderRadius?: string
    border?: string
    lineHeight?: string
    letterSpacing?: string
    // spacer
    height?: string
    // html
    html?: string
    // video
    videoUrl?: string
    autoplay?: boolean
    // divider
    dividerStyle?: 'solid' | 'dashed' | 'dotted'
    // advanced
    customClass?: string
    customId?: string
    hideDesktop?: boolean
    hideTablet?: boolean
    hideMobile?: boolean
}

export interface SharedStyleSettings {
    color?: string
    backgroundColor?: string
    fontSize?: string
    fontWeight?: string
    textAlign?: 'left' | 'center' | 'right'
    padding?: string
    margin?: string
    borderRadius?: string
    border?: string
    lineHeight?: string
    letterSpacing?: string
}

export interface Widget {
    id: string
    type: WidgetType
    settings: WidgetSettings
}

export interface ColumnSettings {
    backgroundColor?: string
    paddingTop?: string
    paddingRight?: string
    paddingBottom?: string
    paddingLeft?: string
    verticalAlign?: 'top' | 'center' | 'bottom'
}

export interface Column {
    id: string
    width: number     // percentage, e.g. 50 for 50%
    settings?: ColumnSettings
    widgets: Widget[]
}

export interface SectionSettings {
    background?: string
    backgroundImage?: string
    backgroundSize?: 'cover' | 'contain' | 'auto'
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    marginTop?: string
    marginBottom?: string
    maxWidth?: string
    fullWidth?: boolean
    columnGap?: string
    columnPreset?: ColumnPreset
}

export interface Section {
    id: string
    type: 'section'
    settings: SectionSettings
    columns: Column[]
}

export interface BuilderLayout {
    sections: Section[]
    globalStyles?: {
        primaryColor?: string
        secondaryColor?: string
        accentColor?: string
        textColor?: string
        bodyFont?: string
        headingFont?: string
    }
    pageSettings?: {
        stretchSection?: boolean
        customCss?: string
    }
}

export type ColumnPreset = '100' | '50-50' | '33-33-33' | '25-75' | '75-25' | '25-50-25' | '25-25-25-25'

export type SelectionType = 'section' | 'column' | 'widget' | null

export interface BuilderSelection {
    type: SelectionType
    sectionId: string | null
    columnId: string | null
    widgetId: string | null
}

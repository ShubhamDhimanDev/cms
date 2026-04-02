# JS
npm install zustand nanoid
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers @dnd-kit/utilities
npm install react-colorful
npm install @floating-ui/react
npm install react-resizable-panels

# PHP
composer require ezyang/htmlpurifier
```

---

## PHASE 1 — Backend Foundation

### Prompt 1A — Migration & Model
```
## Task: Page Builder — Backend Foundation

### Migration
Create a new migration: add_builder_columns_to_pages_table

Add these columns to `pages`:
- `layout` longText nullable       — stores full JSON builder schema
- `builder_enabled` boolean default false — true = use builder, false = classic editor

Run: php artisan migrate

### Page Model updates
1. Add `layout`, `builder_enabled` to $fillable
2. Add casts:
   'layout' => 'array',
   'builder_enabled' => 'boolean'
3. Add accessor:
   public function getBuilderPreviewUrlAttribute(): string
   { return route('admin.pages.builder.preview', $this); }
```

---

### Prompt 1B — Builder Controller & Routes
```
## Task: Page Builder — Controller & Routes

Create app/Http/Controllers/Admin/BuilderController.php with these methods:

public function editor(Page $page): \Inertia\Response
  — Return Inertia::render('Admin/Builder/Editor', [
      'page' => $page->only(['id','title','slug','status','layout','builder_enabled'])
    ])
  — This is the full-screen builder editor

public function load(Page $page): JsonResponse
  — Return JSON: { layout: $page->layout ?? defaultLayout() }
  — defaultLayout() returns: ['sections' => []]

public function save(Request $request, Page $page): JsonResponse
  — Validate: layout required|array
  — $page->update(['layout' => $request->layout, 'builder_enabled' => true])
  — Return JSON: { success: true }

public function preview(Page $page): \Inertia\Response
  — Return Inertia::render('Admin/Builder/Preview', [
      'page' => $page,
      'layout' => $page->layout ?? ['sections' => []]
    ])

public function autosave(Request $request, Page $page): JsonResponse
  — Same as save but no validation — called every 30s silently
  — Return JSON: { saved_at: now()->toISOString() }

Add routes inside admin middleware group in routes/web.php:
Route::prefix('pages/{page}/builder')->name('admin.pages.builder.')->group(function () {
    Route::get('/', [BuilderController::class, 'editor'])->name('editor');
    Route::get('/load', [BuilderController::class, 'load'])->name('load');
    Route::post('/save', [BuilderController::class, 'save'])->name('save');
    Route::post('/autosave', [BuilderController::class, 'autosave'])->name('autosave');
    Route::get('/preview', [BuilderController::class, 'preview'])->name('preview');
});

Also in PublicPageController@show:
- If $page->builder_enabled && $page->layout:
    return Inertia::render('Public/PageRenderer', [
      'page' => $page,
      'layout' => $page->layout
    ])
- Else: return classic view
```

---

## PHASE 2 — TypeScript Schema & Store

### Prompt 2A — Full TypeScript types
```
## Task: Page Builder — TypeScript Types

Create resources/js/types/builder.d.ts with ALL of the following:

// ─── Widget Types ───────────────────────────────────────────
export type WidgetType =
  | 'heading' | 'text' | 'image' | 'button'
  | 'divider' | 'spacer' | 'video' | 'html'
  | 'icon' | 'image-box' | 'icon-box' | 'star-rating'
  | 'testimonial' | 'progress-bar' | 'counter'
  | 'alert' | 'tabs' | 'accordion' | 'toggle'
  | 'social-icons' | 'nav-menu' | 'search'
  | 'google-maps' | 'shortcode'

// ─── Responsive Value ────────────────────────────────────────
export interface ResponsiveValue<T> {
  desktop: T
  tablet?: T
  mobile?: T
}

// ─── Shared Style Settings ──────────────────────────────────
export interface SpacingValue {
  top: string; right: string; bottom: string; left: string
  linked: boolean   // true = all sides same value
}

export interface BorderValue {
  width: string; style: 'solid'|'dashed'|'dotted'|'double'|'none'; color: string
}

export interface TypographyValue {
  fontFamily?: string
  fontSize?: ResponsiveValue<string>
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  textDecoration?: string
  textTransform?: 'none'|'uppercase'|'lowercase'|'capitalize'
  fontStyle?: 'normal'|'italic'
}

export interface BackgroundValue {
  type: 'none'|'classic'|'gradient'|'image'
  color?: string
  gradientType?: 'linear'|'radial'
  gradientAngle?: number
  gradientColor1?: string
  gradientColor2?: string
  gradientStop1?: number
  gradientStop2?: number
  imageUrl?: string
  imagePosition?: string
  imageSize?: 'cover'|'contain'|'auto'
  imageRepeat?: 'no-repeat'|'repeat'|'repeat-x'|'repeat-y'
  imageAttachment?: 'scroll'|'fixed'
}

export interface SharedStyleSettings {
  margin?: ResponsiveValue<SpacingValue>
  padding?: ResponsiveValue<SpacingValue>
  zIndex?: number
  opacity?: number
  border?: BorderValue
  borderRadius?: ResponsiveValue<SpacingValue>
  boxShadow?: string
  cssClasses?: string
  customCSS?: string
  hideOnDesktop?: boolean
  hideOnTablet?: boolean
  hideOnMobile?: boolean
  motionEffects?: {
    entranceAnimation?: string
    animationDuration?: 'slow'|'normal'|'fast'
    animationDelay?: number
  }
}

// ─── Widget-Specific Content Settings ───────────────────────
export interface HeadingContent {
  text: string; tag: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'; link?: string
}
export interface TextContent { content: string; dropCap?: boolean }
export interface ImageContent {
  url: string; alt: string; link?: string; linkTarget?: string
  caption?: string; lazyLoad?: boolean
}
export interface ButtonContent {
  text: string; link: string; linkTarget: string
  icon?: string; iconPosition?: 'before'|'after'
  size?: 'xs'|'sm'|'md'|'lg'|'xl'
  type?: 'solid'|'outline'|'ghost'|'link'
}
export interface VideoContent {
  source: 'youtube'|'vimeo'|'self-hosted'
  url: string; startTime?: number; endTime?: number
  autoplay?: boolean; muted?: boolean; loop?: boolean
  controls?: boolean; modest?: boolean
  overlayColor?: string; lightbox?: boolean
  placeholderImage?: string
}
export interface DividerContent {
  style?: 'solid'|'dashed'|'dotted'|'double'
  weight?: string; color?: string; width?: string
  align?: 'left'|'center'|'right'
  icon?: string; iconPosition?: 'left'|'center'|'right'
}
export interface SpacerContent { size: ResponsiveValue<string> }
export interface HtmlContent { html: string }
export interface IconContent {
  icon: string; link?: string; linkTarget?: string
  view?: 'default'|'stacked'|'framed'
  shape?: 'circle'|'square'
}
export interface ImageBoxContent {
  imageUrl: string; imageAlt: string
  title: string; description: string
  link?: string; linkTarget?: string
}
export interface TestimonialContent {
  content: string; name: string; title: string
  imageUrl?: string; rating?: number
  layout?: 'default'|'bubble'
}
export interface CounterContent {
  startNumber: number; endNumber: number
  prefix?: string; suffix?: string
  duration?: number; separator?: boolean
  title: string
}
export interface AccordionItem { id: string; title: string; content: string; active?: boolean }
export interface AccordionContent { items: AccordionItem[]; iconClosed?: string; iconOpened?: string }
export interface TabItem { id: string; label: string; content: string; icon?: string }
export interface TabsContent { items: TabItem[]; alignment?: 'left'|'center'|'right' }
export interface ProgressBarContent {
  title: string; percent: number
  color?: string; backgroundColor?: string
  showPercentage?: boolean
}
export interface AlertContent {
  type: 'info'|'success'|'warning'|'danger'
  title?: string; message: string; dismissible?: boolean
  icon?: string
}
export interface StarRatingContent {
  rating: number; maxRating?: number
  icon?: string; color?: string; unmarkedColor?: string
}
export interface SocialIconsContent {
  items: { platform: string; url: string; icon?: string }[]
  shape?: 'circle'|'square'|'rounded'
  size?: 'xs'|'sm'|'md'|'lg'
}
export interface GoogleMapsContent {
  address: string; zoom?: number; height?: string
  type?: 'roadmap'|'satellite'|'hybrid'|'terrain'
}

// ─── Widget ──────────────────────────────────────────────────
export type WidgetContent =
  | HeadingContent | TextContent | ImageContent | ButtonContent
  | VideoContent | DividerContent | SpacerContent | HtmlContent
  | IconContent | ImageBoxContent | TestimonialContent | CounterContent
  | AccordionContent | TabsContent | ProgressBarContent | AlertContent
  | StarRatingContent | SocialIconsContent | GoogleMapsContent

export interface Widget {
  id: string
  type: WidgetType
  content: WidgetContent
  style: SharedStyleSettings
  widgetStyle: Record<string, unknown>   // widget-specific style overrides
}

// ─── Column ──────────────────────────────────────────────────
export interface ColumnSettings {
  width: ResponsiveValue<string>   // e.g. { desktop: '50%', tablet: '100%', mobile: '100%' }
  verticalAlign?: 'top'|'middle'|'bottom'|'space-between'
  background?: BackgroundValue
  border?: BorderValue
  borderRadius?: ResponsiveValue<SpacingValue>
  padding?: ResponsiveValue<SpacingValue>
  margin?: ResponsiveValue<SpacingValue>
  boxShadow?: string
  zIndex?: number
  htmlTag?: 'div'|'section'|'article'|'aside'|'header'|'footer'|'nav'|'main'
  cssId?: string
  cssClasses?: string
  overflowHidden?: boolean
}

export interface Column {
  id: string
  settings: ColumnSettings
  widgets: Widget[]
}

// ─── Section ─────────────────────────────────────────────────
export type ColumnPreset = '100'|'50-50'|'33-33-33'|'25-75'|'75-25'|'25-50-25'|'25-25-25-25'

export interface SectionSettings {
  columnPreset?: ColumnPreset
  layout?: 'boxed'|'full_width'|'full_width_stretched'
  contentWidth?: string
  columnGap?: 'no'|'narrow'|'default'|'extended'|'wide'|'wider'
  columnsPosition?: 'top'|'middle'|'bottom'|'stretch'
  overflowHidden?: boolean
  htmlTag?: 'div'|'section'|'article'|'aside'|'header'|'footer'|'nav'|'main'
  cssId?: string
  cssClasses?: string
  // Background
  background?: BackgroundValue
  backgroundOverlay?: { color?: string; opacity?: number }
  // Border
  border?: BorderValue
  borderRadius?: ResponsiveValue<SpacingValue>
  boxShadow?: string
  // Shape dividers
  shapeDividerTop?: {
    type: string; color: string; width: ResponsiveValue<number>; height: ResponsiveValue<number>; flip?: boolean; front?: boolean
  }
  shapeDividerBottom?: {
    type: string; color: string; width: ResponsiveValue<number>; height: ResponsiveValue<number>; flip?: boolean; front?: boolean
  }
  // Spacing
  padding?: ResponsiveValue<SpacingValue>
  margin?: ResponsiveValue<SpacingValue>
  zIndex?: number
  // Visibility
  hideOnDesktop?: boolean
  hideOnTablet?: boolean
  hideOnMobile?: boolean
  // Motion
  motionEffects?: {
    entranceAnimation?: string
    animationDuration?: 'slow'|'normal'|'fast'
    animationDelay?: number
  }
  // Custom CSS
  customCSS?: string
}

export interface Section {
  id: string
  settings: SectionSettings
  columns: Column[]
}

// ─── Full Layout ─────────────────────────────────────────────
export interface BuilderLayout {
  sections: Section[]
  globalStyles?: {
    primaryColor?: string
    secondaryColor?: string
    bodyFont?: string
    headingFont?: string
  }
}

// ─── Builder UI State ────────────────────────────────────────
export type DeviceMode = 'desktop'|'tablet'|'mobile'

export type SelectionTarget =
  | { type: 'section'; sectionId: string }
  | { type: 'column'; sectionId: string; columnId: string }
  | { type: 'widget'; sectionId: string; columnId: string; widgetId: string }
  | null

export interface DragState {
  isDragging: boolean
  dragType: 'new-widget'|'existing-widget'|'section'|null
  widgetType?: WidgetType
  sourceWidgetId?: string
  sourceSectionId?: string
  sourceColumnId?: string
}

export interface BuilderUIState {
  device: DeviceMode
  selection: SelectionTarget
  drag: DragState
  settingsTab: 'content'|'style'|'advanced'
  leftPanelTab: 'widgets'|'navigator'|'history'
  isDirty: boolean
  isSaving: boolean
  lastSavedAt: string|null
  zoom: number
  showGrid: boolean
  rightPanelCollapsed: boolean
  leftPanelCollapsed: boolean
  isPreviewMode: boolean
}
```

---

### Prompt 2B — Zustand Store (complete)
```
## Task: Page Builder — Zustand Store

Create resources/js/stores/builderStore.ts

Use Zustand with immer middleware for immutable updates:
npm install immer

Store combines BuilderLayout state + BuilderUIState from builder.d.ts.

Implement ALL of these actions:

// ── Init ────────────────────────────────────────────────
initLayout(layout: BuilderLayout): void
  — set layout, clear history, isDirty = false

// ── History (undo/redo) ─────────────────────────────────
// Keep a separate historyStack: BuilderLayout[] and historyIndex: number
// Max 50 history entries
pushHistory(): void          — snapshot current layout to history
undo(): void                 — restore layout from historyIndex - 1
redo(): void                 — restore layout from historyIndex + 1
canUndo: boolean             — computed: historyIndex > 0
canRedo: boolean             — computed: historyIndex < stack.length - 1

// ── UI ──────────────────────────────────────────────────
setDevice(device: DeviceMode): void
setSelection(target: SelectionTarget): void
clearSelection(): void
setSettingsTab(tab: 'content'|'style'|'advanced'): void
setLeftPanelTab(tab: 'widgets'|'navigator'|'history'): void
setIsSaving(val: boolean): void
setLastSavedAt(val: string): void
setZoom(val: number): void
toggleGrid(): void
togglePreviewMode(): void
toggleRightPanel(): void
toggleLeftPanel(): void

// ── Sections ────────────────────────────────────────────
addSection(afterSectionId?: string, preset?: ColumnPreset): void
  — use preset to build correct number of columns with correct widths
  — default preset: '100' (one full-width column)
duplicateSection(sectionId: string): void
  — deep clone with all new nanoid() ids recursively
deleteSection(sectionId: string): void
updateSectionSettings(sectionId: string, patch: Partial<SectionSettings>): void
moveSectionUp(sectionId: string): void
moveSectionDown(sectionId: string): void
reorderSections(fromIndex: number, toIndex: number): void
setSectionColumnPreset(sectionId: string, preset: ColumnPreset): void
  — rebuild columns array based on preset percentages, preserving existing widget content

// ── Columns ─────────────────────────────────────────────
updateColumnSettings(sectionId: string, columnId: string, patch: Partial<ColumnSettings>): void
addColumn(sectionId: string): void
  — redistribute all column widths equally
deleteColumn(sectionId: string, columnId: string): void
  — redistribute remaining widths
reorderColumns(sectionId: string, fromIndex: number, toIndex: number): void

// ── Widgets ─────────────────────────────────────────────
addWidget(sectionId: string, columnId: string, type: WidgetType, atIndex?: number): void
  — use getDefaultWidget(type) to generate widget with correct default content+style
duplicateWidget(sectionId: string, columnId: string, widgetId: string): void
deleteWidget(sectionId: string, columnId: string, widgetId: string): void
updateWidgetContent(sectionId: string, columnId: string, widgetId: string, patch: Partial<WidgetContent>): void
updateWidgetStyle(sectionId: string, columnId: string, widgetId: string, patch: Partial<SharedStyleSettings>): void
updateWidgetSpecificStyle(sectionId: string, columnId: string, widgetId: string, patch: Record<string, unknown>): void
moveWidget(from: {sectionId,columnId,index}, to: {sectionId,columnId,index}): void
reorderWidgets(sectionId: string, columnId: string, fromIndex: number, toIndex: number): void

// ── Helper (exported, not in store) ─────────────────────
export function getDefaultWidget(type: WidgetType): Widget
  — returns a Widget with id=nanoid(), correct content defaults per type

export function columnWidthsForPreset(preset: ColumnPreset): string[]
  — e.g. '50-50' → ['50%', '50%'], '33-33-33' → ['33.33%','33.33%','33.33%']

Rule: every mutating action must call pushHistory() at the end and set isDirty = true.
Exception: UI-only actions (setDevice, setSelection, setSettingsTab etc.) do NOT push history.
```

---

## PHASE 3 — Builder Shell & Panels

### Prompt 3A — Editor shell (full screen)
```
## Task: Page Builder — Editor Shell

Create resources/js/Pages/Admin/Builder/Editor.tsx

Props: { page: { id, title, slug, status, layout } }

This page uses NO Inertia layout: Component.layout = null

Full screen layout using CSS grid:
- Row 1: TopBar (h-14, fixed)
- Row 2: flex row — LeftPanel (w-[280px]) + Canvas (flex-1) + RightPanel (w-[300px])

All panels are fixed height (100vh - 56px), overflow-y: auto independently.

On mount:
- Call initLayout(page.layout ?? { sections: [] }) on builderStore
- Set up beforeunload warning when isDirty is true

TopBar contains (left to right):
- Hamburger to collapse LeftPanel
- Elementor-style "E" logo + page title (editable inline, saves on blur via Inertia router.patch)
- Responsive switcher: Desktop / Tablet / Mobile icons (calls setDevice)
- Undo / Redo buttons (disabled states from store.canUndo / canRedo)
- Zoom dropdown: 50%, 75%, 100%, 125%
- --- separator ---
- Preview button → opens /admin/pages/{id}/builder/preview in new tab
- Save draft button (gray)
- Publish / Update button (primary color)
  Both call builderSave() which POSTs to /admin/pages/{id}/builder/save

Auto-save: useEffect with 30s interval → POST to autosave endpoint silently.
Show "Last saved X mins ago" in topbar using lastSavedAt from store.

Dark theme for panels (#1E1E2E background, #2D2D44 panel bg, white text).
Canvas area: light gray background (#F0F2F5) like Elementor.
```

---

### Prompt 3B — Left Panel (exact Elementor layout)
```
## Task: Page Builder — Left Panel

Create resources/js/Pages/Admin/Builder/LeftPanel.tsx

Exact Elementor left panel structure:

TOP TABS (icon tabs, no labels):
  [⊞ Widgets] [☰ Navigator] [🕐 History]

── WIDGETS TAB ──────────────────────────────────────────
Search bar at top (filters widget list live)

Widget categories (collapsible sections, default all expanded):

BASIC
  Heading | Text Editor | Image | Button | Divider | Spacer | Google Maps

GENERAL
  Icon | Image Box | Icon Box | Star Rating | Progress Bar
  Testimonial | Tabs | Accordion | Toggle | Alert | Counter

MEDIA
  Video | HTML | Social Icons | Search | Nav Menu

Each widget shown as a grid card (2 columns):
  - Icon (40px, centered)
  - Label (small, centered, truncated)
  - Draggable via @dnd-kit useDraggable({ id: `widget-palette::${type}` })
  - Hover: slight blue highlight

── NAVIGATOR TAB ────────────────────────────────────────
Shows a tree of all sections → columns → widgets
Each item:
  - Indent by level (section / column / widget)
  - Icon + type label
  - Click → calls store.setSelection(...)
  - Drag handle to reorder (use @dnd-kit sortable)
  - Eye icon toggle to hide/show (updates hide on all devices)
  - Three-dot menu → duplicate / delete

── HISTORY TAB ──────────────────────────────────────────
Shows list of history snapshots from store.historyStack
Each entry: "Action X" (show action description — store each history push with a label)
Click entry → restore that history snapshot (jump to historyIndex)
Current position highlighted in blue
```

---

### Prompt 3C — Canvas (exact Elementor canvas)
```
## Task: Page Builder — Canvas

Create resources/js/Pages/Admin/Builder/Canvas.tsx

The canvas wraps PageRenderer.tsx (the actual output component).
On top of the renderer output it overlays interactive UI.

Canvas wrapper:
- Respects store.device to set max-width:
  desktop → 100%, tablet → 768px, mobile → 375px (centered with auto margins)
- Respects store.zoom: apply CSS transform: scale(zoom) with transform-origin: top center
- Shows a grid overlay if store.showGrid (CSS background-image grid lines)
- In preview mode (store.isPreviewMode): render PageRenderer only, no overlays

The canvas renders sections via SectionBlock, columns via ColumnBlock,
widgets via WidgetBlock. These are OVERLAY wrappers around the renderer output.

SectionBlock:
- Wraps the rendered section output
- On hover: show floating section handle bar (exact Elementor style):
  Blue bar at top with: [⠿ Section] [+] [⧉] [▲] [▼] [🗑]
  Handle is only visible on hover, absolute positioned
- Blue border outline on hover
- Thicker blue border + handle stays visible when selected
- Click → store.setSelection({ type: 'section', sectionId })

ColumnBlock:
- On hover: blue dashed border
- Column resize handle: draggable blue dot between columns
  — drag left/right → updates adjacent column widths proportionally
- Click → store.setSelection({ type: 'column', ... })
- "+" button to add widget shown centered in empty columns

WidgetBlock:
- On hover: blue border + floating toolbar:
  [⠿ drag] [WidgetType label] [⧉ duplicate] [🗑 delete]
- Toolbar is absolutely positioned above the widget
- Click → store.setSelection({ type: 'widget', ... })
- Sortable within column using @dnd-kit/sortable
- Blue insertion line shown between widgets during drag-over

Between every section: show a faint "+ Add Section" line
(visible on hover of the gap area) that calls store.addSection(afterSectionId)

When canvas is empty: show the Elementor-style empty state:
  Large centered area with:
  "Drag a widget here" or
  Section preset picker (6 preset column layouts shown as icons):
  [▓] [▓▓] [▓▓▓] [▓░░] [░▓░] [▓▓▓▓]
  Click preset → store.addSection(undefined, preset)
```

---

### Prompt 3D — Right Panel (exact Elementor settings)
```
## Task: Page Builder — Right Panel

Create resources/js/Pages/Admin/Builder/RightPanel.tsx

Reads store.selection. Exact Elementor right panel.

── NO SELECTION ─────────────────────────────────────────
Show page settings panel:
- Page Title
- Status (draft / published)
- Slug
- Featured Image
- "Apply" button calls Inertia router.patch to update page meta

── SECTION SELECTED ─────────────────────────────────────
Panel header: "Edit Section" with breadcrumb
3 tabs: LAYOUT | STYLE | ADVANCED

LAYOUT tab:
  Content Width (boxed/full width/full width stretched)
  Columns Gap (no/narrow/default/extended/wide/wider — visual select)
  Height (default / min height / fit to screen)
  Vertical Align (top / middle / bottom / space between)
  Overflow Hidden (toggle)
  HTML Tag (select: div/section/article/header/footer/aside/nav/main)
  Column Position

STYLE tab:
  Background (type selector: None / Classic / Gradient / Image — same as Elementor)
    Classic: color picker
    Gradient: type, angle, color stops (dual color pickers with stop % sliders)
    Image: URL + upload, position, size, repeat, attachment
  Background Overlay (color + opacity slider)
  Border: type / width (4 sides linked or unlinked) / color / radius
  Box Shadow (toggle → offset X/Y, blur, spread, color, position)
  Shape Divider Top / Bottom (type dropdown, color, width, height, flip, front toggle)

ADVANCED tab:
  Margin (4 sides with link toggle, with responsive switcher)
  Padding (4 sides with link toggle, with responsive switcher)
  Z-Index
  CSS ID
  CSS Classes
  Motion Effects (entrance animation select, duration, delay)
  Sticky (none/top/bottom)
  Custom CSS (CodeMirror-style textarea)

── COLUMN SELECTED ──────────────────────────────────────
Panel header: "Edit Column" with breadcrumb (Section > Column)
3 tabs: LAYOUT | STYLE | ADVANCED

LAYOUT tab:
  Column Width (% input with responsive switcher)
  Vertical Align
  Horizontal Align
  Spacing (column gap contribution)
  HTML Tag

STYLE tab:
  Background (same full background control as section)
  Border / Border Radius / Box Shadow

ADVANCED tab: same as Section ADVANCED tab

── WIDGET SELECTED ──────────────────────────────────────
Panel header: "Edit {WidgetLabel}" with breadcrumb (Section > Column > Widget)
3 tabs: CONTENT | STYLE | ADVANCED

CONTENT tab: widget-specific fields (see Phase 4B)

STYLE tab: widget-specific style fields (see Phase 4B)
  Always includes at bottom:
  Typography control (font family, size, weight, transform, style, decoration, line-height, letter-spacing)
  Text Color / Background Color
  Padding / Margin

ADVANCED tab:
  Same as Section ADVANCED tab
  Plus: Position (default/absolute/fixed), Entrance Animation

Every control in the panel reflects and updates live via store actions.
Responsive switcher (desktop/tablet/mobile icon toggle) appears next to
any property that supports ResponsiveValue.
```

---

## PHASE 4 — Widget System

### Prompt 4A — Widget renderers (PageRenderer)
```
## Task: Page Builder — PageRenderer + Widget Renderers

Create resources/js/Components/Builder/PageRenderer.tsx

This is the SINGLE source of truth for rendering — used in both:
1. The builder canvas (live preview)
2. The production SSR Inertia page (/pages/{slug})

Props:
interface PageRendererProps {
  layout: BuilderLayout
  device?: DeviceMode        // optional, used in builder for responsive preview
  isBuilder?: boolean        // true = builder mode (no animations, no scripts)
}

PageRenderer maps over sections → columns → widgets and renders each.

Apply section/column settings as inline styles (compute from settings object).
For ResponsiveValue, use the active device value (fall back: desktop → tablet → mobile).

Create resources/js/Components/Builder/Widgets/ with one file per widget:

HeadingWidget.tsx
  CONTENT: text (inline editable in builder via contentEditable + onBlur)
  tag: dynamic React element (h1-h6)
  STYLE: typography, text color, text shadow, blend mode
  Renders: <Tag style={computedStyles}>{text}</Tag>

TextWidget.tsx
  CONTENT: content (rich text — use a simple contentEditable div in builder,
  raw dangerouslySetInnerHTML on frontend)
  STYLE: typography, text color, columns (CSS multi-column), drop cap

ImageWidget.tsx
  CONTENT: url, alt, link, caption, lazyLoad
  STYLE: width, max-width, height, object-fit, border, border-radius, box-shadow,
  opacity, CSS filter (blur, brightness, contrast, saturation, hue)
  CSS/hover animations
  Renders: optional <a> wrapping <figure><img><figcaption>

ButtonWidget.tsx
  CONTENT: text, link, target, icon, icon position, size, type
  STYLE: typography, text color, background color, border, border-radius,
  padding, box-shadow, hover color/bg/border (CSS :hover via generated class)

DividerWidget.tsx
  Icon divider support (centered icon in divider line)
  Style: weight, style, color, width, element spacing
  Gap before/after

SpacerWidget.tsx
  Shows height visually in builder with drag handle to resize height
  Desktop/tablet/mobile separate heights

VideoWidget.tsx
  YouTube / Vimeo / self-hosted
  Lightbox mode (click thumbnail → modal)
  Overlay play button
  Image overlay / placeholder thumbnail

IconWidget.tsx
  Use lucide-react icons
  View: default / stacked / framed
  Shape: circle / square

ImageBoxWidget.tsx
  Image + title + description
  Image position: top / left / right
  Hover animation on image

IconBoxWidget.tsx
  Icon + title + description
  Icon position: top / left / right

TestimonialWidget.tsx
  Quote / name / title / image / rating
  Layout: default / bubble / image inline

CounterWidget.tsx
  Animated number count-up (use useEffect + requestAnimationFrame, disabled in builder)

ProgressBarWidget.tsx
  Animated progress bar (animation disabled in builder)
  Label + percentage label positions

AlertWidget.tsx
  type = info/success/warning/danger → color scheme
  dismissible: adds close button that hides the alert

AccordionWidget.tsx
  Items list, expand/collapse
  Icon closed/open (customizable)
  In builder: all items expanded (no animation)

TabsWidget.tsx
  Horizontal tab list + content panels
  In builder: show all tab contents stacked

StarRatingWidget.tsx
  Visual stars, fractional support, custom icon

SocialIconsWidget.tsx
  Platform list with icons, links, shape/size controls

GoogleMapsWidget.tsx
  Embedded iframe with address + zoom
  In builder: show a placeholder with address text (don't load iframe)

HtmlWidget.tsx
  Raw HTML — show <pre> in builder, render in frontend

For each widget export:
  - default component
  - widgetMeta: { type, label, icon, category, defaultContent, defaultStyle }
```

---

### Prompt 4B — Widget Content/Style panels (Right Panel controls)
```
## Task: Page Builder — Widget Settings Controls

Create resources/js/Components/Builder/Controls/ with reusable control components:

TextControl.tsx          — label + text input
TextareaControl.tsx      — label + textarea
RichTextControl.tsx      — label + contentEditable div (basic formatting)
NumberControl.tsx        — label + number input + optional unit select
SelectControl.tsx        — label + select dropdown
ToggleControl.tsx        — label + toggle switch
ColorControl.tsx         — label + color swatch → popover with react-colorful
                           supports HEX / RGB / RGBA with opacity slider
MediaControl.tsx         — label + image preview + "Choose Image" button
                           opens a MediaLibrary modal (Phase 5)
URLControl.tsx           — label + URL input + target toggle (_self/_blank)
IconControl.tsx          — label + icon preview + "Choose Icon" picker modal
                           shows searchable lucide-react icon grid
DimensionsControl.tsx    — 4 inputs (top/right/bottom/left) + link-all toggle
                           responsive switcher icon (desktop/tablet/mobile)
TypographyControl.tsx    — collapsible section with:
                           font family (system fonts + Google Fonts dropdown)
                           font size (number + unit, with responsive switcher)
                           font weight (select)
                           line height (number + unit)
                           letter spacing (number + em)
                           text transform (buttons: none/CAPS/lower/Title)
                           font style (normal/italic)
                           text decoration (none/underline/overline/line-through)
BackgroundControl.tsx    — type switcher (None/Classic/Gradient/Image)
                           Classic: ColorControl
                           Gradient: angle + 2 color stops with position sliders
                           Image: MediaControl + position/size/repeat/attachment selects
BorderControl.tsx        — border type select + width (DimensionsControl) + ColorControl
BoxShadowControl.tsx     — toggle + offset X/Y + blur + spread + color + inset toggle
SliderControl.tsx        — label + range slider + number input + unit

Create widget settings panels:
resources/js/Components/Builder/WidgetSettings/
  HeadingSettings.tsx    — CONTENT: TextControl(text) + SelectControl(tag) + URLControl(link)
                           STYLE: typography, text color, text shadow, alignment, blend mode
  TextSettings.tsx       — CONTENT: RichTextControl + ToggleControl(dropCap)
                           STYLE: typography, text color, column count
  ImageSettings.tsx      — CONTENT: MediaControl, TextControl(alt), URLControl, ToggleControl(lazy)
                           STYLE: width/max-width/height, CSS filters, border, border-radius, box-shadow, opacity
  ButtonSettings.tsx     — CONTENT: TextControl(label)+URLControl+IconControl+SelectControl(size/type)
                           STYLE: typography, color, bg, border, border-radius, padding, box-shadow
                           (with Normal/Hover tabs for color states)
  VideoSettings.tsx      — CONTENT: SelectControl(source)+TextControl(url)+toggles+NumberControl(start/end)
                           STYLE: aspect ratio, border, css filter
  [... one settings file per widget type following the same pattern]
```

---

## PHASE 5 — Media Library Modal & DnD Wiring

### Prompt 5A — Media Library Modal
```
## Task: Page Builder — Media Library Modal

Create resources/js/Components/Builder/MediaLibraryModal.tsx

A full-screen modal (z-50) that opens when any MediaControl triggers it.

Layout: 2-panel
  Left (w-64): Upload area + filter sidebar (All / Images / Videos / Documents)
  Right (flex-1): grid of media items

Features:
- Drag-and-drop file upload zone (react-dropzone: npm install react-dropzone)
  On drop: POST to /admin/media/upload, refresh grid on success
- Search input (filters by filename)
- Grid items: thumbnail (image) or file icon (other types)
  Show: filename, dimensions (images), size
- Click item: select it (blue ring)
- "Insert Media" button: calls onSelect(url) callback and closes modal
- "Delete" button per item (with confirm)

Fetch media list from: GET /admin/media (returns PaginatedResponse<MediaItem>)
Infinite scroll or load-more pagination.

This modal is triggered from MediaControl via a global modal store:
Create resources/js/stores/mediaModalStore.ts (Zustand):
  isOpen: boolean
  onSelect: ((url: string) => void) | null
  openModal(callback: (url: string) => void): void
  closeModal(): void

MediaControl calls mediaModalStore.openModal((url) => { ...update widget... })
Mount <MediaLibraryModal> once in Editor.tsx.
```

---

### Prompt 5B — Full DnD Wiring
```
## Task: Page Builder — Complete DnD Implementation

Wrap the entire Editor.tsx content in a single <DndContext> from @dnd-kit/core.

Configure sensors:
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  useSensor(KeyboardSensor)

onDragStart:
  — Identify what is being dragged by id prefix:
    'widget-palette::' → new widget from library (set drag.dragType = 'new-widget')
    existing widget id → moving existing widget (set drag.dragType = 'existing-widget')
    existing section id → moving section (set drag.dragType = 'section')
  — Update store.drag state

onDragOver:
  — Determine current over target (column or between-widget insertion point)
  — Show blue insertion line in ColumnBlock at correct position

onDragEnd:
  — If dragType = 'new-widget':
      Get widgetType from id suffix
      Get target column from over.id
      Get insertion index from over.data
      Call store.addWidget(sectionId, columnId, widgetType, index)
  — If dragType = 'existing-widget':
      If same column: store.reorderWidgets(...)
      If different column: store.moveWidget(...)
  — If dragType = 'section':
      store.reorderSections(fromIndex, toIndex)
  — Clear store.drag state

onDragCancel:
  — Clear store.drag state

DragOverlay:
  — While dragging, show a floating ghost:
    new-widget: widget palette card with type label
    existing-widget: semi-transparent widget preview
    section: section handle chip

ColumnBlock drop zones:
  Each column registers as droppable (useDroppable) with data:
  { sectionId, columnId, accepts: ['widget', 'new-widget'] }

WidgetBlock sortable:
  Each widget uses useSortable with data:
  { type: 'widget', sectionId, columnId, widgetId, index }

SectionBlock sortable:
  Sections wrapped in <SortableContext> with verticalListSortingStrategy

Column resize handle:
  Between adjacent columns: draggable divider using useDraggable
  onDrag: compute dx as % of section width, update both column widths
  Constrain: minimum column width 10%
```

---

## PHASE 6 — SSR Renderer & Public Output

### Prompt 6A — Production SSR Render page
```
## Task: Page Builder — SSR Page Renderer

Create resources/js/Pages/Public/PageView.tsx

This is the Inertia page rendered by PublicPageController.
Props: { page: Page, layout: BuilderLayout }

Renders: <PageRenderer layout={layout} isBuilder={false} />

PageRenderer in non-builder mode:
- Applies all motion effects (CSS animations via Intersection Observer)
- Loads counter animations
- Renders actual Google Maps iframes
- Renders actual Video iframes
- Injects section/widget custom CSS via a <style> tag in the component

Create resources/js/Pages/Admin/Builder/PreviewFrame.tsx
Props: { page: Page, layout: BuilderLayout }
Same as PageView but with a top bar showing:
  "← Back to Editor" button + "Desktop | Tablet | Mobile" switcher
  Renders in an iframe-like centered container that respects device width
  Component.layout = null (no AdminLayout)

Update PublicPageController in Laravel:
  return Inertia::render('Public/PageView', [
    'page' => $page->only(['id','title','slug','meta_title','meta_description']),
    'layout' => $page->layout
  ]);

Add SEO meta tags for page:
In PageView.tsx use Inertia's <Head> component:
  <Head>
    <title>{page.meta_title ?? page.title}</title>
    <meta name="description" content={page.meta_description ?? ''} />
  </Head>
```

---

## PHASE 7 — Polish & Elementor Parity

### Prompt 7A — Global Site Settings panel
```
## Task: Page Builder — Global Settings

Add a "Hamburger → Site Settings" panel in the TopBar.

Opens a slide-over right drawer with:

GLOBAL COLORS
  - Color palette: Primary / Secondary / Accent / Text
  Each: label + ColorControl
  Updates layout.globalStyles in store

GLOBAL TYPOGRAPHY
  Body font: TypographyControl
  Heading font: TypographyControl
  These are injected as CSS variables:
    --global-primary-color, --global-font-body, etc.
  Applied via a <style> tag in PageRenderer root

PAGE SETTINGS
  Stretch section: toggle
  Custom CSS (full page): large textarea
  User CSS injected in a <style> tag by PageRenderer
```

---

### Prompt 7B — Keyboard shortcuts + UI polish
```
## Task: Page Builder — Keyboard Shortcuts & Polish

Add keyboard shortcut handler in Editor.tsx (keydown event on window):

Ctrl+Z → store.undo()
Ctrl+Shift+Z → store.redo()
Ctrl+S → trigger save
Escape → store.clearSelection()
Ctrl+D → duplicate selected element (section/column/widget)
Delete / Backspace (when not in input) → delete selected element
Ctrl+C → copy selected widget to clipboard state (store: copiedWidget)
Ctrl+V → paste copied widget into same column after selected

Add right-click context menu on elements (use @floating-ui/react for positioning):
  Section right-click: Edit | Duplicate | Move Up | Move Down | Delete
  Widget right-click: Edit | Duplicate | Copy Style | Paste Style | Delete

Copy/Paste Style:
  store.copiedStyle: SharedStyleSettings | null
  copyStyle(sectionId, columnId, widgetId) — stores current widget style
  pasteStyle(sectionId, columnId, widgetId) — applies copiedStyle to target widget

Section handles:
  On hover show bottom center: "+ Add Section" button
  On section handle bar: show column preset picker as a popover
  Clicking a preset rebuilds section columns

Add a "Navigator" highlight sync:
  When selection changes → scroll the Navigator tab to show the selected item
  When hovering an item in Navigator → highlight that element in canvas (dashed yellow border)

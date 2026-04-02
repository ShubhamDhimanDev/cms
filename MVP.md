# Task: Generate a Small CMS in Laravel 13

## Stack
- Laravel 13, PHP 8.4
- Inertia 3 + React 19 + TypeScript
- Vite, Tailwind CSS v4
- MySQL (currently sqlite)
- Spatie Laravel Permission — install via composer: `composer require spatie/laravel-permission`
- Spatie Laravel MediaLibrary — install via composer: `composer require spatie/laravel-medialibrary`

## What to Build
A self-contained CMS with an `/admin` panel covering: Pages, Blog/Posts, and Media Manager.
Use the existing AGENTS.md, MCP, and skills context from Laravel Boost 2 throughout.

---

## STEP 1 — Install Packages

Run the following in order:
```bash
composer require spatie/laravel-permission
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
```

---

## STEP 2 — Migrations

Generate and write migrations for:

**pages**
- id, title (string), slug (string, unique), content (longText),
  meta_title (string, nullable), meta_description (text, nullable),
  status (enum: draft/published, default: draft),
  published_at (timestamp, nullable), timestamps, softDeletes

**posts**
- id, title (string), slug (string, unique), excerpt (text, nullable),
  content (longText), status (enum: draft/published, default: draft),
  published_at (timestamp, nullable), user_id (FK → users),
  timestamps, softDeletes

**categories**
- id, name (string), slug (string, unique), description (text, nullable), timestamps

**post_category** (pivot)
- post_id (FK), category_id (FK), primary key on both

Then run: `php artisan migrate`

---

## STEP 3 — Models

Use `php artisan make:model` for each. Then fill in:

**Page**
- fillable: title, slug, content, meta_title, meta_description, status, published_at
- Use SoftDeletes
- Implement HasMedia + InteractsWithMedia (Spatie)
- Register media collection: `featured_image` with single file rule

**Post**
- fillable: title, slug, excerpt, content, status, published_at, user_id
- Relationships: belongsTo(User), belongsToMany(Category) via post_category
- Use SoftDeletes
- Implement HasMedia + InteractsWithMedia
- Register media collection: `featured_image` with single file rule

**Category**
- fillable: name, slug, description
- Relationship: belongsToMany(Post)

In both Page and Post `boot()` method, auto-generate slug from title using
`Str::slug()` if slug is empty on `saving` event.

---

## STEP 4 — Controllers

Generate skeletons first:
```bash
php artisan make:controller Admin/DashboardController --invokable
php artisan make:controller Admin/PageController --resource
php artisan make:controller Admin/PostController --resource
php artisan make:controller Admin/CategoryController --resource
php artisan make:controller Admin/MediaController --resource
```

Then fill in logic:

**DashboardController** — return Inertia::render('Admin/Dashboard/Index') with props:
- totalPages (count), totalPosts (count), totalMedia (Media::count() from Spatie)

**PageController**
- index: paginate pages (15/page), return to Admin/Pages/Index
- create: return Admin/Pages/Create
- store: validate via StorePageRequest, create Page, handle featured_image upload, redirect with flash
- edit: return Admin/Pages/Edit with page resource
- update: validate via UpdatePageRequest, update page, swap media if new file uploaded, redirect with flash
- destroy: soft delete, redirect with flash

**PostController** — same pattern as PageController, additionally:
- On store/update: sync categories via `$post->categories()->sync($request->category_ids)`
- Pass categories list as prop to Create/Edit pages

**CategoryController** — only index, store, update, destroy (no dedicated create/edit pages)
- Return all categories on index as JSON-friendly props
- Handle store/update inline via modals on the frontend

**MediaController**
- index: return paginated Spatie Media records (20/page) with url, name, size, mime_type
- destroy: find media by id, delete it, return redirect with flash

---

## STEP 5 — Form Requests

Generate via artisan, then fill rules:
```bash
php artisan make:request Admin/StorePageRequest
php artisan make:request Admin/UpdatePageRequest
php artisan make:request Admin/StorePostRequest
php artisan make:request Admin/UpdatePostRequest
php artisan make:request Admin/StoreCategoryRequest
php artisan make:request Admin/UpdateCategoryRequest
```

**Page rules (store):** title required|string|max:255, slug nullable|unique:pages,slug,
content required, status in:draft,published, featured_image nullable|image|max:2048

**Page rules (update):** same but slug unique ignores current page id

**Post rules:** same as page rules + category_ids nullable|array, category_ids.* exists:categories,id

**Category rules:** name required|string|max:100, slug nullable|unique:categories,slug

---

## STEP 6 — Routes

In `routes/web.php`, add inside auth middleware:
```php
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::resource('pages', PageController::class);
    Route::resource('posts', PostController::class);
    Route::resource('categories', CategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('media', MediaController::class)->only(['index', 'destroy']);
});
```

---

## STEP 7 — TypeScript Types

Create `resources/js/types/cms.d.ts` with interfaces:
```ts
export interface Page {
  id: number
  title: string
  slug: string
  content: string
  meta_title: string | null
  meta_description: string | null
  status: 'draft' | 'published'
  published_at: string | null
  featured_image_url: string | null
  created_at: string
}

export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  featured_image_url: string | null
  categories: Category[]
  author: { id: number; name: string }
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
}

export interface MediaItem {
  id: number
  name: string
  file_name: string
  url: string
  mime_type: string
  size: number
  human_readable_size: string
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  links: { url: string | null; label: string; active: boolean }[]
}
```

---

## STEP 8 — React Pages (Inertia)

Create the following under `resources/js/Pages/Admin/`:

### AdminLayout.tsx
Sidebar layout with nav links: Dashboard, Pages, Posts, Categories, Media.
Use `usePage()` to get current URL for active link highlight.
Show flash message banner if `usePage().props.flash?.success` exists.
Wrap all admin pages in this layout using Inertia's persistent layouts pattern:
`Component.layout = (page) => <AdminLayout>{page}</AdminLayout>`

### Dashboard/Index.tsx
Props: `{ totalPages: number, totalPosts: number, totalMedia: number }`
Render 3 stat cards in a responsive grid. Clean, minimal Tailwind styling.

### Pages/Index.tsx
Props: `{ pages: PaginatedResponse<Page> }`
Table: Title, Status badge (green=published, gray=draft), Published At, Actions (Edit link, Delete button with confirm dialog).
Pagination links at bottom.
"New Page" button links to admin.pages.create.

### Pages/Create.tsx and Pages/Edit.tsx
Props for Edit: `{ page: Page }`
Form fields:
- Title (text input — on blur, auto-fill slug if slug is empty)
- Slug (text input, editable)
- Content (textarea, large)
- Meta Title (text input)
- Meta Description (textarea, small)
- Status (select: draft / published)
- Published At (datetime-local input, shown only when status=published)
- Featured Image (file input, show current image preview on Edit)
Use `useForm` from `@inertiajs/react`. Show `form.errors` under each field.

### Posts/Index.tsx
Props: `{ posts: PaginatedResponse<Post> }`
Table: Title, Categories (comma-separated badges), Author, Status badge, Actions.
"New Post" button.

### Posts/Create.tsx and Posts/Edit.tsx
Props for Edit: `{ post: Post, categories: Category[] }`
Same fields as Page form plus:
- Excerpt (textarea)
- Categories (multi-checkbox list or multi-select)
- Featured Image upload

### Categories/Index.tsx
Props: `{ categories: Category[] }`
Table with inline Add Category form at the top (name + slug fields + Save button).
Each row has Edit (inline, row turns into inputs) and Delete button.
Use `router.post` / `router.patch` / `router.delete` from Inertia for all actions.
No separate page needed.

### Media/Index.tsx
Props: `{ media: PaginatedResponse<MediaItem> }`
Responsive image grid. Each card shows: thumbnail (if image), filename, size, mime type.
Click on URL → copy to clipboard (show brief "Copied!" toast).
Delete button with confirm.
File upload area at the top (drag-and-drop or click to upload).
On upload: POST to a dedicated upload route that calls `$page->addMediaFromRequest()` on a
general `Media` model — create a `MediaUploadController` with a single `store` method for this.

---

## STEP 9 — Media Upload Route

Add to routes:
```php
Route::post('media/upload', [MediaUploadController::class, 'store'])->name('admin.media.upload');
```

Create `MediaUploadController`:
- Accept `file` (required|file|max:10240|mimes:jpg,jpeg,png,gif,webp,pdf,svg)
- Use a plain Eloquent model `MediaLibraryModel` (or use Spatie's built-in `Media` model directly)
- Better: keep a `cms_media` pivot by creating a `CmsMedia` model that implements `HasMedia`,
  then call `$record->addMediaFromRequest('file')->toMediaCollection('cms')` on a singleton record.
- Return redirect back with flash: `['success' => 'File uploaded.']`

---

## STEP 10 — Seeders
```bash
php artisan make:seeder AdminUserSeeder
php artisan make:seeder SampleContentSeeder
```

**AdminUserSeeder:** Create user name=Admin, email=admin@cms.test, password=bcrypt('password').

**SampleContentSeeder:** Create 3 sample pages and 3 sample posts (status: published).

In `DatabaseSeeder`: call both seeders. Run `php artisan db:seed`.

---

## Coding Conventions (enforce throughout)
- Always generate artisan skeleton first, then fill logic — never write a class from scratch
- Controllers stay thin: if store/update logic exceeds ~20 lines, extract to a PageService or PostService class
- All Inertia::render() calls must pass typed, explicit props — no compact(), no with()
- TypeScript strict mode: all component props must use interfaces from `cms.d.ts`
- Tailwind only — no inline styles, no custom CSS files
- Flash messages via session()->flash('success', '...') on all redirects
- Soft deletes on Page and Post — never hard delete from controllers
- Media handled exclusively through Spatie MediaLibrary — no manual storage calls

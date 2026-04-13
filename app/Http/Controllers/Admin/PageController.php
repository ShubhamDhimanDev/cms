<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePageRequest;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $pages = Page::query()
            ->latest()
            ->paginate(15)
            ->through(fn (Page $page): array => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'builder_data' => $page->builder_data,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'status' => $page->status,
                'published_at' => $page->published_at?->toISOString(),
                'featured_image_url' => $page->getFirstMediaUrl('featured_image') ?: null,
                'created_at' => $page->created_at?->toISOString(),
            ]);

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create');
    }

    /**
     * Create a draft page and open it in the builder.
     */
    public function builderCreate(): RedirectResponse
    {
        $baseSlug = 'untitled-page';
        $slug = $baseSlug;
        $counter = 2;

        while (Page::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        $page = Page::create([
            'title' => 'Untitled Page',
            'slug' => $slug,
            'content' => '',
            'status' => 'draft',
            'layout' => ['sections' => []],
        ]);

        return to_route('admin.pages.builder', $page)
            ->with('success', 'Draft page created. You are now in the builder.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request): RedirectResponse
    {
        $page = Page::create($request->safe()->except('featured_image'));

        if ($request->hasFile('featured_image')) {
            $page->addMediaFromRequest('featured_image')->toMediaCollection('featured_image');
        }

        return to_route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'builder_data' => $page->builder_data,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'status' => $page->status,
                'published_at' => $page->published_at?->toISOString(),
                'featured_image_url' => $page->getFirstMediaUrl('featured_image') ?: null,
                'created_at' => $page->created_at?->toISOString(),
            ],
        ]);
    }

    /**
     * Display the full-screen page builder.
     */
    public function builder(Page $page): Response
    {
        return Inertia::render('Admin/Builder/Index', [
            'page' => $page,
        ]);
    }

    /**
     * Load the current page builder layout.
     */
    public function builderLoad(Page $page): JsonResponse
    {
        return response()->json([
            'layout' => $page->layout ?? ['sections' => []],
        ]);
    }

    /**
     * Persist the page builder layout.
     */
    public function builderSave(Request $request, Page $page): JsonResponse
    {
        $request->validate([
            'layout' => ['required', 'array'],
        ]);

        $page->update([
            'layout' => $request->layout,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Layout saved.',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        $page->update($request->safe()->except('featured_image'));

        if ($request->hasFile('featured_image')) {
            $page->clearMediaCollection('featured_image');
            $page->addMediaFromRequest('featured_image')->toMediaCollection('featured_image');
        }

        return to_route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return to_route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}

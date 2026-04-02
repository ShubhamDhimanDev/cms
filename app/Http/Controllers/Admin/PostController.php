<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $posts = Post::query()
            ->with(['user:id,name', 'categories:id,name,slug'])
            ->withCount(['comments as pending_comments_count' => fn ($q) => $q->where('is_approved', false)])
            ->latest()
            ->paginate(15)
            ->through(fn (Post $post): array => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'status' => $post->status,
                'published_at' => $post->published_at?->toISOString(),
                'featured_image_url' => $post->getFirstMediaUrl('featured_image') ?: null,
                'categories' => $post->categories->map(fn (Category $category): array => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                ])->values()->all(),
                'author' => [
                    'id' => $post->user?->id,
                    'name' => $post->user?->name,
                ],
                'created_at' => $post->created_at?->toISOString(),
                'comments_enabled' => $post->comments_enabled,
                'comments_require_approval' => $post->comments_require_approval,
                'pending_comments_count' => (int) ($post->pending_comments_count ?? 0),
            ]);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Create', [
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'description']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $post = Post::create([
            ...$request->safe()->except(['featured_image', 'category_ids']),
            'user_id' => $request->user()->id,
        ]);

        $post->categories()->sync($request->input('category_ids', []));

        if ($request->hasFile('featured_image')) {
            $post->addMediaFromRequest('featured_image')->toMediaCollection('featured_image');
        } elseif ($request->filled('featured_image_url')) {
            $post->addMediaFromUrl($request->input('featured_image_url'))->toMediaCollection('featured_image');
        }

        return to_route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Post $post): Response
    {
        $post->load(['categories:id,name,slug,description', 'user:id,name']);

        return Inertia::render('Admin/Posts/Edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'status' => $post->status,
                'published_at' => $post->published_at?->toISOString(),
                'featured_image_url' => $post->getFirstMediaUrl('featured_image') ?: null,
                'categories' => $post->categories->map(fn (Category $category): array => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                ])->values()->all(),
                'author' => [
                    'id' => $post->user?->id,
                    'name' => $post->user?->name,
                ],
                'created_at' => $post->created_at?->toISOString(),
                'comments_enabled' => $post->comments_enabled,
                'comments_require_approval' => $post->comments_require_approval,
            ],
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'description']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->safe()->except(['featured_image', 'featured_image_url', 'category_ids']));
        $post->categories()->sync($request->input('category_ids', []));

        if ($request->hasFile('featured_image')) {
            $post->clearMediaCollection('featured_image');
            $post->addMediaFromRequest('featured_image')->toMediaCollection('featured_image');
        } elseif ($request->filled('featured_image_url')) {
            $post->clearMediaCollection('featured_image');
            $post->addMediaFromUrl($request->input('featured_image_url'))->toMediaCollection('featured_image');
        }

        return to_route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return to_route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }
}

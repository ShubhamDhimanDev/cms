<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostComment;
use Inertia\Inertia;
use Inertia\Response;

class PublicPostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->with(['user:id,name', 'categories:id,name,slug'])
            ->where('status', 'published')
            ->where(function ($query): void {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->orderByDesc('published_at')
            ->latest('id')
            ->paginate(9)
            ->through(fn (Post $post): array => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'keywords' => $post->keywords,
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
            ]);

        return Inertia::render('Public/Blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::query()
            ->with(['user:id,name', 'categories:id,name,slug'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where(function ($query): void {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->firstOrFail();

        $comments = PostComment::query()
            ->where('post_id', $post->id)
            ->where('is_approved', true)
            ->whereNull('parent_id')
            ->with(['replies' => fn ($q) => $q->where('is_approved', true)->with('replies')])
            ->latest()
            ->get()
            ->map(fn (PostComment $comment): array => $this->formatComment($comment))
            ->values()
            ->all();

        return Inertia::render('Public/Blog/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'keywords' => $post->keywords,
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
                'comments' => $comments,
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function formatComment(PostComment $comment): array
    {
        return [
            'id' => $comment->id,
            'parent_id' => $comment->parent_id,
            'name' => $comment->name,
            'website' => $comment->website,
            'body' => $comment->body,
            'created_at' => $comment->created_at?->toISOString(),
            'replies' => $comment->replies->map(fn (PostComment $reply): array => $this->formatComment($reply))->values()->all(),
        ];
    }
}

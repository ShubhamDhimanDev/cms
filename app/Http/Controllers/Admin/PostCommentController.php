<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostComment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostCommentController extends Controller
{
    public function index(): Response
    {
        $comments = PostComment::query()
            ->with('post:id,title,slug')
            ->when(request('status') === 'pending', fn ($q) => $q->where('is_approved', false))
            ->when(request('status') === 'approved', fn ($q) => $q->where('is_approved', true))
            ->latest()
            ->paginate(20)
            ->through(fn (PostComment $comment): array => [
                'id' => $comment->id,
                'post' => [
                    'id' => $comment->post?->id,
                    'title' => $comment->post?->title,
                    'slug' => $comment->post?->slug,
                ],
                'parent_id' => $comment->parent_id,
                'name' => $comment->name,
                'email' => $comment->email,
                'website' => $comment->website,
                'body' => $comment->body,
                'is_approved' => $comment->is_approved,
                'created_at' => $comment->created_at?->toISOString(),
            ]);

        $pendingCount = PostComment::where('is_approved', false)->count();

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments,
            'pendingCount' => $pendingCount,
            'currentStatus' => request('status', 'all'),
        ]);
    }

    public function approve(PostComment $comment): RedirectResponse
    {
        $comment->update(['is_approved' => true]);

        return back()->with('success', 'Comment approved.');
    }

    public function destroy(PostComment $comment): RedirectResponse
    {
        $comment->delete();

        return back()->with('success', 'Comment deleted.');
    }
}

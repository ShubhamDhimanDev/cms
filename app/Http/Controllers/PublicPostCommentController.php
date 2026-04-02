<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostCommentRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

class PublicPostCommentController extends Controller
{
    public function store(Post $post, StorePostCommentRequest $request): RedirectResponse
    {
        if (! $post->comments_enabled) {
            abort(403, 'Comments are disabled for this post.');
        }

        $post->comments()->create([
            'parent_id' => $request->input('parent_id'),
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'body' => $request->input('body'),
            'is_approved' => ! $post->comments_require_approval,
            'ip_address' => $request->ip(),
        ]);

        $message = $post->comments_require_approval
            ? 'Your comment is awaiting moderation.'
            : 'Comment posted successfully.';

        return back()->with('success', $message);
    }
}

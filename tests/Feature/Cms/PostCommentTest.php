<?php

use App\Models\Post;
use App\Models\PostComment;
use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Spatie\Permission\Models\Role;

function makePublishedPost(array $overrides = []): Post
{
    $author = User::factory()->create();

    return Post::query()->create(array_merge([
        'title' => 'Test Post',
        'slug' => 'test-post-'.uniqid(),
        'content' => [],
        'status' => 'published',
        'published_at' => now()->subMinute(),
        'user_id' => $author->id,
        'comments_enabled' => true,
        'comments_require_approval' => true,
    ], $overrides));
}

function makeAdminUser(): User
{
    Role::findOrCreate('admin', 'web');
    $user = User::factory()->create();
    $user->assignRole('admin');

    return $user;
}

it('shows approved comments on a public blog post', function () {
    $post = makePublishedPost();

    $approvedComment = PostComment::query()->create([
        'post_id' => $post->id,
        'name' => 'Alice',
        'email' => 'alice@example.com',
        'body' => 'Great article!',
        'is_approved' => true,
    ]);

    PostComment::query()->create([
        'post_id' => $post->id,
        'name' => 'Bob',
        'email' => 'bob@example.com',
        'body' => 'Pending comment',
        'is_approved' => false,
    ]);

    $this->get("/blog/{$post->slug}")
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Public/Blog/Show')
            ->where('post.comments.0.name', 'Alice')
            ->missing('post.comments.1')
        );
});

it('stores a comment that requires approval', function () {
    $post = makePublishedPost(['comments_require_approval' => true]);

    $this->post("/blog/{$post->slug}/comments", [
        'name' => 'Carol',
        'email' => 'carol@example.com',
        'body' => 'Interesting perspective.',
    ])->assertRedirect();

    $comment = PostComment::query()->where('post_id', $post->id)->first();

    expect($comment)->not->toBeNull()
        ->and($comment->name)->toBe('Carol')
        ->and($comment->is_approved)->toBeFalse();
});

it('auto-approves a comment when approval is not required', function () {
    $post = makePublishedPost(['comments_require_approval' => false]);

    $this->post("/blog/{$post->slug}/comments", [
        'name' => 'Dave',
        'email' => 'dave@example.com',
        'body' => 'No moderation needed.',
    ])->assertRedirect();

    $comment = PostComment::query()->where('post_id', $post->id)->first();

    expect($comment->is_approved)->toBeTrue();
});

it('rejects a comment when comments are disabled', function () {
    $post = makePublishedPost(['comments_enabled' => false]);

    $this->post("/blog/{$post->slug}/comments", [
        'name' => 'Eve',
        'email' => 'eve@example.com',
        'body' => 'Should be blocked.',
    ])->assertForbidden();
});

it('supports threaded replies', function () {
    $post = makePublishedPost(['comments_require_approval' => false]);

    $parent = PostComment::query()->create([
        'post_id' => $post->id,
        'name' => 'Parent',
        'email' => 'parent@example.com',
        'body' => 'Parent comment',
        'is_approved' => true,
    ]);

    $this->post("/blog/{$post->slug}/comments", [
        'parent_id' => $parent->id,
        'name' => 'Child',
        'email' => 'child@example.com',
        'body' => 'Reply to parent',
    ])->assertRedirect();

    $reply = PostComment::query()->where('parent_id', $parent->id)->first();

    expect($reply)->not->toBeNull()
        ->and($reply->name)->toBe('Child')
        ->and($reply->is_approved)->toBeTrue();
});

it('shows the admin comments moderation page', function () {
    $admin = makeAdminUser();

    $this->actingAs($admin)
        ->get('/admin/comments')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page->component('Admin/Comments/Index'));
});

it('allows an admin to approve a pending comment', function () {
    $admin = makeAdminUser();

    $post = makePublishedPost();
    $comment = PostComment::query()->create([
        'post_id' => $post->id,
        'name' => 'Pending User',
        'email' => 'pending@example.com',
        'body' => 'Awaiting approval',
        'is_approved' => false,
    ]);

    $this->actingAs($admin)
        ->patch("/admin/comments/{$comment->id}/approve")
        ->assertRedirect();

    expect($comment->fresh()->is_approved)->toBeTrue();
});

it('allows an admin to delete a comment', function () {
    $admin = makeAdminUser();

    $post = makePublishedPost();
    $comment = PostComment::query()->create([
        'post_id' => $post->id,
        'name' => 'Delete Me',
        'email' => 'delete@example.com',
        'body' => 'This will be deleted',
        'is_approved' => true,
    ]);

    $this->actingAs($admin)
        ->delete("/admin/comments/{$comment->id}")
        ->assertRedirect();

    expect(PostComment::find($comment->id))->toBeNull();
});

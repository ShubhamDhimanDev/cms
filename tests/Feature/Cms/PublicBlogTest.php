<?php

use App\Models\Post;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

it('renders the blog listing with published posts only', function () {
    $author = User::factory()->create();

    Post::query()->create([
        'title' => 'Published Post',
        'slug' => 'published-post',
        'excerpt' => 'Visible post excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Visible content']],
        'status' => 'published',
        'published_at' => now()->subHour(),
        'user_id' => $author->id,
    ]);

    Post::query()->create([
        'title' => 'Draft Post',
        'slug' => 'draft-post',
        'excerpt' => 'Hidden draft excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Hidden draft content']],
        'status' => 'draft',
        'published_at' => now()->subHour(),
        'user_id' => $author->id,
    ]);

    Post::query()->create([
        'title' => 'Future Post',
        'slug' => 'future-post',
        'excerpt' => 'Hidden future excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Hidden future content']],
        'status' => 'published',
        'published_at' => now()->addHour(),
        'user_id' => $author->id,
    ]);

    $response = $this->get('/blog');

    $response
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Blog/Index')
            ->where('posts.data.0.slug', 'published-post')
            ->missing('posts.data.1')
        );
});

it('renders a published blog post detail by slug', function () {
    $author = User::factory()->create(['name' => 'Author Name']);

    Post::query()->create([
        'title' => 'Public Detail Post',
        'slug' => 'public-detail-post',
        'excerpt' => 'Public detail excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Public detail content']],
        'status' => 'published',
        'published_at' => now()->subMinute(),
        'user_id' => $author->id,
    ]);

    $response = $this->get('/blog/public-detail-post');

    $response
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/Blog/Show')
            ->where('post.slug', 'public-detail-post')
            ->where('post.author.name', 'Author Name')
        );
});

it('returns 404 for draft or future public blog detail pages', function () {
    $author = User::factory()->create();

    Post::query()->create([
        'title' => 'Draft Hidden',
        'slug' => 'draft-hidden',
        'excerpt' => 'Draft hidden excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Draft hidden content']],
        'status' => 'draft',
        'published_at' => now()->subMinute(),
        'user_id' => $author->id,
    ]);

    Post::query()->create([
        'title' => 'Future Hidden',
        'slug' => 'future-hidden',
        'excerpt' => 'Future hidden excerpt',
        'content' => [['id' => 'b1', 'type' => 'paragraph', 'content' => 'Future hidden content']],
        'status' => 'published',
        'published_at' => now()->addMinute(),
        'user_id' => $author->id,
    ]);

    $this->get('/blog/draft-hidden')->assertNotFound();
    $this->get('/blog/future-hidden')->assertNotFound();
});

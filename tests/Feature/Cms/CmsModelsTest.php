<?php

use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;

it('auto-generates a slug for a page when slug is empty', function () {
    $page = Page::create([
        'title' => 'About Our Company',
        'slug' => '',
        'content' => 'Page content',
        'status' => 'draft',
    ]);

    expect($page->slug)->toBe('about-our-company');
});

it('auto-generates a slug for a post when slug is empty', function () {
    $user = User::factory()->create();

    $post = Post::create([
        'title' => 'Launching Our New Blog',
        'slug' => '',
        'excerpt' => 'Short excerpt',
        'content' => 'Post content',
        'status' => 'draft',
        'user_id' => $user->id,
    ]);

    expect($post->slug)->toBe('launching-our-new-blog');
});

it('syncs categories through the post_category pivot', function () {
    $user = User::factory()->create();

    $post = Post::create([
        'title' => 'Weekly Roundup',
        'slug' => '',
        'content' => 'Post content',
        'status' => 'draft',
        'user_id' => $user->id,
    ]);

    $firstCategory = Category::create([
        'name' => 'Laravel',
        'slug' => 'laravel',
        'description' => null,
    ]);

    $secondCategory = Category::create([
        'name' => 'Inertia',
        'slug' => 'inertia',
        'description' => null,
    ]);

    $post->categories()->sync([$firstCategory->id, $secondCategory->id]);

    expect($post->categories()->pluck('id')->all())
        ->toContain($firstCategory->id, $secondCategory->id);
});

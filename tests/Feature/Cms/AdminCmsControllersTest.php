<?php

use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Spatie\Permission\Models\Role;

function createAdminUser(): User
{
    Role::findOrCreate('admin', 'web');

    $user = User::factory()->create();
    $user->assignRole('admin');

    return $user;
}

it('registers the expected admin CMS routes', function () {
    expect(route('admin.dashboard'))->toContain('/admin');
    expect(route('admin.pages.index'))->toContain('/admin/pages');
    expect(route('admin.pages.builder-create'))->toContain('/admin/pages/builder-create');
    expect(route('admin.pages.builder', 1))->toContain('/admin/pages/1/builder');
    expect(route('admin.pages.builder-load', 1))->toContain('/admin/pages/1/builder-load');
    expect(route('admin.pages.builder-save', 1))->toContain('/admin/pages/1/builder-save');
    expect(route('admin.posts.index'))->toContain('/admin/posts');
    expect(route('admin.categories.index'))->toContain('/admin/categories');
    expect(route('admin.media.upload'))->toContain('/admin/media/upload');
    expect(route('admin.media.index'))->toContain('/admin/media');
});

it('loads and saves page builder layouts via admin endpoints', function () {
    $user = createAdminUser();

    $page = Page::create([
        'title' => 'Builder page',
        'slug' => 'builder-page',
        'content' => 'Builder content',
        'status' => 'draft',
    ]);

    $this->actingAs($user)
        ->get(route('admin.pages.builder', $page))
        ->assertOk();

    $this->actingAs($user)
        ->get(route('admin.pages.builder-load', $page))
        ->assertOk()
        ->assertJson([
            'layout' => ['sections' => []],
        ]);

    $layout = [
        'sections' => [
            ['id' => 'section-1', 'type' => 'hero'],
        ],
    ];

    $this->actingAs($user)
        ->post(route('admin.pages.builder-save', $page), [
            'layout' => $layout,
        ])
        ->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'Layout saved.',
        ]);

    expect($page->fresh()->layout)->toEqual($layout);

    $this->actingAs($user)
        ->get(route('admin.pages.builder-load', $page))
        ->assertOk()
        ->assertJson([
            'layout' => $layout,
        ]);
});

it('creates a draft page and redirects directly to builder', function () {
    $user = createAdminUser();

    $response = $this->actingAs($user)
        ->post(route('admin.pages.builder-create'));

    $page = Page::query()->latest('id')->firstOrFail();

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.pages.builder', $page));

    expect($page->title)->toBe('Untitled Page');
    expect($page->status)->toBe('draft');
    expect($page->layout)->toEqual(['sections' => []]);
});

it('creates, updates, and soft-deletes a page via admin controller', function () {
    $user = createAdminUser();

    $createResponse = $this->actingAs($user)
        ->post(route('admin.pages.store'), [
            'title' => 'About Us',
            'slug' => 'about-us',
            'content' => 'Content',
            'builder_data' => [
                ['id' => 'heading-1', 'type' => 'heading', 'level' => 2, 'content' => 'Hero heading'],
                ['id' => 'text-1', 'type' => 'text', 'content' => 'Hero paragraph'],
            ],
            'meta_title' => 'About meta',
            'meta_description' => 'Description',
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
            'featured_image' => UploadedFile::fake()->image('cover.jpg'),
        ]);

    $createResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.pages.index'));

    $page = Page::query()->firstOrFail();

    expect($page->getFirstMedia('featured_image'))->not->toBeNull();
    expect($page->builder_data)->toHaveCount(2);

    $updateResponse = $this->actingAs($user)
        ->patch(route('admin.pages.update', $page), [
            'title' => 'About The Team',
            'slug' => 'about-us',
            'content' => 'Updated content',
            'meta_title' => null,
            'meta_description' => null,
            'status' => 'draft',
            'published_at' => null,
            'featured_image' => UploadedFile::fake()->image('cover-new.jpg'),
        ]);

    $updateResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.pages.index'));

    expect($page->fresh()->title)->toBe('About The Team');
    expect($page->fresh()->getMedia('featured_image'))->toHaveCount(1);

    $deleteResponse = $this->actingAs($user)
        ->delete(route('admin.pages.destroy', $page));

    $deleteResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.pages.index'));

    $this->assertSoftDeleted('pages', ['id' => $page->id]);
});

it('stores and updates posts while syncing categories', function () {
    $user = createAdminUser();

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

    $thirdCategory = Category::create([
        'name' => 'React',
        'slug' => 'react',
        'description' => null,
    ]);

    $createResponse = $this->actingAs($user)
        ->post(route('admin.posts.store'), [
            'title' => 'First Post',
            'slug' => 'first-post',
            'excerpt' => 'Excerpt',
            'content' => [
                ['id' => 'block-1', 'type' => 'paragraph', 'content' => 'Post body'],
            ],
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
            'category_ids' => [$firstCategory->id, $secondCategory->id],
        ]);

    $createResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.posts.index'));

    $post = Post::query()->firstOrFail();

    expect($post->user_id)->toBe($user->id);
    expect($post->categories()->pluck('categories.id')->all())
        ->toContain($firstCategory->id, $secondCategory->id);

    $updateResponse = $this->actingAs($user)
        ->patch(route('admin.posts.update', $post), [
            'title' => 'Updated Post',
            'slug' => 'first-post',
            'excerpt' => null,
            'content' => [
                ['id' => 'block-1', 'type' => 'paragraph', 'content' => 'Updated body'],
            ],
            'status' => 'draft',
            'published_at' => null,
            'category_ids' => [$thirdCategory->id],
        ]);

    $updateResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.posts.index'));

    expect($post->fresh()->categories()->pluck('categories.id')->all())
        ->toEqual([$thirdCategory->id]);
});

it('validates required fields when storing a page', function () {
    $user = createAdminUser();

    $response = $this->actingAs($user)
        ->from(route('admin.pages.create'))
        ->post(route('admin.pages.store'), []);

    $response
        ->assertSessionHasErrors(['title', 'content', 'status'])
        ->assertRedirect(route('admin.pages.create'));
});

it('stores, updates, and deletes categories via admin endpoints', function () {
    $user = createAdminUser();

    $createResponse = $this->actingAs($user)
        ->post(route('admin.categories.store'), [
            'name' => 'Backend',
            'slug' => 'backend',
            'description' => 'Server-side topics',
        ]);

    $createResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories.index'));

    $category = Category::query()->firstOrFail();

    $updateResponse = $this->actingAs($user)
        ->patch(route('admin.categories.update', $category), [
            'name' => 'Backend Engineering',
            'slug' => 'backend',
            'description' => null,
        ]);

    $updateResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories.index'));

    expect($category->fresh()->name)->toBe('Backend Engineering');

    $deleteResponse = $this->actingAs($user)
        ->delete(route('admin.categories.destroy', $category));

    $deleteResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories.index'));

    expect($category->fresh())->toBeNull();
});

it('lists and deletes media items from the admin media manager', function () {
    $user = createAdminUser();

    $page = Page::create([
        'title' => 'Media page',
        'slug' => 'media-page',
        'content' => 'Media content',
        'status' => 'draft',
    ]);

    $media = $page
        ->addMedia(UploadedFile::fake()->image('asset.jpg'))
        ->toMediaCollection('featured_image');

    $deleteResponse = $this->actingAs($user)
        ->delete(route('admin.media.destroy', $media->id));

    $deleteResponse
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.media.index'));

    $this->assertDatabaseMissing('media', ['id' => $media->id]);
});

it('forbids authenticated non-admin users from the admin area', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertForbidden();
});

<?php

use App\Models\CmsMedia;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\SampleContentSeeder;
use Illuminate\Http\UploadedFile;
use Spatie\Permission\Models\Role;

it('uploads media files to the shared cms media record', function () {
    Role::findOrCreate('admin', 'web');

    $user = User::factory()->create();
    $user->assignRole('admin');

    $response = $this->actingAs($user)
        ->from(route('admin.media.index'))
        ->post(route('admin.media.upload'), [
            'file' => UploadedFile::fake()->image('library-cover.jpg'),
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.media.index'));

    $record = CmsMedia::query()->first();

    expect($record)->not->toBeNull();
    expect($record?->key)->toBe('library');
    expect($record?->getMedia('cms'))->toHaveCount(1);
});

it('seeds the admin user and sample published content', function () {
    $this->seed(AdminUserSeeder::class);
    $this->seed(SampleContentSeeder::class);

    $this->assertDatabaseHas('users', [
        'email' => 'admin@cms.test',
        'name' => 'Admin',
    ]);

    expect(User::query()->where('email', 'admin@cms.test')->firstOrFail()->hasRole('admin'))->toBeTrue();

    expect(Page::query()->count())->toBe(3);
    expect(Post::query()->count())->toBe(3);
    expect(Page::query()->where('status', 'published')->count())->toBe(3);
    expect(Post::query()->where('status', 'published')->count())->toBe(3);
});

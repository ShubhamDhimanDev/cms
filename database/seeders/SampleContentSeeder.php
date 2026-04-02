<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SampleContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $author = User::query()->firstOrCreate(
            ['email' => 'admin@cms.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        );

        foreach ([
            [
                'title' => 'Home',
                'content' => 'Welcome to the CMS home page.',
                'meta_title' => 'Home',
                'meta_description' => 'Homepage content.',
            ],
            [
                'title' => 'About',
                'content' => 'About the team and company.',
                'meta_title' => 'About',
                'meta_description' => 'About page content.',
            ],
            [
                'title' => 'Contact',
                'content' => 'How to get in touch.',
                'meta_title' => 'Contact',
                'meta_description' => 'Contact page content.',
            ],
        ] as $pageAttributes) {
            Page::query()->updateOrCreate(
                ['slug' => str($pageAttributes['title'])->slug()->toString()],
                [
                    ...$pageAttributes,
                    'status' => 'published',
                    'published_at' => now(),
                ],
            );
        }

        foreach ([
            [
                'title' => 'Launching the CMS',
                'excerpt' => 'A quick look at the initial CMS launch.',
                'content' => 'The CMS is now live with pages, posts, and media management.',
            ],
            [
                'title' => 'Writing with Laravel',
                'excerpt' => 'Tips for building editorial tools in Laravel.',
                'content' => 'Laravel provides a fast path to building maintainable content workflows.',
            ],
            [
                'title' => 'Managing Media',
                'excerpt' => 'How the media library fits into publishing.',
                'content' => 'Media assets are attached through Spatie MediaLibrary for a unified workflow.',
            ],
        ] as $postAttributes) {
            Post::query()->updateOrCreate(
                ['slug' => str($postAttributes['title'])->slug()->toString()],
                [
                    ...$postAttributes,
                    'status' => 'published',
                    'published_at' => now(),
                    'user_id' => $author->id,
                ],
            );
        }
    }
}

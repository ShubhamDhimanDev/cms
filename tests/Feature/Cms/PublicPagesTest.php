<?php

use App\Models\Page;
use Inertia\Testing\AssertableInertia;

it('renders a published CMS page by slug', function () {
    Page::query()->create([
        'title' => 'About',
        'slug' => 'about',
        'content' => '<p>About content</p>',
        'layout' => [
            'sections' => [
                [
                    'id' => 'section-1',
                    'type' => 'section',
                    'settings' => [],
                    'columns' => [
                        [
                            'id' => 'column-1',
                            'width' => 100,
                            'widgets' => [
                                [
                                    'id' => 'widget-1',
                                    'type' => 'heading',
                                    'settings' => ['text' => 'About our company', 'tag' => 'h2'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'meta_title' => 'About Us',
        'meta_description' => 'About page',
        'status' => 'published',
        'published_at' => now()->subMinute(),
    ]);

    $response = $this->get('/about');

    $response
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('Public/PageView')
            ->where('page.slug', 'about')
            ->where('page.title', 'About')
            ->where('layout.sections.0.columns.0.widgets.0.type', 'heading')
        );
});

it('returns 404 for draft or future pages', function () {
    Page::query()->create([
        'title' => 'Draft Page',
        'slug' => 'draft-page',
        'content' => '<p>Draft content</p>',
        'status' => 'draft',
    ]);

    Page::query()->create([
        'title' => 'Future Page',
        'slug' => 'future-page',
        'content' => '<p>Future content</p>',
        'status' => 'published',
        'published_at' => now()->addDay(),
    ]);

    $this->get('/draft-page')->assertNotFound();
    $this->get('/future-page')->assertNotFound();
});

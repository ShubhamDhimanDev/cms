<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PublicPageController extends Controller
{
    public function show(string $slug): InertiaResponse
    {
        $page = Page::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where(function ($query): void {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            })
            ->firstOrFail();

        abort_if($this->isReservedSlug($slug), Response::HTTP_NOT_FOUND);

        return Inertia::render('Public/PageView', [
            'page' => $page->only(['id', 'title', 'slug', 'meta_title', 'meta_description']),
            'layout' => $page->layout,
        ]);
    }

    private function isReservedSlug(string $slug): bool
    {
        return in_array($slug, ['admin', 'dashboard', 'settings', 'login', 'register', 'logout'], true);
    }
}

<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MediaUploadController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PostCommentController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\PublicPostCommentController;
use App\Http\Controllers\PublicPostController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/landing-page', 'Public/LandingPage')->name('landing-page');
Route::inertia('/about', 'Public/About')->name('about');
Route::inertia('/contact', 'Public/Contact')->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::post('pages/builder-create', [PageController::class, 'builderCreate'])->name('pages.builder-create');
    Route::get('pages/{page}/builder', [PageController::class, 'builder'])->name('pages.builder');
    Route::get('pages/{page}/builder-load', [PageController::class, 'builderLoad'])->name('pages.builder-load');
    Route::post('pages/{page}/builder-save', [PageController::class, 'builderSave'])->name('pages.builder-save');
    Route::resource('pages', PageController::class);
    Route::resource('posts', PostController::class);
    Route::resource('categories', CategoryController::class)->except(['create', 'edit', 'show']);
    Route::post('media/upload', [MediaUploadController::class, 'store'])->name('media.upload');
    Route::get('media/library', [MediaController::class, 'library'])->name('media.library');
    Route::resource('media', MediaController::class)->only(['index', 'destroy']);
    Route::get('comments', [PostCommentController::class, 'index'])->name('comments.index');
    Route::patch('comments/{comment}/approve', [PostCommentController::class, 'approve'])->name('comments.approve');
    Route::delete('comments/{comment}', [PostCommentController::class, 'destroy'])->name('comments.destroy');
});

require __DIR__.'/settings.php';

Route::get('/blog', [PublicPostController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [PublicPostController::class, 'show'])->name('blog.show');
Route::post('/blog/{post:slug}/comments', [PublicPostCommentController::class, 'store'])->name('blog.comments.store');

Route::get('/{slug}', [PublicPageController::class, 'show'])
    ->where('slug', '^(?!admin$|dashboard$|settings$|login$|register$|logout$).+')
    ->name('pages.show');

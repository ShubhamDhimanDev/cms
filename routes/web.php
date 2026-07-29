<?php

use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\CourseApplicationController as AdminCourseApplicationController;
use App\Http\Controllers\Admin\CourseCategoryController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\CourseTypeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\EventRegistrantController;
use App\Http\Controllers\Admin\HomePageSettingsController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MediaUploadController;
// use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PostCommentController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UniversityPartnerController;
use App\Http\Controllers\Admin\UniversityController;
use App\Http\Controllers\AgentEnquiryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\Admin\NewsletterSubscriberController;
use App\Http\Controllers\Admin\AgentEnquiryController as AdminAgentEnquiryController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\CourseApplicationController;
use App\Http\Controllers\PublicCourseController;
use App\Http\Controllers\PublicEventController;
use App\Http\Controllers\PublicEventRegistrationController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\PublicPostCommentController;
use App\Http\Controllers\PublicPostController;
use App\Http\Controllers\PublicUniversityPartnerController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicPageController::class, 'homePage'])->name('home');

Route::inertia('/about', 'Public/About')->name('about');
Route::inertia('/services', 'Public/Services')->name('services');
Route::inertia('/contact', 'Public/Contact')->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/newsletter/subscribe', [NewsletterController::class, 'store'])->name('newsletter.subscribe');
Route::get('/apply-now', [CourseApplicationController::class, 'create'])->name('applications.create');
Route::post('/apply-now', [CourseApplicationController::class, 'store'])->name('applications.store');

Route::get('/become-an-agent', [AgentEnquiryController::class, 'create'])->name('agent-enquiries.create');
Route::post('/become-an-agent', [AgentEnquiryController::class, 'store'])->name('agent-enquiries.store');

Route::get('/work-for-us', function(){
    return redirect(route('agent-enquiries.create'));
});
Route::get('/contact-1', function(){
    return redirect(route('contact'));
});
Route::get('/about-us-1', function(){
    return redirect(route('about'));
});
Route::get('/copyright-disclaimer-notice', function(){
    return redirect(route('home'));
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function(){
        return redirect(route('admin.dashboard'));
    });
});

Route::middleware(['auth', 'admin.access'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    // Page builder is temporarily disabled
    // Route::middleware('admin.access:manage pages')->group(function () {
    //     Route::post('pages/builder-create', [PageController::class, 'builderCreate'])->name('pages.builder-create');
    //     Route::get('pages/{page}/builder', [PageController::class, 'builder'])->name('pages.builder');
    //     Route::get('pages/{page}/builder-load', [PageController::class, 'builderLoad'])->name('pages.builder-load');
    //     Route::post('pages/{page}/builder-save', [PageController::class, 'builderSave'])->name('pages.builder-save');
    //     Route::resource('pages', PageController::class);
    // });

    Route::middleware('admin.access:manage posts')->group(function () {
        Route::resource('posts', PostController::class);
    });

    Route::middleware('admin.access:manage categories')->group(function () {
        Route::resource('categories', CategoryController::class)->except(['create', 'edit', 'show']);
    });

    Route::middleware('admin.access:manage course categories')->group(function () {
        Route::post('course-categories/reorder', [CourseCategoryController::class, 'reorder'])->name('course-categories.reorder');
        Route::resource('course-categories', CourseCategoryController::class)->except(['create', 'show']);
    });

    Route::middleware('admin.access:manage course types')->group(function () {
        Route::post('course-types/reorder', [CourseTypeController::class, 'reorder'])->name('course-types.reorder');
        Route::resource('course-types', CourseTypeController::class)->except(['create', 'show']);
    });

    Route::middleware('admin.access:manage course cities')->group(function () {
        Route::post('cities/reorder', [CityController::class, 'reorder'])->name('cities.reorder');
        Route::resource('cities', CityController::class)->except(['create', 'show']);
    });

    Route::middleware('admin.access:manage courses')->group(function () {
        Route::resource('universities', UniversityController::class)->except(['create', 'edit', 'show']);
        Route::resource('courses', CourseController::class)->except(['show']);
    });

    Route::middleware('admin.access:manage media')->group(function () {
        Route::post('media/upload', [MediaUploadController::class, 'store'])->name('media.upload');
        Route::get('media/library', [MediaController::class, 'library'])->name('media.library');
        Route::resource('media', MediaController::class)->only(['index', 'destroy']);
    });

    Route::middleware('admin.access:manage comments')->group(function () {
        Route::get('comments', [PostCommentController::class, 'index'])->name('comments.index');
        Route::patch('comments/{comment}/approve', [PostCommentController::class, 'approve'])->name('comments.approve');
        Route::delete('comments/{comment}', [PostCommentController::class, 'destroy'])->name('comments.destroy');
    });

    Route::middleware('admin.access:manage events')->group(function () {
        Route::resource('events', EventController::class)->except(['show']);
        Route::patch('events/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
        Route::get('events/{event}/registrants', [EventRegistrantController::class, 'index'])->name('events.registrants.index');
        Route::patch('events/{event}/registrants/{registrant}/cancel', [EventRegistrantController::class, 'cancel'])->name('events.registrants.cancel');
        Route::delete('events/{event}/registrants/{registrant}', [EventRegistrantController::class, 'destroy'])->name('events.registrants.destroy');
    });

    Route::middleware('admin.access:manage applications')->group(function () {
        Route::get('applications', [AdminCourseApplicationController::class, 'index'])->name('applications.index');
        Route::get('applications/export', [AdminCourseApplicationController::class, 'export'])->name('applications.export');
        Route::get('applications/{application}', [AdminCourseApplicationController::class, 'show'])->name('applications.show');
        Route::patch('applications/settings', [AdminCourseApplicationController::class, 'updateSettings'])->name('applications.settings.update');
    });

    Route::middleware(['admin.access:manage users'])->group(function () {
        Route::get('users', [AdminUserController::class, 'index'])->name('users.index');
        Route::post('users', [AdminUserController::class, 'store'])->name('users.store');
        Route::patch('users/{user}/access', [AdminUserController::class, 'updateAccess'])->name('users.update-access');
        Route::delete('users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
    });

    Route::middleware(['admin.access:manage universities'])->group(function () {
        Route::resource('university-partners', UniversityPartnerController::class)->except(['show']);
    });

    Route::middleware(['admin.access:manage applications'])->group(function () {
        Route::get('agent-enquiries', [AdminAgentEnquiryController::class, 'index'])->name('agent-enquiries.index');
        Route::patch('agent-enquiries/settings', [AdminAgentEnquiryController::class, 'updateSettings'])->name('agent-enquiries.settings.update');
        Route::get('agent-enquiries/{agentEnquiry}', [AdminAgentEnquiryController::class, 'show'])->name('agent-enquiries.show');
        Route::delete('agent-enquiries/{agentEnquiry}', [AdminAgentEnquiryController::class, 'destroy'])->name('agent-enquiries.destroy');

        Route::get('contact-messages', [ContactMessageController::class, 'index'])->name('contact-messages.index');
        Route::patch('contact-messages/settings', [ContactMessageController::class, 'updateSettings'])->name('contact-messages.settings.update');
        Route::get('contact-messages/{contactMessage}', [ContactMessageController::class, 'show'])->name('contact-messages.show');
        Route::delete('contact-messages/{contactMessage}', [ContactMessageController::class, 'destroy'])->name('contact-messages.destroy');

        Route::get('newsletter-subscribers', [NewsletterSubscriberController::class, 'index'])->name('newsletter-subscribers.index');
        Route::get('newsletter-subscribers/export', [NewsletterSubscriberController::class, 'export'])->name('newsletter-subscribers.export');
        Route::delete('newsletter-subscribers/{newsletterSubscriber}', [NewsletterSubscriberController::class, 'destroy'])->name('newsletter-subscribers.destroy');
    });


    Route::get('home-page-settings', [HomePageSettingsController::class, 'index'])->name('home-page-settings.index');
    Route::patch('home-page-settings', [HomePageSettingsController::class, 'update'])->name('home-page-settings.update');

    Route::middleware(['admin.access:manage permissions'])->group(function () {
        Route::get('permissions', [AdminPermissionController::class, 'index'])->name('permissions.index');
        Route::post('permissions', [AdminPermissionController::class, 'store'])->name('permissions.store');
        Route::delete('permissions/{permission}', [AdminPermissionController::class, 'destroy'])->name('permissions.destroy');
    });
});

require __DIR__.'/settings.php';

Route::get('/blog', [PublicPostController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [PublicPostController::class, 'show'])->name('blog.show');
Route::post('/blog/{post:slug}/comments', [PublicPostCommentController::class, 'store'])->name('blog.comments.store');

Route::get('/events', [PublicEventController::class, 'index'])->name('events.index');
Route::get('/events/{event:slug}', [PublicEventController::class, 'show'])->name('events.show');
Route::post('/events/{event:slug}/register', [PublicEventRegistrationController::class, 'store'])->name('events.register');

Route::get('/courses', [PublicCourseController::class, 'index'])->name('courses.index');
Route::get('/programmes/{courseCategory:slug}', [PublicCourseController::class, 'byCategory'])->name('courses.category');
Route::get('/programmes-in-{city:slug}', [PublicCourseController::class, 'byCity'])->name('courses.city');
Route::get('/{categorySlug}-in-{citySlug}', [PublicCourseController::class, 'byCategoryAndCity'])
    ->where('categorySlug', '[A-Za-z0-9-]+')
    ->where('citySlug', '[A-Za-z0-9-]+')
    ->name('courses.categoryCity');

Route::get('/university-partners', [PublicUniversityPartnerController::class, 'index'])->name('university-partners.index');

Route::get('/{slug}', [PublicPageController::class, 'show'])
    ->where('slug', '^(?!admin$|dashboard$|settings$|login$|register$|logout$).+')
    ->name('pages.show');

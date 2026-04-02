<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $media = Media::query()
            ->latest()
            ->paginate(20)
            ->through(fn (Media $item): array => [
                'id' => $item->id,
                'name' => $item->name,
                'file_name' => $item->file_name,
                'url' => $item->getUrl(),
                'mime_type' => $item->mime_type,
                'size' => $item->size,
                'created_at' => $item->created_at?->toISOString(),
            ]);

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
        ]);
    }

    /**
     * Return all image media items as JSON for the media picker.
     *
     * @return array<int, array<string, mixed>>
     */
    public function library(): JsonResponse
    {
        $items = Media::query()
            ->where('mime_type', 'like', 'image/%')
            ->latest()
            ->get()
            ->map(fn (Media $item): array => [
                'id' => $item->id,
                'name' => $item->name,
                'file_name' => $item->file_name,
                'url' => $item->getUrl(),
                'mime_type' => $item->mime_type,
                'size' => $item->size,
            ]);

        return response()->json($items);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function destroy(string $medium): RedirectResponse
    {
        $media = Media::query()->findOrFail($medium);
        $media->delete();

        return to_route('admin.media.index')->with('success', 'Media deleted successfully.');
    }
}

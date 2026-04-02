<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MediaUploadController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'max:10240', 'mimes:jpg,jpeg,png,gif,webp,pdf,svg'],
        ]);

        $record = CmsMedia::query()->firstOrCreate([
            'key' => 'library',
        ]);

        $record
            ->addMediaFromRequest('file')
            ->toMediaCollection('cms');

        return back()->with('success', 'File uploaded.');
    }
}

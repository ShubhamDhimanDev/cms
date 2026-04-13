<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('events', 'slug')],
            'excerpt' => ['nullable', 'string'],
            'type' => ['required', Rule::in(['online', 'in_person'])],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
            'registration_ends_at' => ['nullable', 'date', 'before_or_equal:starts_at'],
            'timezone' => ['nullable', 'string', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
            'location_url' => ['nullable', 'string', 'url', 'max:500'],
            'status' => ['required', Rule::in(['draft', 'published', 'cancelled'])],
            'max_registrants' => ['nullable', 'integer', 'min:1'],
        ];
    }
}

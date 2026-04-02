<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', Rule::unique('pages', 'slug')->ignore($this->route('page'))],
            'content' => ['required', 'string'],
            'builder_data' => ['nullable', 'array'],
            'builder_data.*.id' => ['required', 'string', 'max:100'],
            'builder_data.*.type' => ['required', Rule::in(['heading', 'text', 'image', 'button'])],
            'builder_data.*.content' => ['nullable', 'string'],
            'builder_data.*.url' => ['nullable', 'string', 'max:2048'],
            'builder_data.*.text' => ['nullable', 'string', 'max:255'],
            'builder_data.*.level' => ['nullable', Rule::in([1, 2, 3])],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
            'featured_image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}

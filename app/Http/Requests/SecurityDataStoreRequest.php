<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SecurityDataStoreRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'value' => 'required|nullable|numeric|between:0,999999.99',
            'severity' => 'required|nullable|string',
            'detected_at' => 'nullable|date',
            'status' => 'required|nullable|string|in:open,in_progress,resolved',
            'resolved_at' => 'nullable|date',
            'assigned_to' => 'nullable|string|max:255',
            'response_time' => 'nullable|date',
            'threat_source' => 'required|nullable|string|max:255',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'type.required' => 'The type field is required.',
            'description.required' => 'The description field is required.',
            'value.numeric' => 'The value field must be a number.',
            'value.between' => 'The value field must be between 0 and 999999.99.',
            'severity.in' => 'The severity field must be one of: low, medium, high.',
            'status.in' => 'The status field must be one of: open, in_progress, resolved.',
            'date' => 'The :attribute is not a valid date.',
        ];
    }
}

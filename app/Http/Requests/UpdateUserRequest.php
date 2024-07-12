<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'phone_number' => [
                'required',
                'string',
                'regex:/^(\+94|0)?7[0-9]{8}$/',
                'unique:users,phone_number,' . $this->id
            ],
        ];

        // Only apply password validation if 'password' is present in the request
        if ($this->filled('password')) {
            $rules['password'] = [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ];
        }

        return $rules;
    }
}

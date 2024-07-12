<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * register api
     * post
     * [name, email, phone_number, password]
     */
    public function register(RegisterRequest $request): Response
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->accessToken;
        return response(compact('user', 'token'));
    }

    /**
     * login api
     * post
     * [email, password]
     */
    public function login(Request $request): Response
    {
        $credentials = $request->all();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password incorrect'
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken('Personal Access Token')->accessToken;
        return response(compact('user', 'token'));
    }

    public function getUser(): Response
    {
        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
            return response(['user' => $user]);
        }
        return response(['message' => 'Unauthorized'], 401);
    }

    /**
     * logout api
     * post
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        // Revoke the token that was used to authenticate the current request
        $request->user()->token()->revoke();

        return response(['message' => 'Successfully logged out'], 200);
    }
}

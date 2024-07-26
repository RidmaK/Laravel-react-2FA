<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SecurityDataController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register',[AuthController::class, 'register'])->name('register');
Route::post('/login',[AuthController::class, 'login'])->name('login');
Route::middleware('auth:api')->group(function(){
    Route::get('/get-user',[AuthController::class, 'getUser']);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::apiResource('/users',UserController::class);
    Route::get('/users-count', [AuthController::class, 'getUserCount'])->name('users-count');
    Route::get('/security-data-all', [AuthController::class, 'getAllSecurityData'])->name('security-data-all');
    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/security-data', SecurityDataController::class);
});


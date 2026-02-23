<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/sso/foodpanda', [LoginController::class, 'toFoodpanda'])->name('sso.to-foodpanda');

    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

});

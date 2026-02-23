<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\Response as HttpResponse;

class LoginController extends Controller
{
    public function showLoginForm(): InertiaResponse
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request, AuthService $authService): InertiaResponse|\Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $tokenResult = $authService->attemptLogin($request->email, $request->password);

        if ($tokenResult) {
            session(['sso_token' => $tokenResult->accessToken]);

            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/Login')
            ->with('error', 'Invalid email or password.');
    }

    public function toFoodpanda(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        $token = $user->createToken('sso-foodpanda-' . now()->timestamp)->accessToken;

        $callback = rtrim(config('app.foodpanda_url'), '/') . '/sso/callback?token=' . $token;

        return Inertia::location($callback);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        \Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use App\Models\User;
use App\Traits\HandlesAuthentication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\PersonalAccessTokenResult;

class AuthService
{
    use HandlesAuthentication;

    public function __construct(
        protected UserRepository $userRepository
    ) {}

    /**
     * Attempt login and return Passport token if successful
    */
    public function attemptLogin(string $email, string $password): ?PersonalAccessTokenResult
    {
        try {
            $user = $this->userRepository->findByEmail($email);

            if ($this->validateCredentials($user, $password)) {
                auth()->login($user, true);

                // create passport token for SSO
                return $user->createToken('sso-foodpanda');
            }
        } catch (\Exception $e) {
            Log::error('Login attempt failed: ' . $e->getMessage());
        }

        return null;
    }

    public function findOrCreateFromSso(array $userData): User
    {
        return $this->userRepository->findByEmail($userData['email'])
            ?? $this->userRepository->create($userData);
    }
}

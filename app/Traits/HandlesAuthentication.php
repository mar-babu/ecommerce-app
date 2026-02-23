<?php

namespace App\Traits;

use Illuminate\Support\Facades\Hash;

trait HandlesAuthentication
{
    protected function validateCredentials(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }
}

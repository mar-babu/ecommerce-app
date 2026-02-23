<?php

namespace App\Traits;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

trait HandlesAuthentication
{
    /**
     * Validate user credentials.
     *
     * @param  \App\Models\User  $user
     * @param  string            $password
     * @return bool
    */
    protected function validateCredentials(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }
}

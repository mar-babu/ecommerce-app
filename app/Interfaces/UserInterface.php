<?php

namespace App\Interfaces;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

interface UserInterface
{
    /**
     * Find user by email or throw exception.
     *
     * @param string $email
     * @return User
     * @throws ModelNotFoundException
     */
    public function findByEmail(string $email): User;

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User;
}

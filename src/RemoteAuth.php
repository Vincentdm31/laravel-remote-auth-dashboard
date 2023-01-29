<?php

namespace App\Helpers\Laravins;

use App\Http\Controllers\Laravins\RemoteAuthController;
use Error;
use Illuminate\Support\Facades\Route;


class RemoteAuth
{
    static function routes()
    {
        Route::get('/remote-auth/dashboard', [RemoteAuthController::class, 'dashboard']);
    }
}

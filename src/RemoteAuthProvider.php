<?php

namespace Laravins\RemoteAuth;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;

class RemoteAuthProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/config/remote-auth-manager.php' => config_path('remote-auth/remote-auth-manager.php'),
        ], ['remote-auth']);

        $this->publishes([
            __DIR__ . '/views/remote-auth' => resource_path('remote-auth'),
        ], ['remote-auth']);

        $this->publishes([
            __DIR__ . '/RemoteAuthController.php' => app_path('Http/Controllers/RemoteAuth'),
        ], ['remote-auth']);

        Artisan::call('vendor:publish --tag=remote-auth --ansi --force');
    }
}

<?php

namespace App\Http\Controllers\RemoteAuth;
use App\Http\Controllers\Controller;

class RemoteAuthController extends Controller
{
    public function dashboard()
    {
        $websites = config('remote-auth.remote-auth-manager');
        return view('remote-auth.dashboard', compact('websites'));
    }
}

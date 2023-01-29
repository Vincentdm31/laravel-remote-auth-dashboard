# Laravel Remote Auth Manager

**Introduction**

This package allows you to update user password and delete user remotely.

Working with LaravinsRemoteAuthClient package.

<br/>

**Installation**

```
composer require laravins/remote-auth
```

This will install the package inside your project.

- `Config file` located at `config/remote-auth/remote-auth-manager.php`
- `Dashboard` located at `resources/views/remote-auth/dashboard.blade.php`
- `Controller` located at `Http/Controllers/RemoteAuth/RemoteAuthController.php`
- `JS files` located at `resources/js/remote-auth/`

Publish files
```
php artisan vendor:publish --tag=remote-auth --ansi --force
```

Add this line to your webpack.mix.js at root of your project
```js
mix.js('resources/js/remote-auth/index.js', 'public/js/remote-auth.js')
```

```
npm i
npm run dev
```
<br/>

***
<br/>

**Config file**
<br/>

This config file will allow you to remotely manage your users off `https://my-website.com/` endpoint.

```php
<?php

return [
    //Put here your endpoints
    [
        'name' => 'Locked',
        'url' => 'https://my-website.com/',
        'password' => 'mysecretpass'
    ],
];

```
<br/>

***


<br/>

Thanks ✌️
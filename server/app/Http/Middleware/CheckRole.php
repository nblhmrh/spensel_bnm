<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{

    public function handle(Request $request, Closure $next, ...$roles): Mixed
    {

        //Ambil user yang sedang login
        $user = Auth::user();

        //Cek apakah user memiliki role yang diperbolehkan
        if (!$user || !in_array($user->role, $roles)) {
            // Jika tidak memiliki role yang diperbolehkan, kembalikan response 403 Forbidden
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }


        return $next($request);
    }
}

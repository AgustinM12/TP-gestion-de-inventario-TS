// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Accede a las cookies desde la petición
    const token = request.cookies.get('token');
    const role = request.cookies.get('role')


    const url = new URL(request.url);

    // Si el token no existe y el usuario está intentando acceder a una ruta protegida, redirige al '/'
    if (!token && url.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Si el token existe y el usuario está intentando acceder a '/', redirige a la ruta de autenticación
    if (token && url.pathname === '/') {
        return NextResponse.redirect(new URL('/auth/main', request.url));
    }

    if (role.value == 2 && (url.pathname == '/auth/user' || url.pathname == '/auth/register/user')) {
        return NextResponse.redirect(new URL('/auth/main', request.url));
    }

    // Permite continuar con la petición
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/', '/auth/user/:path*'], // Aplica el middleware a todas las rutas bajo /auth y a '/'
};

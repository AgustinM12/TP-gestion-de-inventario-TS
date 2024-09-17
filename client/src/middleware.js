// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Accede a las cookies desde la petición
    const token = request.cookies.get('token');
    const url = request.url;

    // Si hay token y la ruta es '/'
    if (token && url.endsWith('/')) {
        // Redirige al usuario a '/auth/main'
        return NextResponse.redirect(new URL('/auth/main', url));
    }

    // Si no hay token y la ruta es '/auth' o alguna subruta de '/auth'
    if (!token && url.startsWith('/auth')) {
        // Redirige al usuario a '/'
        return NextResponse.redirect(new URL('/', url));
    }

    // Permite continuar con la petición
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/'], // Aplica el middleware a las rutas bajo /auth y la ruta '/'
};

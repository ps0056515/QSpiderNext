import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;
      const path = req.nextUrl.pathname;
      const role = (token as { role?: string }).role;
      if (path.startsWith('/admin')) return role === 'ADMIN';
      if (path.startsWith('/trainer')) return role === 'TRAINER' || role === 'ADMIN';
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/learn/:path*', '/trainer/:path*', '/admin/:path*'],
};

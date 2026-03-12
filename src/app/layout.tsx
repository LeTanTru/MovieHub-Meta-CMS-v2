import './globals.css';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { type ReactNode, Suspense } from 'react';
import {
  AppProvider,
  QueryProvider,
  ThemeProvider
} from '@/components/providers';
import { Metadata } from 'next';
import { PermissionGuard } from '@/components/permission-guard';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: {
    template: '%s | Meta MovieHub CMS',
    default: 'Meta MovieHub CMS'
  }
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='vi'>
      <body
        className={`${beVietnamPro.variable} ${beVietnamPro.className} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppProvider>
              <Suspense>
                <PermissionGuard>{children}</PermissionGuard>
              </Suspense>
              <NextTopLoader showSpinner={false} />
            </AppProvider>
          </QueryProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { getStore } from '@/actions/store/getStore'

import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/providers/QueryProvider'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Generated by create next app',
  icons: {
    icon: {
      url: '/logo.png',
      href: '/logo.png',
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStore()

  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <Toaster />
          <Navbar categories={store?.categories} />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}

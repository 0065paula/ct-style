import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '../components/layout/header'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Internal UI Registry',
  description: 'Internal lightweight UI registry for company tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}

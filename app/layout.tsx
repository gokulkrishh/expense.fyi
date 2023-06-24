import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const title = 'Expense.fyi – Track your expenses with ease';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
  title,
  description
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-default flex h-full flex-col text-gray-600 antialiased`}>{children}</body>
    </html>
  )
}

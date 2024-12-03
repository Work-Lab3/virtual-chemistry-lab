import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chemistry Quiz',
  description: 'Test your chemistry knowledge with our interactive quiz!',
}

export default function RootLayout({ children }) {
  return (
    
      <div className={inter.className}>
        {children}
      </div>    
  )
}

'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

// Future: Add Razorpay Provider when implementing payments
// export function PaymentProvider({ children }: { children: ReactNode }) {
//   return (
//     <div>
//       {children}
//     </div>
//   )
// }

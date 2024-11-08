import { PaymentMethodForm } from '@/components/payment-method-form'
import { PaymentWrapper } from '@/components/paymentWrapper'
import Image from 'next/image'

export default function Home() {

    return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <PaymentWrapper/>
    </main>
  )
}

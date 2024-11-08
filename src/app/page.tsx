import { PaymentMethodForm } from '@/components/payment-method-form'
import { PaymentWrapper } from '@/components/paymentWrapper'
import Image from 'next/image'

interface Props {
  searchParams:any
}
export default function Home({searchParams}:Props) {


  console.log(searchParams)
    return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <PaymentWrapper defaultData={searchParams}/>
    </main>
  )
}

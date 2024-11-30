import { PaymentMethodForm } from '@/components/payment-method-form'
import { PaymentWrapper } from '@/components/paymentWrapper'
import Image from 'next/image'
import { getDataGeneral } from './lib/wagtail'

interface Props {
  searchParams: any
}
export default async function Home({ searchParams }: Props) {
  
  const info = await getDataGeneral({fields:'*'})

  console.log(searchParams)

  return (
  <main className="flex min-h-screen flex-col items-center justify-between">
    <PaymentWrapper defaultData={searchParams} params={searchParams} info={info.items[0]}/>
  </main>
)
}

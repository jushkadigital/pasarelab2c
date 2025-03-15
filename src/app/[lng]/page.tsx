import { PaymentMethodForm } from '@/components/payment-method-form'
import { PaymentWrapper } from '@/components/paymentWrapper'
import Image from 'next/image'
//import { getDataGeneral } from './lib/wagtail'
import { createTranslation } from '@/i18next'


interface Props {
  searchParams: any
  params: Promise<{
    lng: string
  }>
}
export default async function Home({ searchParams,params }: Props) {
  
  //const info = await getDataGeneral({fields:'*'})

  const pars = await params
  const { t } = await createTranslation(pars.lng,'info')

  const objOps = {
    'es': 'terminosyCondiciones',
    'en': 'terminosyCondicionesEng'
  }
  const data = t('items',{returnObjects:true})

  const info = data[0]
  console.log(pars.lng)
  console.log(info[objOps[pars.lng]])
  return (
  <main className="flex min-h-screen flex-col items-center justify-between">
    <PaymentWrapper lng={pars.lng}  defaultData={searchParams} params={searchParams} info={info[objOps[pars.lng]]}/>
  </main>
)
}
export const metadata = {
  title: "Link de Pago PDS",
  description: "Pagos creados de la agencia PDS Viajes",
};

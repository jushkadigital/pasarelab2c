import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTranslation } from "@/i18next/client"

interface Props {
unitaryPrice: string
unitaryPrice2?: string
unitaryPrice3?: string
finalPrice: string
passenger: string
passenger2?: string
passenger3?: string
percentage: string
subPrice1: string
lng:string
}

export const TablaCotizacion = ({lng,unitaryPrice,unitaryPrice2,unitaryPrice3,finalPrice,passenger,passenger2,passenger3,percentage,subPrice1}:Props)=> {
  
  const {t} = useTranslation(lng,'tablaCoti')
  return (
    <Table>
      <TableCaption>{t('quotationTable')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">{t('itemBill')}</TableHead>
          <TableHead>{t('detail')}</TableHead>
          <TableHead className="text-right">{t('price')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{t('unitaryPrice')}</TableCell>
          <TableCell>{t('priceAdultPassenger')}</TableCell>
          <TableCell className="text-right">${unitaryPrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('numberPassengers')}</TableCell>
          <TableCell>{t('numberAdultPassengers')}</TableCell>
          <TableCell className="text-right">{passenger}</TableCell>
        </TableRow>
        {unitaryPrice2 && 
          <TableRow>
          <TableCell className="font-medium">{t('unitaryPrice')}</TableCell>
          <TableCell>{t('priceChildPassenger')}</TableCell>
          <TableCell className="text-right">${unitaryPrice2}</TableCell>
        </TableRow>
}
        {
          passenger2 && <TableRow>
          <TableCell className="font-medium">{t('numberPassengers')}</TableCell>
          <TableCell>{t('numberChildPassengers')}</TableCell>
          <TableCell className="text-right">{passenger2}</TableCell>
        </TableRow>

        }
        {unitaryPrice3 && 
          <TableRow>
          <TableCell className="font-medium">{t('unitaryPrice')}</TableCell>
          <TableCell>{t('priceInfantPassenger')}</TableCell>
          <TableCell className="text-right">${unitaryPrice3}</TableCell>
        </TableRow>
}

        
        {
        passenger3 && <TableRow>
          <TableCell className="font-medium">{t('numberPassengers')}</TableCell>
          <TableCell>{t('numberInfantPassengers')}</TableCell>
          <TableCell className="text-right">{passenger3}</TableCell>
        </TableRow>

        }
        
        
        <TableRow>
          <TableCell className="font-medium">{t('totalPrice')}</TableCell>
          <TableCell>${unitaryPrice} × {passenger} + ${unitaryPrice2} × ${passenger2} + ${unitaryPrice3} × ${passenger3}</TableCell>
          <TableCell className="text-right">${finalPrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('advancePayment')}</TableCell>
          <TableCell>{percentage}% </TableCell>
          <TableCell className="text-right">${subPrice1}</TableCell>
        </TableRow>
        <TableRow>
                  </TableRow>
      </TableBody>
    </Table>
  )
}


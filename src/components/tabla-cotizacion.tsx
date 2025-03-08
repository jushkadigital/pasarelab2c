import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
}

export const TablaCotizacion = ({unitaryPrice,unitaryPrice2,unitaryPrice3,finalPrice,passenger,passenger2,passenger3,percentage,subPrice1}:Props)=> {
  return (
    <Table>
      <TableCaption>Tabla de Cotización</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Concepto</TableHead>
          <TableHead>Detalle</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Precio Unitario</TableCell>
          <TableCell>Precio por pasajero Adulto</TableCell>
          <TableCell className="text-right">${unitaryPrice}</TableCell>
        </TableRow>
        
        {unitaryPrice2 && 
          <TableRow>
          <TableCell className="font-medium">Precio Unitario</TableCell>
          <TableCell>Precio por pasajero Menor</TableCell>
          <TableCell className="text-right">${unitaryPrice2}</TableCell>
        </TableRow>
}
        {unitaryPrice3 && 
          <TableRow>
          <TableCell className="font-medium">Precio Unitario</TableCell>
          <TableCell>Precio por pasajero Infante</TableCell>
          <TableCell className="text-right">${unitaryPrice3}</TableCell>
        </TableRow>
}

        <TableRow>
          <TableCell className="font-medium">Número de Pasajeros</TableCell>
          <TableCell>Cantidad de Pasajeros Adultos</TableCell>
          <TableCell className="text-right">{passenger}</TableCell>
        </TableRow>
        {
          passenger2 && <TableRow>
          <TableCell className="font-medium">Número de Pasajeros</TableCell>
          <TableCell>Cantidad de Pasajeros Menores</TableCell>
          <TableCell className="text-right">{passenger2}</TableCell>
        </TableRow>

        }
        
        {
        passenger3 && <TableRow>
          <TableCell className="font-medium">Número de Pasajeros</TableCell>
          <TableCell>Cantidad de Pasajeros Infantes</TableCell>
          <TableCell className="text-right">{passenger3}</TableCell>
        </TableRow>

        }
        
        
        <TableRow>
          <TableCell className="font-medium">Total</TableCell>
          <TableCell>${unitaryPrice} × {passenger} + ${unitaryPrice2} × ${passenger2} + ${unitaryPrice3} × ${passenger3}}</TableCell>
          <TableCell className="text-right">${finalPrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Adelanto</TableCell>
          <TableCell>{percentage}% </TableCell>
          <TableCell className="text-right">${subPrice1}</TableCell>
        </TableRow>
        <TableRow>
                  </TableRow>
      </TableBody>
    </Table>
  )
}


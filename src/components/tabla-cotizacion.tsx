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
finalPrice: string
passenger: string
percentage: string
subPrice1: string
}

export const TablaCotizacion = ({unitaryPrice,finalPrice,passenger,percentage,subPrice1}:Props)=> {
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
          <TableCell>Precio por pasajero</TableCell>
          <TableCell className="text-right">${unitaryPrice}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Número de Pasajeros</TableCell>
          <TableCell>Cantidad de personas</TableCell>
          <TableCell className="text-right">{passenger}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Total</TableCell>
          <TableCell>${unitaryPrice} × {passenger}</TableCell>
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


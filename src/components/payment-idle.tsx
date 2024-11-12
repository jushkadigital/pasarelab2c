import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"

interface Props {
defaultData : any,
handleStatus: ()=>void
}

export const PaymentIdleForm = ({defaultData,handleStatus}:Props) => {


  const [dialogOpen, setDialogOpen] = useState(false)


  // Validación para el número de tarjeta de crédito
  const creditCardNumberSchema = z
    .string()
    .max(19)
    .min(11)
    .regex(/^[\d\s]{1,19}$/, "El número de tarjeta debe tener 19 dígitos");

  // Validación para la fecha de vencimiento
  const expirationDateSchema = z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "La fecha de vencimiento debe estar en formato MM/YY");

  // Validación para el código de seguridad (CVV)
  const cvvSchema = z
    .string()
    .regex(/^\d{3,4}$/, "El CVV debe tener 3 o 4 dígitos");


  //Validacion para el nombre del CardHolder
  const cardHolderSchema = z.string().max(40, { message: "El nombre es muy largo" })


  // Validación para el correo electrónico 
  const emailSchema = z
    .string()
    .email("Debe ser un correo electrónico válido");

  //Validacion de Terminos y Condicitones
  const termsAndConditionSchema = z.boolean().default(false)

  // Esquema para métodos de pago específicos
  const creditCardSchema = z.object({
    method: z.literal("credit_card"),
    cardNumber: creditCardNumberSchema,
    expirationDate: expirationDateSchema,
    cvv: cvvSchema,
    cardHolder: cardHolderSchema,
    termsAndCondition: termsAndConditionSchema,
    email: emailSchema
  });




  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      method: "credit_card",
      cardNumber: "",
      expirationDate: "",
      cardHolder: "",
      cvv: "",
      termsAndCondition: false,
      email: ""
    }
  })


  function onSubmit(values: z.infer<typeof creditCardSchema>) {
    console.log("AA")
    console.log(values)
    handleStatus()
  }

  return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de Tarjeta</FormLabel>
                    <FormControl>
                      <Input placeholder="Numero de Tarjeta"
                        maxLength={19}
                        {...field}
                        onChange={(e) => {
                          // Elimina todos los espacios en el input
                          const input = e.target.value.replace(/\s+/g, '');

                          // Formatea para añadir un espacio cada cuatro dígitos
                          const formattedInput = input.match(/.{1,4}/g)?.join(' ') || '';

                          // Llama al onChange original de `React Hook Form` para que actualice el estado
                          field.onChange(formattedInput);
                        }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full flex-row ">
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="CVV"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caducidad</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/AA"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caducidad</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Nombre del Propietario </FormLabel>
                    <FormControl>
                      <Input placeholder="Propietario"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="termsAndCondition"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                 Términos y condiciones
                </FormLabel>
                <FormDescription>
                Al hacer click usted esta deacuerdo con nuestros 
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-sm"> términos y condiciones</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Términos y condiciones</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.

                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
                </FormDescription>
              </div>
            </FormItem>
                )}
              />
            </div>

            <Button type="submit">Pagar</Button>
          </form>
        </Form>
  )
}

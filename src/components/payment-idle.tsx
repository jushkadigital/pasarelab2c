'use client'
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
import { useEffect, useState } from "react"

interface Props {
params : any,
}

export const PaymentIdleForm = ({params}:Props) => {


  const [dialogOpen, setDialogOpen] = useState(false)


  //Validacion para el nombre del CardHolder
  const cardHolderSchema = z.string().max(40, { message: "El nombre es muy largo" })


  // Validación para el correo electrónico 
  const emailSchema = z
    .string()
    .email("Debe ser un correo electrónico válido");

  //Validacion de Terminos y Condicitones
  const termsAndConditionSchema = z.boolean().default(false)

  const priceSchema = z
  .number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser un número",
  })
  .positive("El precio debe ser un número positivo")
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
    message: "El precio debe tener máximo dos cifras decimales",
  });

const namePaquetSchema = z.string().max(50,{message: "El nombre es muy largo"})
  // Esquema para métodos de pago específicos
  const creditCardSchema = z.object({
    method: z.literal("credit_card"),
    namePaquete: namePaquetSchema,
    cardHolder: cardHolderSchema,
    termsAndCondition: termsAndConditionSchema,
    email: emailSchema,
    price: priceSchema
  });




  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      method: "credit_card",
      namePaquete: params.namePaquete || "", 
      cardHolder: params.namePassenger || "",
      termsAndCondition: false,
      email: params.email || "",
      price: parseFloat(params.finalPrice) || 0
    }
  })


  function onSubmit(values: z.infer<typeof creditCardSchema>) {
    console.log("AA")
    console.log(values)
  }

  
  return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full">
              <FormField
                control={form.control}
                name="namePaquete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Paquete</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del Paquete"
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
                    <FormLabel> Nombre del Pasajero </FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del Pasajero"
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
                    <FormLabel> Email del Pasajero </FormLabel>
                    <FormControl>
                      <Input placeholder="Email"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input placeholder="Precio"
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

          </form>
        </Form>
  )
}

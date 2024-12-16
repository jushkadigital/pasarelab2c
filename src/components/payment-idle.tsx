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
import { TablaCotizacion } from "./tabla-cotizacion"
import {useMobile} from "@/hooks/useMobile"
import {PayPalScriptProvider ,PayPalButtons} from "@paypal/react-paypal-js"

interface Props {
params : any,
setMethod: React.Dispatch<React.SetStateAction<"idle" | "loading" | "success" | "failed">>,
link:string
termsAndCondition:string
}

const fakePaymentProcessing = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Cambia esto para simular éxito o error
      const isSuccess = true
      isSuccess ? resolve(undefined) : reject(new Error('Payment failed'));
    }, 2000); // Simula 2 segundos de procesamiento
  });

export const PaymentIdleForm = ({params,setMethod,link,termsAndCondition}:Props) => {

  const isMobile = useMobile()
  const [dialogOpen, setDialogOpen] = useState(false)


  //Validacion para el nombre del CardHolder
  const cardHolderSchema = z.string().max(40, { message: "El nombre es muy largo" }).min(1,{message: "El campo no debe estar vacio"})


  // Validación para el correo electrónico 
  const emailSchema = z
    .string()
    .email("Debe ser un correo electrónico válido").min(1,{message: "El campo no debe estar vacio"})

  //Validacion de Terminos y Condicitones
  const termsAndConditionSchema = z.boolean().refine((val) => val, {
    message: "Debes aceptar los términos y condiciones.",
  })

  const priceSchema = z
  .number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser un número",
  })
  .positive("El precio debe ser un número positivo")
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
    message: "El precio debe tener máximo dos cifras decimales",
  });

const namePaquetSchema = z.string().max(50,{message: "El nombre es muy largo"}).min(1,{message: "El campo no debe estar vacio"})
  // Esquema para métodos de pago específicos
  const creditCardSchema = z.object({
    method: z.literal("credit_card"),
    namePaquete: namePaquetSchema,
    cardHolder: cardHolderSchema,
    termsAndCondition: termsAndConditionSchema,
    email: emailSchema,
  });




  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      method: "credit_card",
      namePaquete: params.namePaquete || "", 
      cardHolder: params.namePassenger || "",
      termsAndCondition: false,
      email: params.email || "",
      // price: parseFloat(params.finalPrice) || 0
    }
  })


  async function onSubmit(values: z.infer<typeof creditCardSchema>) {
    console.log(values)
    await handlePayment()
  }

  
const handlePayment = async () => {
    setMethod('loading'); // Muestra el componente de carga
    
    try {
      // Simula el procesamiento del pago
      
      await fakePaymentProcessing();

      // Si el pago es exitoso
    
    window.location.href = link

    } catch (error) {
      // Si ocurre un error en el pago
    }
  };
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
  <div className="flex  flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 ">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:space-y-8 lg:h-[80vh]">
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
                        disabled
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
                        
                        disabled
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
                        disabled
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
                Al hacer click usted esta deacuerdo con nuestros <br/> 
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-sm"> términos y condiciones</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Términos y condiciones</DialogTitle>
                    <DialogDescription dangerouslySetInnerHTML={{ __html: termsAndCondition }} className="tourQWERTY  overflow-y-auto  h-[75vh] text-justify">
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


           { !isMobile && 
            <div className="w-full lg:mt-10" >
              <Button type="submit" > Pagar</Button>
            </div>
            }
              <div className="w-full h-36">
              <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
                <PayPalButtons 
                  style={{color:"black",layout: "horizontal"}}
                  className="w-full"
                  createOrder={async()=> {
                    const res = await fetch('/api/paypal',{
                      method: "POST",
                      body: JSON.stringify({
                        namePaquete: params.namePaquete,
                        price: params.unitaryPriceSub1
                      })
                    })
                    const order = await res.json()
                    console.log(order)
                    return order.id
                  }}
                  onApprove={async(data,actions)=>{
                 const aa = await actions.order.capture()
                 console.log(aa)
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </form>
        </Form>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-stretch">  <TablaCotizacion unitaryPrice={params.unitaryPrice} finalPrice={params.finalPrice} passenger={params.numPasajeros} percentage={params.percentage} subPrice1={params.unitaryPriceSub1} /></div>
         {isMobile && 
            <div className="w-full" >
              <Button type="submit" > Pagar</Button>
            </div>}

        </div>
  )
}

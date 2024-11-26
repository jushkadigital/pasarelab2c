'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { PaymentIdleForm } from "./payment-idle"
import { PaymentLoadingForm } from "./payment-loading"
import { PaymentSuccessForm } from "./payment-success"
import SplashScreen from "./splashScreen"

interface Props {
  defaultData: any
  params: any
}

const fakePaymentProcessing = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Cambia esto para simular éxito o error
      const isSuccess = true
      isSuccess ? resolve() : reject(new Error('Payment failed'));
    }, 2000); // Simula 2 segundos de procesamiento
  });
export const PaymentMethodForm = ({ defaultData, params }: Props) => {


  const [status, setStatus] = useState<"idle" | "loading" | "success" | "failed">('idle');

  const handlePayment = async () => {
    setStatus('loading'); // Muestra el componente de carga

    try {
      // Simula el procesamiento del pago
      await fakePaymentProcessing();

      // Si el pago es exitoso
      setStatus('success');
    } catch (error) {
      // Si ocurre un error en el pago
      setStatus('failed');
    }
  };




  const cases = {
    idle: () =>
      <motion.div
      > <PaymentIdleForm params={params} handleStatus={handlePayment} /> </motion.div>,
    loading: () =>
      <motion.div
        key="loading"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <PaymentLoadingForm />
      </motion.div>,
    success: () =>
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <PaymentSuccessForm />
      </motion.div>,
    default: () => <motion.div></motion.div>,
    failed: () =>
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <PaymentSuccessForm />
      </motion.div>,


  }

  type ccases = typeof cases

  const executeSwitchCases = (cases: ccases) => (key: "idle" | "loading" | "success" | "failed") => (cases[key] || cases.default)()

  const functionSwitch = executeSwitchCases(cases)

  const [message, setMessage] = useState('')

  console.log(process.env.NEXT_PUBLIC_KEY);

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const callFetch = async () => {
      const { amount, reference, email } = params;
      const paymentConf = {
        amount: Number(amount) * 100,
        currency: "USD",
        customer: {
          reference: reference,
          email: email,
        },
        orderId: `order-${new Date().getTime()}`
      }
      console.log(paymentConf)
      const response = await fetch(`/api/createpayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentConf),
      });
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      const result = await response.json();
      const urlPayment = JSON.parse(result.message).answer.paymentURL
      console.log(urlPayment)
    }

    callFetch()

  }, [])

  // useEffect(() => {
  //   // Ocultar el splash screen después de 3 segundos
  //   const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <AnimatePresence>
        {isSplashVisible && <SplashScreen onAnimationComplete={() => setIsSplashVisible(false)} />}
      </AnimatePresence>
      {!isSplashVisible &&
        <Card className="w-full">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4  w-[500px]">
            {functionSwitch(status)}
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>}
    </>
  )
}

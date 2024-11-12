'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { PaymentIdleForm } from "./payment-idle"
import { PaymentLoadingForm } from "./payment-loading"
import { PaymentSuccessForm } from "./payment-success"
import { Button } from "./ui/button"


interface Props {
  defaultData: any
}

const fakePaymentProcessing = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Cambia esto para simular éxito o error
      const isSuccess = true
      isSuccess ? resolve() : reject(new Error('Payment failed'));
    }, 2000); // Simula 2 segundos de procesamiento
  });
export const PaymentMethodForm = ({ defaultData }: Props) => {

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
      > <PaymentIdleForm defaultData={defaultData} handleStatus={handlePayment} /> </motion.div>,
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



  return (
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
    </Card>
  )
}

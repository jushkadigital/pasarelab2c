import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
export const PaymentLoadingForm = () => {
  const override: CSSProperties = {
  // margin: "0 auto",
  display:"block"
};
  return (

    <div className="relative h-[70vh] w-full flex items-center flex-col"> 

    <ClipLoader
        color="#D20000"
        cssOverride={override}
        loading={true}
        size={150}
        className="w-full"
      />
      <div>
      Procesando
      </div>
      </div>
  )
}

import paypal from "@paypal/checkout-server-sdk"
import { NextResponse } from "next/server";

const clientId = "<<PAYPAL-CLIENT-ID>>";
const clientSecret = "<<PAYPAL-CLIENT-SECRET>>";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
//

export async function POST() {

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
          breakdown: {
            items_total: {
              currency_code: "USD",
              value: "100.00"
            }
          }

        },
      }

    ]
  })

  const response = await client.execute(request)
  console.log(response)

  return NextResponse.json({
    id: response.result.id,

  })
}

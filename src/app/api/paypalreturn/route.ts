import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {

  const dataa = await request.json()
  console.log(dataa)



  
  return NextResponse.json({
    "message": "aoeaoe",
    "cache": "update"
  }, { status: 200 })
}

export const revalidate = 0;



import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch"


export async function POST(request: NextRequest) {
  // const secret = request.headers.get("secret");
  const document = await request.json();

  console.log(document)
  // if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
  //   return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  // }

//   const CLAVE_HMAC_SHA_256 = body.
//   const checkHash = (answer, hash, hashKey) => {
//     let key = ''
//     if (hashKey === "sha256_hmac") {
//         key = CLAVE_HMAC_SHA_256;
//     } else if (hashKey === "password") {
//         key = PASSWORD;
//     }
//     const answerHash = Hex.stringify(hmacSHA256(JSON.stringify(answer), key));
//     return hash === answerHash;
// };

  // const data = await createFormToken(document)

  // This will revalidate any URL that matches the provided page file on the next page visit.
  // This will not invalidate pages beneath the specific page.
  // For example, /blog/[slug] won't invalidate /blog/[slug]/[author].

  // revalidatePath("/blog/[slug]", "page");
  // // or with route groups
  // revalidatePath("/(main)/post/[slug]", "page");

  // This will revalidate any URL that matches the provided layout file on the next page visit.
  // This will cause pages beneath with the same layout to revalidate on the next visit.
  // For example, in the above case, /blog/[slug]/[another] would also revalidate on the next visit.

  // revalidatePath("/blog/[slug]", "layout");
  // // or with route groups
  // revalidatePath("/(main)/post/[slug]", "layout");

  return NextResponse.json({
    "message": "aoe",
    "cache": "update"
  }, { status: 200 })
}

export const revalidate = 0;

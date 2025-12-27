import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request, { params }) {
  try {
    const { shortUrl } = params

    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    const doc = await collection.findOne({ shortUrl })

    if (doc?.url) {
      let redirectUrl = doc.url

      // 🔑 ENSURE absolute URL
      if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
        redirectUrl = "https://" + redirectUrl
      }

      return NextResponse.redirect(new URL(redirectUrl))
    }

    return NextResponse.redirect(new URL("/", request.url))
  } catch (error) {
    console.error("Redirect error:", error)
    return NextResponse.redirect(new URL("/", request.url))
  }
}

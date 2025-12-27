export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
  const { shortUrl } = params

  const client = await clientPromise
  const db = client.db("bitlinks")
  const collection = db.collection("url")

  const doc = await collection.findOne({ shortUrl })

  if (doc?.url) {
    // Redirect to original URL
    redirect(doc.url)
  }

  // If short URL not found, go to home page
  redirect("/")
}

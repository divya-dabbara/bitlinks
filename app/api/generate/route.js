export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 10

import clientPromise from "@/lib/mongodb"

// Handle accidental GET requests (prevents 504 timeouts)
export async function GET() {
  return Response.json(
    { success: false, message: "Use POST to generate short URL" },
    { status: 405 }
  )
}

// Handle POST requests
export async function POST(request) {
  try {
    // 1. Parse request body safely
    const body = await request.json()
    const { url, shortUrl } = body || {}

    // 2. Validate input
    if (!url || !shortUrl) {
      return Response.json(
        { success: false, message: "Missing url or shortUrl" },
        { status: 400 }
      )
    }

    // 3. Connect to MongoDB (cached connection)
    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    // 4. Check if short URL already exists
    const existing = await collection.findOne({ shortUrl })
    if (existing) {
      return Response.json(
        { success: false, message: "Short URL already exists" },
        { status: 409 }
      )
    }

    // 5. Insert into DB
    await collection.insertOne({
      url,
      shortUrl,
      createdAt: new Date(),
    })

    // 6. Always return success response
    return Response.json({
      success: true,
      message: "URL shortened successfully",
    })
  } catch (error) {
    console.error("Generate API error:", error)

    // 7. Catch ALL failures (prevents hanging → no 504)
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}

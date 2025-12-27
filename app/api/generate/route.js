import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    // 1. Parse body safely
    const body = await request.json()

    const { url, shortUrl } = body || {}

    if (!url || !shortUrl) {
      return Response.json(
        { success: false, error: true, message: "Missing url or shortUrl" },
        { status: 400 }
      )
    }

    // 2. Connect to MongoDB (cached client)
    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    // 3. Check if short URL exists
    const existing = await collection.findOne({ shortUrl })

    if (existing) {
      return Response.json(
        { success: false, error: true, message: "Short URL already exists" },
        { status: 409 }
      )
    }

    // 4. Insert document
    await collection.insertOne({
      url,
      shortUrl,
      createdAt: new Date(),
    })

    // 5. ALWAYS return a response
    return Response.json({
      success: true,
      error: false,
      message: "URL shortened successfully",
    })
  } catch (error) {
    console.error("API /generate error:", error)

    // 6. Catch ALL failures (prevents 504)
    return Response.json(
      { success: false, error: true, message: "Internal server error" },
      { status: 500 }
    )
  }
}

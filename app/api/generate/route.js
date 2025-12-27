import clientPromise from "@/lib/mongodb"
// This is an API route that connects to MongoDB and returns a simple JSON response
export async function POST(request) {
    // This is a simple API route that returns a JSON response
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // Check if the short url already exists
    const doc = await collection.findOne({ shortUrl: body.shortUrl });
    if (doc) {
        return Response.json({ success: false, error: true, message: 'Short URL already exists' })
    }

    const result = await collection.insertOne({
        url: body.url,
        shortUrl: body.shortUrl,
    })


  return Response.json({success: true, error: false, message: 'URL shortened successfully' })
}
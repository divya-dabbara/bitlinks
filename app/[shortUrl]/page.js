import {redirect} from 'next/navigation';
import clientPromise from '@/lib/mongodb';


export default async function Page({params}){
    const shortUrl = (await params).shortUrl;

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shortUrl: shortUrl });
    console.log(doc);
    if (doc) {
        // If the short URL exists, redirect to the original URL
        redirect(doc.url);
        
    }else{
        redirect(`${process.env.NEXT_PUBLIC_HOST}`);
    }

    return <div>My Post: {url}</div>
}
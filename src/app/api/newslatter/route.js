import dbConnect, { collectionNamesObj } from "@/lib/db.connect";

export async function POST(req) {
  try {
    const data = await req.json();

    const collection = await dbConnect(collectionNamesObj.newslatterSubscribersCollection);

    const newsletterData = {
      name: data.name || "Anonymous",
      email: data.email,
      image: data.image || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newsletterData);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

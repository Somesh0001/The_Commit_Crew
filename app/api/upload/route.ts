import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import connectDB from "../../../lib/mongo";
import Events from "../../../models/Events"

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});


async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `events/${Date.now()}-${fileName}`, 
    Body: file,
    ContentType: "image/jpeg", 
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `${process.env.AWS_S3_URL}/${params.Key}`; 
}


export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    
  
    const title = formData.get("title");
    const author = formData.get("author");
    const body = formData.get("body");
    const briefSummary = formData.get("briefSummary");
    const location = formData.get("location");
    
    
    if (!title || !author || !body || !briefSummary || !location) {
      return NextResponse.json({ error: "Please provide all required fields." }, { status: 400 });
    }

    const files = formData.getAll("images"); 

    if (files.length === 0) {
      return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    }

  
    const uploadedFileUrls: string[] = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileUrl = await uploadFileToS3(buffer, file.name);
        uploadedFileUrls.push(fileUrl); 
      }
    }
    for(let i = 0; i < uploadedFileUrls.length; i++) {  
      console.log("uploadedFileUrls", uploadedFileUrls[i]);
      uploadedFileUrls[i] = uploadedFileUrls[i].replace("undefined", `${process.env.PREURL}`);
    }
    let data =   {
        title,
        author,
        body,
        briefSummary,
        location,
        imageUrls: uploadedFileUrls,
      };  
    const event = await Events.create(data);
    console.log("uploadedFileUrls", uploadedFileUrls);
    console.log("data", data);
   
    return NextResponse.json({
      success: true,event
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong during the upload process." }, { status: 500 });
  }
}

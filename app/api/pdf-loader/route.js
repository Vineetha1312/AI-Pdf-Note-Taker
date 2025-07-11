import {NextResponse} from "next/server";
import {WebPDFLoader} from "@langchain/community/document_loaders/web/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfUrl = "https://befitting-marten-478.convex.cloud/api/storage/c489e492-da8a-454c-a837-03cd53ea5e1b"
export async function GET(req){

    const reqUrl=req.url;
    const {searchParams} = new URL(reqUrl)
    const pdfUrl=searchParams.get('pdfUrl');
    console.log(pdfUrl)
    //1.load the Pdf File   
    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data);
    const docs=await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent+" ";
    })

    //2.Split the Text into Small Chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList=[];
    output.forEach((doc)=> {
        splitterList.push(doc.pageContent);
    })

    return NextResponse.json({result:splitterList})
}
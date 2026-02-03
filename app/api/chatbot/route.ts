import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mode, data } = await req.json();

  try {
    let response;

    if (mode === "hr") {
      // Form-based mode, process HR data
      response = await processHRData(data); // Replace with your logic to handle HR requests
    } else if (mode === "text") {
      // Free-text mode, send to AI for processing
      response = await processTextData(data); // Replace with AI/Backend call
    }

    return NextResponse.json({ reply: response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Dummy functions for processing data (replace with actual logic)
async function processHRData(data: any) {
  return "Your leave request has been submitted successfully!";
}

async function processTextData(data: any) {
  return "Here is the response to your query!";
}

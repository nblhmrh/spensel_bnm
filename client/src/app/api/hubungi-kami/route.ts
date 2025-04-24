import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward the request to your Laravel backend
    const response = await axios.post('http://localhost:8000/api/hubungi-kami', body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error in hubungi-kami API route:', error);
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
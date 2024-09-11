// http://localhost:3000/api/hello

// shortcur: rag

export async function GET(request: Request) {

  return Response.json({
    message: 'Hello World',
    method: request.method,
  });
}


export async function POST(request: Request) {

  return Response.json({
    message: 'Hello World',
    method: request.method,
  });
}



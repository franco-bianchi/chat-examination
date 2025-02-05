const options: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
} 

export async function GET() {
    try {
        const url = process.env.API_URL as string;
        const res = await fetch(url, options);
        if(!res.ok) {
            return Response.json({ error: 'Messages not available'}, {status: 400});
        }
        const data = await res.json();
        return Response.json({data});
    } catch (err) {
        if(err instanceof Error){
            return Response.json({ error: err.message}, {status: 500});
        }
        return Response.json({ error: 'An unknown error ocurred'}, {status: 500});
    }
}
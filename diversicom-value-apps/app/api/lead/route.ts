export async function POST(req: Request) {
  const body = await req.json();
  console.log("Lead received (demo):", body);
  return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
}

// Same-origin gateway keeps HttpOnly authentication cookies on the demo host.
export async function onRequest({request, env, params}) {
  if (!env.API_ORIGIN) return new Response("Demo API is not configured", {status: 503});
  const source = new URL(request.url);
  const target = new URL(`/api/${params.path.join("/")}${source.search}`, env.API_ORIGIN);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("X-Forwarded-Proto", "https");
  const upstream = await fetch(target, {method: request.method, headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual"});
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.set("Cache-Control", "no-store");
  const type = responseHeaders.get("Content-Type") || "";
  if (type.includes("application/json")) {
    // DRF pagination must remain same-origin, including authenticated pages.
    const text = (await upstream.text()).split(env.API_ORIGIN + "/api/").join(source.origin + "/api/");
    responseHeaders.delete("Content-Length");
    return new Response(text, {status: upstream.status, headers: responseHeaders});
  }
  return new Response(upstream.body, {status: upstream.status, headers: responseHeaders});
}

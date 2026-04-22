export function startHttpServer() {
  const server = Bun.serve({
    port: 8080,
    routes: {
      "/api/status": new Response("OK"),

      "/": new Response("Default router of bloop bun server"),
    },

    fetch(req) {
      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`Running on port: ${server.port}`);
  return server;
}

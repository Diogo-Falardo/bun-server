const server = Bun.serve({
  routes: {
    "/api/status": new Response("OK"),

    "/": new Response("Default router of bloop bun server"),
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running at ${server.url}`);

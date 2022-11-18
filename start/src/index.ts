import Fastify from "fastify"

const app = Fastify({
  logger: true,
})

app.get("/", async (req, res) => {
  return { hello: "world" }
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})

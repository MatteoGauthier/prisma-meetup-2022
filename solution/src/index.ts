import Fastify from "fastify"
import prisma from "./lib/prisma"
const app = Fastify({
  logger: true,
})

app.get("/rooms", async (req, res) => {
  const rooms = await prisma.room.findMany()
  return res.send(rooms)
})

app.post<{
  Body: {
    name: string
    description: string
    surface: number
  }
}>("/rooms", async (req, res) => {
  const room = await prisma.room.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      surface: req.body.surface,
    },
  })
  return res.send(room)
})

app.get<{ Params: { id: string | number } }>("/rooms/:id", async (req, res) => {
  const room = await prisma.room.findUnique({
    where: {
      id: Number(req.params.id),
    },
  })
  return res.send(room)
})

app.patch<{ Params: { id: string | number } }>("/rooms/:id/take", async (req, res) => {
  const room = await prisma.room.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      isAvailable: false,
    },
  })
  return res.send(room)
})

app.patch<{ Params: { id: string | number } }>("/rooms/:id/untake", async (req, res) => {
  const room = await prisma.room.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      isAvailable: true,
    },
  })
  return res.send(room)
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})

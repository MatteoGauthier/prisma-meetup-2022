import prisma from "../src/lib/prisma"

async function main() {
  Promise.all([
    await prisma.room.create({
      data: {
        name: "Gaya",
        description: "Gaya's room",
        surface: 20,
        isAvailable: true,
      },
    }),
    await prisma.room.create({
      data: {
        name: "Biotope",
        description: "Room with screen projector",
        surface: 10,
        isAvailable: false,
      },
    }),
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {login: "unr1ll", passwordHash: "FLSDKGJLSS+=23DSLF", rating: 1000},
  });

  await prisma.game.create({
    data: {
        players: {
            connect: {
                id: user.id
            }
        },
        status: 'idle',
        field: Array(9).fill(null),
    }
  });

  await prisma.game.create({
    data: {
        players: {
            connect: {
                id: user.id
            }
        },
        status: 'idle',
        field: Array(9).fill(null),
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

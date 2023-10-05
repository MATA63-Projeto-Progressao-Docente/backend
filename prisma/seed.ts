import prisma from './client';

async function main() {
  return prisma.user.upsert({
    where: { email: 'admin@ufba.br' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@ufba.br',
      password: '$2a$10$0.IkWiuZ2bmxdd7ZA2hpQ..U5pukWjKZymtp6TebYx7XE/ghsP2jW',
      role: 'ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e); // eslint-disable-line no-console
    await prisma.$disconnect();
    process.exit(1);
  });

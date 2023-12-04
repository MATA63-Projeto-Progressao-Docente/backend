import prisma from './client';
import activitiesJson from './jsons/activities.json';
import fieldsJson from './jsons/fields.json';

async function seedFields() {
  const promises = fieldsJson.map(async (field) => prisma.field.upsert({
    where: {
      id: field.id,
    },
    update: { },
    create: {
      id: field.id,
      name: field.name,
    },
  }));
  await Promise.all(promises);
}

async function seedActivities() {
  const promises = activitiesJson.map(async (activity) => prisma.activity.create({
    data: {
      name: activity.name,
      number: activity.number,
      fieldId: activity.fieldId,
      points: activity.points,
    },
  }));
  await Promise.all(promises);
}

async function main() {
  await seedFields();
  await seedActivities();

  await prisma.user.upsert({
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

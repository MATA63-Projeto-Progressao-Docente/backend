import prisma from './client';
import activitiesJson from './jsons/activities.json';
import fieldsJson from './jsons/fields.json';
import departmentsJson from './jsons/departments.json';
import usersJson from './jsons/users.json';
import classesJson from './jsons/classes.json';
import professorsJson from './jsons/professor.json';

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

async function seedClasses() {
  const promises = classesJson.sort((a, b) => a.id - b.id)
    .map(async (classItem) => prisma.class.create({
      data: {
        id: classItem.id,
        name: classItem.name,
        letter: classItem.letter,
        level: classItem.level,
      },
    }));
  await Promise.all(promises);
}

async function seedUsers() {
  const promises = usersJson.map(async (user) => prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'USER',
    },
  }));
  await Promise.all(promises);
}

async function seedDepartments() {
  const promises = departmentsJson.map(async (department) => prisma.department.create({
    data: {
      name: department.name,
      headUserId: department.headUserId,
    },
  }));
  await Promise.all(promises);
}

async function seedProfessors() {
  const promises = professorsJson.map(async (professor) => {
    const user = await prisma.user.findFirst({
      where: {
        name: professor.name,
      },
    });
    if (!user) { return null; }
    return prisma.professor.create({
      data: {
        name: professor.name,
        classId: professor.classId,
        departmentId: professor.departmentId,
        category: 'EXCLUSIVE',
        userId: user.id,
      },
    });
  });
  await Promise.all(promises);
}

async function main() {
  await seedFields();
  await seedActivities();
  await seedUsers();
  await seedClasses();
  await seedDepartments();
  await seedProfessors();

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

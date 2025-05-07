import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
await prisma.$connect();

const connectDB = async() => {
    try {
        await prisma.$connect();
        console.log('Database Connected');
    } catch (error) {
        console.error('Database Connection Error:', error);
        process.exit(1);
    }
};

export { prisma, connectDB };
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const prisma = new PrismaClient();

const prismaClient = prisma.$extends(fieldEncryptionExtension());

export default prismaClient;

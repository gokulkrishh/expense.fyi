import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const prisma = new PrismaClient();

const prismaClient = prisma.$extends(
	fieldEncryptionExtension({
		encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
	})
);

export default prismaClient;

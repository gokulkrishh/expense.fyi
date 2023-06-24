import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

const prisma = new PrismaClient();

prisma.$use(
	fieldEncryptionMiddleware({
		encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
	})
);

export default prisma;

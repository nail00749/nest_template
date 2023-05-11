import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    scrypt,
    timingSafeEqual
} from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class SecureService {
    iv = randomBytes(16);

    constructor(private config: ConfigService) {}

    async hash(value: string) {
        try {
            const salt = randomBytes(16).toString('hex');
            const buf = (await scryptAsync(value, salt, 64)) as Buffer;
            return `${buf.toString('hex')}.${salt}`;
        } catch (e) {
            throw new Error(e);
        }
    }

    async verifyHash(value: string, hashingData: string) {
        const [hashedPassword, salt] = hashingData.split('.');
        const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');
        const suppliedPasswordBuff = (await scryptAsync(
            value,
            salt,
            64
        )) as Buffer;
        return timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBuff);
    }

    async crypt(value: string) {
        const key = (await promisify(scrypt)(
            this.config.get('CRYPT_SECRET'),
            'salt',
            32
        )) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, this.iv);
        const encryptedText = Buffer.concat([
            cipher.update(value),
            cipher.final()
        ]);
        return encryptedText.toString('base64');
    }

    async decrypt(value: string) {
        const key = (await promisify(scrypt)(
            this.config.get('CRYPT_SECRET'),
            'salt',
            32
        )) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
        const decryptedText = Buffer.concat([
            decipher.update(Buffer.from(value, 'base64')),
            decipher.final()
        ]);
        return decryptedText.toString('utf-8');
    }
}

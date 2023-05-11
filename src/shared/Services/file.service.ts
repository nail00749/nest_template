import { MultipartFile } from '@fastify/multipart';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { FileTypeArg } from '../Enums/FileType';
import { promisify } from 'util';
import { pipeline } from 'stream';

const pump = promisify(pipeline);

@Injectable()
export class FileService {
    async saveFile(data: MultipartFile, type: FileTypeArg) {
        const fileExtension = path.extname(data.filename);
        const fileName = uuid.v4() + fileExtension;
        const filePath = path.resolve(__dirname, '..', '..', 'static', type);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        await pump(
            data.file,
            fs.createWriteStream(path.resolve(filePath, fileName))
        );
        const pathName = type + '/' + fileName;

        return {
            originalName: data.filename,
            name: pathName,
            mimeType: data.mimetype
        };
    }

    async;

    removeFile(fileName: string) {
        const filePath = path.resolve(
            __dirname,
            '..',
            '..',
            'static',
            fileName
        );
        if (fs.existsSync(filePath)) {
            fs.rmSync(filePath);
            return true;
        }
        return false;
    }
}

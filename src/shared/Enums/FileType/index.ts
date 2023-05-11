export const FileType = {
    IMG: 'img',
    GALLERY: 'gallery',
    AVATAR: 'avatar'
} as const;

export type FileTypeArg = (typeof FileType)[keyof typeof FileType];

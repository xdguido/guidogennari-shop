import slugify from 'slugify';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghijk', 4);

export default function toSlug(value: string): string {
    const slug = slugify(value, { remove: /[*+~.()'"!?:@]/g, lower: true });
    const id = nanoid();
    return `${slug}-${id}`;
}

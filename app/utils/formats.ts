export const FormatToFullDate = (createdAt: number): string => {
    const date = new Date(createdAt);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}
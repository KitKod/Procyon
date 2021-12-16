/**
 * Recursively check object and create special object that contain key and File from object and nested object
 * additionally properties with File object will be removed from initial object
 * @param obj - Object from which files should be removed and returned as a single object
 */
export function extractFilesFromObject(obj: unknown): Record<string, File> {
    if (Array.isArray(obj) || typeof obj !== 'object' || !obj) {
        return {};
    }

    return Object.entries(obj).reduce<Record<string, File>>((acc, [key, value]) => {
        if (value instanceof File) {
            delete obj[key as keyof typeof obj];
            return { ...acc, [key]: value };
        }

        if (Array.isArray(value)) {
            return value.reduce<Record<string, File>>(
                (subAcc, rec) => ({ ...subAcc, ...extractFilesFromObject(rec) }),
                acc,
            );
        }

        if (typeof value === 'object' && value) {
            return { ...acc, ...extractFilesFromObject(value as Record<string, unknown>) };
        }

        return acc;
    }, {});
}

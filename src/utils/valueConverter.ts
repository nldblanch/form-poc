/**
 * Converts a label to a standardized value format:
 * - Convert to lowercase
 * - Replace spaces with underscores
 * - Remove special characters except underscores
 * - Handle apostrophes and hyphens
 */
export const createValueFromLabel = (label: string): string => {
    return label
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
        .replace(/\s+/g, '_')         // Replace spaces with underscores
        .replace(/_+/g, '_')         // Replace multiple underscores with single
        .replace(/^_|_$/g, '');      // Remove leading/trailing underscores
};

/**
 * Helper function to create option objects with standardized values
 */
export const createOption = (label: string) => ({
    label,
    value: createValueFromLabel(label)
});

/**
 * Helper function to create multiple options at once
 */
export const createOptions = (labels: string[]) =>
    labels.map(createOption);

/**
 * Generate an HTML class name from an array of classes
 * @param classNames - Array of strings
 * @returns string | undefined
 */
export const classList = classNames => {
    const classListString = classNames
        .filter(className => (typeof className === 'string' && className.length))
        .map(className => className.trim())
        .join(' ')
    return classListString.length ? classListString : undefined
}

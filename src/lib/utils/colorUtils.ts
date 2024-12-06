export function generateColor(index: number): string {
    const colors = [
        'purple', 'emerald', 'sky', 'amber', 'red', 'blue', 'green', 'yellow', 'pink', 'indigo'
    ];
    return colors[index % colors.length];
}
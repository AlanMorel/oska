export function partition(array: any[], fn: any): [any[], any[]] {
    return array.reduce(
        (acc, val, i, arr) => {
            acc[fn(val, i, arr) ? 0 : 1].push(val);
            return acc;
        },
        [[], []]
    );
}

export default function getAverageIndex(array: number[]) {
    const values = [...array];
    if (values.length === 0) throw new Error("No inputs");
    values.sort(function (a, b) {
        return a - b;
    });
    return array.indexOf(values[values.length / 2]);
}

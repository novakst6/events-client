export function dateFromString(str) {
    var m = str.match(/(\d+). (\d+). (\d+)\s+(\d+):(\d+):(\d+)/);
    return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], 0);
}

export function round(date: Date, offset: number): string {
    if (offset) {
        date = this.offset(date, offset)
    }
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60))
    date.setMinutes(0)
    date.setSeconds(0)
    return date.toLocaleString()
}

export function offset(date, offset) {
    return new Date(date.getTime() + offset * 1000 * 3600)
}
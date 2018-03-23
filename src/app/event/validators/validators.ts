import { FormGroup } from "@angular/forms";

export function ValidTimeInterval(group: FormGroup) {
    if (group.controls && group.controls['from'] && group.controls['to']) {
        let dFrom = dateFromString(group.controls['from'].value)
        let dTo = dateFromString(group.controls['to'].value)
        if (dFrom.getTime() > dTo.getTime()) {
            return {invalidInterval: true}
        } 

    }
    return null
}

function dateFromString(str) {
    var m = str.match(/(\d+). (\d+). (\d+)\s+(\d+):(\d+):(\d+)/);
    return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], 0);
}
import { GridItemType } from "../types/GridItemType";

export const shuffler = (arr:GridItemType[]) =>{
    let n = arr.length;
    for(let idx = 0; idx < n - 1; idx++){
        let toIdx = idx + Math.floor((n - idx) * Math.random());
        let tmpVal = arr[toIdx];
        arr[toIdx] = arr[idx];
        arr[idx] = tmpVal;
    }
    return arr;
}
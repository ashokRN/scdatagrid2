import { useEffect, useState } from "react";


const calculate = (data: Object[], rowPerPage: number) => {

    const range:number[] = [];
    const num = Math.ceil(data.length / rowPerPage);
    for (let index = 1; index <= num; index++) {
        range.push(index);

    }

    return range;

}

const sliceData = (data: Object[], page: number, rowPerPage: number) => {
    return data.slice((page - 1) * rowPerPage, page * rowPerPage);
}

const useTableHook = (data: Object[], page: number, rowPerPage: number) => {
    const [tabRange, setTabRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<Object[]>([]);

    useEffect(() => {
        const range = calculate(data, rowPerPage);
        setTabRange([...range]);

        const slicedata = sliceData(data, page, rowPerPage);
        setSlice([...slicedata]);
    }, [data, setTabRange, page, setSlice]);


    return { slice, range: tabRange };
}

export default useTableHook;
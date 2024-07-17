import React from "react";
import SearchBar from "./SearchBar";
import TableFooter from "./TableFooter";
import useTableHook from "../hooks/table";


interface HeaderDataProps {
    Header: string,
    filterable?: boolean,
    accessor: string
}
interface DataGridProps {
    headerData?: HeaderDataProps[]
    columData?: object[],
    globalSearch?: boolean,
    numOfRows?: number,
    tableTitleName?: string,
    tableTitle?: boolean,
    pagination?: boolean,
    loading?: boolean,
    showMenu?: boolean

}

interface JsonArray extends Array<JsonValue> { }

type JsonValue = string | number | boolean | JsonObject | JsonArray | null | undefined


type JsonObject = { [Key in string]?: JsonValue }


type HeaderComponentProps = {
    data: string[]
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ data = [] }) => {
    return <thead>
        <tr>
            {data.length > 0 ? data.map((item, index) => <th key={index + 1} scope="col">{item}</th>) : <th />}
        </tr>
    </thead>

}

type ColumComponentProps = {
    columData: any[][]
}

const ColumComponet: React.FC<ColumComponentProps> = ({ columData = [] }) => {

    return <React.Fragment>
        {columData.length > 0 ? <tbody>
            {columData.map((colum, index) => (
                <tr key={index}>{colum.map((item, i) => (<td key={i}>{item}</td>))}</tr>
            ))}
        </tbody> : <tbody />}
    </React.Fragment>

}



const DataGrid: React.FC<DataGridProps> = ({
    headerData = [],
    columData = [],
    globalSearch = true,
    numOfRows = 5,
    tableTitleName = 'Solution Champ Table',
    tableTitle = true,
    pagination = true,

}) => {

    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(1);
    const { slice, range } = useTableHook(columData, page, numOfRows);


    const _getHeadData = (data: HeaderDataProps[]) => {

        let headArrData = ["Sl.No"];

        for (let index = 0; index < data.length; index++) {
            headArrData.push(data[index]["Header"]);
        }
        return headArrData;

    }

    const _getBodyData = (rowData: HeaderDataProps[], columData: object[]) => {
        let columDataArrList = [];
        for (let index = 0; index < columData.length; index++) {
            let colum = [];
            for (let j = 0; j < rowData.length; j++) {
                let obj: JsonObject = columData[index];
                let accessor = rowData[j].accessor;
                let tempObj: any;
                if (accessor.includes(".")) {
                    accessor.split('.').map((k, i) => {
                        if (i === 0) tempObj = obj[k];
                        else tempObj = tempObj[k];
                    });
                    colum.push(tempObj);
                }
                else colum.push(obj[accessor]);
            }
            columDataArrList.push([index + 1, ...colum]);
        }

        return columDataArrList;

    }
    //TODO: Added nested filter in this Fn
    const filteredRows = (data: Object[]) => {
        return data.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            ));
    };



    return <div className="data_grid_container">
        {tableTitle && <div className="data_grid_title_container">
            <div className="data_grid_title_name">{tableTitleName}</div></div>}
        <div className="data_grid_body_container">
            {globalSearch && <SearchBar value={searchTerm} onChange={(value:any) => setSearchTerm(value)} />}
            {slice.length !== 0 ?
                <React.Fragment>
                    <table className="table table-bordered">
                        <HeaderComponent data={_getHeadData(headerData)} />
                        <ColumComponet columData={_getBodyData(headerData, searchTerm === "" ? pagination ? slice : columData : filteredRows(columData))} />
                    </table>
                    <TableFooter range={range} slice={slice} setPage={setPage} page={page} setRowPerPage={(dt:number) => {
                        console.log(dt);
                    }} />
                </React.Fragment> : <div>Loading...</div>}
        </div>
    </div>
}

export default DataGrid;
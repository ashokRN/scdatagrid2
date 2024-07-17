import React from "react";

interface TableFooterProps {
    range: any[],
    setPage?: Function,
    setRowPerPage?: Function,
    page: number,
    slice: any[]
}

const TableFooter: React.FC<TableFooterProps> = ({
    range = [],
    setPage = () => { },
    setRowPerPage = () => { },
    page = 1,
    slice = []
}) => {

    React.useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className="data_grid_pagination_container">
            <div className="data_grid_show_menu_con">
                <div>Rows per Page : </div>
                <select>
                    {[5, 10, 15, 20, 50].map((x, i) => <option key={i} onClick={() => setRowPerPage(x)}>{x}</option>)}
                </select>
            </div>
            <div className="data_grid_pagination_inner_container">
                {
                    range.length > 0 && range.map((item, index) => (
                        <button key={index} className={page === item ? 'pagination_active' : ''} onClick={() => setPage(item)}>{item}</button>
                    ))
                }
            </div>
        </div>
    )

}

export default TableFooter;
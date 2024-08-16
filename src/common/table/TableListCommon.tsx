import React, { useState, useRef, useEffect } from 'react';

interface Column {
    title: string;
    key: string;
    width?: number;
}

interface TableListCommonProps {
    columns: Column[];
    data: Record<string, any>[]; // Array of objects, each representing a row
    widthCheckbox: number;
}

const TableListCommon: React.FC<TableListCommonProps> = ({ columns, data, widthCheckbox }) => {
    const [colWidths, setColWidths] = useState([widthCheckbox, ...columns.map(col => col.width || 100)]);
    const [totalWidth, setTotalWidth] = useState(colWidths.reduce((acc, width) => acc + width, 0));
    const tableRef = useRef<HTMLTableElement>(null);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);
    const colIndexRef = useRef(0);

    useEffect(() => {
        setTotalWidth(colWidths.reduce((acc, width) => acc + width, 0));
    }, [colWidths]);

    const handleMouseDown = (e: React.MouseEvent, index: number) => {
        startXRef.current = e.clientX;
        startWidthRef.current = colWidths[index];
        colIndexRef.current = index;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startXRef.current;
        const newWidth = startWidthRef.current + deltaX;

        setColWidths(prevWidths => {
            const updatedWidths = [...prevWidths];
            updatedWidths[colIndexRef.current] = newWidth;
            return updatedWidths;
        });
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            style={{
                width: totalWidth + 20,
                maxWidth: '100%'
            }}
            className="max-h-96 w-auto overflow-auto">
            <table ref={tableRef} style={{ width: totalWidth }} className="table-fixed border-collapse border-[2px] border-[#548EA6]">
                <thead className='bg-[#548EA6] text-white border-[#548EA6] border-collapse sticky top-[-2px] z-10 py-8'>
                    <tr>
                        <th
                            style={{ width: widthCheckbox }}
                            className="border p-2 relative border-white text-[#FFFFFF] bg-[#548EA6]"
                        >
                        </th>
                        {columns.map((col, index) => (
                            <th
                                key={col.key}
                                style={{ width: colWidths[index + 1] }} // Offset index for the added checkbox column
                                className="border px-3 py-2 relative border-white text-[#FFFFFF] bg-[#548EA6]"
                            >
                                {col.title}
                                <div
                                    onMouseDown={(e) => handleMouseDown(e, index + 1)} // Adjust index for the added checkbox column
                                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                                    style={{ userSelect: 'none' }}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-white">
                            <td style={{ width: widthCheckbox }} className="border bg-[#E9EEF1] border-white p-2 text-center">
                                <input type="checkbox" className="w-[15px] h-[15px]" />
                            </td>
                            {columns.map((col, colIndex) => (
                                <td
                                    key={col.key}
                                    style={{ width: colWidths[colIndex + 1] }} // Adjust index for the added checkbox column
                                    className="border bg-[#E9EEF1] border-white p-2 text-center px-3 py-2"
                                >
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableListCommon;

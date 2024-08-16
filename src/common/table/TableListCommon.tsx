import React, { useState, useRef } from 'react';

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
    const [colWidths, setColWidths] = useState([30, ...columns.map(col => col.width || 100)]); // Add 25px for the checkbox column
    const tableRef = useRef<HTMLTableElement>(null);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);
    const colIndexRef = useRef(0);

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
        <div className="pb-4 max-w-full w-full overflow-x-auto pl-5">
            <table ref={tableRef} className="w-auto table-fixed border-collapse border-[2px] border-[#548EA6] max-h-24 overflow-y-auto">
                <thead>
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

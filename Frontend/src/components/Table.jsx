import './table.css';

const TableComponent = ({ headers, data, onAction }) => {
    const subjects = {
        1: 'Maths',
        2: 'English',
        3: 'Hindi',
        4: 'Social',
        5: 'Physics',
    };

    return (
        <div className="table-container bg-light p-4 rounded mt-5">
            <table className="table custom-table align-middle">
                <thead>
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td className="d-flex align-items-center gap-2">
                                <div className="avatar">
                                    {row.name.charAt(0)}
                                </div>
                                {row.name}
                            </td>
                            <td>{subjects[row.subject_name]}</td>
                            <td>{row.marks}</td>
                            <td>
                                <button
                                    className="btn btn-sm action-btn"
                                    onClick={() => onAction(row)}
                                >
                                    <i className="bi bi-chevron-down"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <button className="btn btn-dark">Add</button>
            </div>
        </div>
    );
};

export default TableComponent;

import React from 'react'
import Field from './Field'

export default function DataTable({ data }) {
    const headers = [
        "ID",
        "Full Name",
        "Phone",
        "Email",
        "Age",
        "Experience",
        "Yearly Income",
        "Has children",
        "License states",
        "Expiration date",
        "License number",
        "Duplicate with"
    ]

    const isRowDuplicated = (row, rowIndex) => {
        const fieldDuplicatedIndex = data.findIndex((tableRow, index) => {
            let result = false
            if (index !== rowIndex) {
                if (row[1].toLowerCase().replace('+', '') === tableRow[1].toLowerCase().replace('+', '')) {
                    result = true
                } else if (row[2].toLowerCase() === tableRow[2].toLowerCase()) {
                    result = true
                }
            }
            return result
        })

        if (fieldDuplicatedIndex !== -1) {
            return fieldDuplicatedIndex + 1
        }
        return null
    }

    const generateKey = () => {      
        return Math.floor(Math.random() * 100000000).toString()
    }

    return (
        <div className="table">
            <table>
                <tbody>
                    <tr>
                        {
                            headers.map((item) =>
                                <th key={generateKey()}>{item}</th>
                            )
                        }
                    </tr>
                    {
                        data? (
                            data.map((row, index) =>
                                <tr key={generateKey()}>
                                    <td>{index + 1}</td>
                                    {
                                        row.map((field, idx) =>
                                            <Field
                                                data={data}
                                                fieldData={field}
                                                rowIndex={index}
                                                fieldIndex={idx}
                                                headers={headers}                                                  
                                                key={generateKey()}
                                            />
                                        )
                                    }
                                    <td>{isRowDuplicated(row, index)}</td>
                                </tr>
                            )
                        ) : null                
                    }
                    </tbody>
            </table>
           
        </div>
    )
}
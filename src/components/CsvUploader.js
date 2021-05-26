import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import DataTable from './DataTable'

export default function CsvUploader() {
    const [csvData, setCsvData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleData = (data, fileInfo) => {
        const validFileType = fileInfo.name.split('.').pop() === 'csv'
        const validFileData = isFileValid(data)

        setLoading(true)
        if (!validFileType || !validFileData) {
            setError("File is not correct.")
        } else {
            setCsvData(data)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
	}

	const handleError = () => {
		setError("Something is wrong.")
	}

    const isFileValid = (data) => {
        let counter = 0

        data.forEach(row => 
            row.forEach((field, index) => {
                if (index < 3 && field === "") counter++
            })
        )

        return counter === 0 ? true : false
    }

    if (loading) return <p>Loading...</p>
    return (
        <div className="work-space">
            <p>You can import employees from your csv file.</p>
            <CSVReader
                cssClass="csv-reader-input"
                onFileLoaded={handleData}
                onError={handleError}
            />
            {csvData ? (
					<DataTable data={csvData} />
				) : (
                    error && (
                        <div className="error">
                            {
                                error && <p>{error}</p>
                            }
                        </div>
                    )
				)}
        </div>
    )
}
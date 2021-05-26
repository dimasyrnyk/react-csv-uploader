import React from 'react'
import { StatesCode } from './StatesCode'

export default function Field({ data, fieldData, rowIndex, fieldIndex, headers }) {
    const fieldHeader = headers[fieldIndex + 1]
    let fieldnewData = fieldData.trim()

    const validateField = (fieldName, value) => {    
        switch(fieldName) {
            case 'phone':
                const phoneValid = (/^(\+1|1)?(\d{10})$/g).test(value)
                return phoneValid
            case 'email':
                const emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
                return emailValid
            case 'age':
                const ageValid = Number.isInteger(+value) && value >= 21
                return ageValid
            case 'experience':
                const experienceValid = value < data[rowIndex][3] - 21 && value >= 0
                return experienceValid
            case 'yearly income':
                let newValue = value
                if (value === "") newValue = "0.00"
                const floatVal = parseFloat(newValue.replace(/\s/g, '').replace(/,/g, '.')).toFixed(2)
                if (!Number.isNaN(floatVal)) {
                    fieldnewData = floatVal
                }
                const yearlyIncomeValid = 1000000 >= floatVal && 0 <= floatVal
                return yearlyIncomeValid
            case 'expiration date':
                let expirationDateValid = false
                if ((/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/).test(value)) {
                    expirationDateValid = Date.parse(value) - Date.now() > 0
                } else if ((/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/).test(value)) {
                    expirationDateValid = Date.parse(value) - Date.now() > 0
                }      
                return expirationDateValid
            case 'license states':
                let arrayOfValues = value.split("|")
                let errorsCount = 0
                const newArrayOfValues = arrayOfValues.map(element => {
                    const trimedElement = element.toLowerCase().trim()
                    const elementIndex = StatesCode.findIndex(item => {
                        return item.full.toLowerCase() === trimedElement || item.short.toLowerCase() === trimedElement
                    })
                    if (elementIndex !== -1) {
                        return element = StatesCode[elementIndex].short
                    } else {
                        errorsCount++
                        return element
                    }
                })

                fieldnewData = newArrayOfValues.join(",")

                const licenseStatesValid = errorsCount === 0
                return licenseStatesValid
            case 'has children':
                let hasChildrenValid = false
                if (value === "") {
                    hasChildrenValid = true
                    fieldnewData = "FALSE"
                } else if (value.replace(/^\s+|\s+$/g, "").toLowerCase() === "true") {
                    hasChildrenValid = true
                } else if (value.replace(/^\s+|\s+$/g, "").toLowerCase() === "false") {
                    hasChildrenValid = true
                }
                return hasChildrenValid
            case 'license number':
                const licenseNumberValid = (/^([A-Za-z0-9]{6})$/gi).test(value)
                return licenseNumberValid
            default:
                return true
        }
    }

    const isFieldValid = validateField(fieldHeader.toLowerCase(), fieldnewData)

    if (!isFieldValid) {
        return <td className="red">{fieldnewData}</td>
    }

    return <td>{fieldnewData}</td>
}
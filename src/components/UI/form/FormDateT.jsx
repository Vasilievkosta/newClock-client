import { FormDateComponent } from './FormDateComponent'
import { setTiming, nowDate } from 'common/utils/setTiming'
import { useState, useEffect } from 'react'
import { citiesAPI } from 'http/api'

export function FormDateT() {
    const [itemsCity, setItemsCity] = useState([])

    const sizeToDuration = { small: 1, medium: 2, large: 3 }
    const sizeItems = Object.keys(sizeToDuration)

    useEffect(() => {
        citiesAPI.outCity().then(setItemsCity)
    }, [])

    const submitUserForm = (data) => {
        console.log('Форма отправлена:', data)
    }

    return (
        <div className='field'>
            <h2 className='field__title'>Clockware</h2>

            <FormDateComponent
                submitUserForm={submitUserForm}
                setTiming={setTiming}
                nowDate={nowDate}
                sizeItems={sizeItems}
                itemsCity={itemsCity}
            />
        </div>
    )
}

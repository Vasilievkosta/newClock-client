const getFormattedDate = () => {
    const myTimezoneOffset = new Date().getTimezoneOffset()
    const myData = new Date().setMinutes(-myTimezoneOffset + new Date().getMinutes())
    return new Date(myData).toISOString().split('T')[0]
}

export const setTiming = (enterDate) => {
    const nowDate = getFormattedDate()
    const userLocal = navigator.language
    const options = { hour12: false }
    const currentHour = new Date().toLocaleTimeString(userLocal, options).split(':')[0]

    const selectTime = []
    let timeToday = enterDate === nowDate ? +currentHour + 2 : 0

    for (let i = timeToday; i < 24; i++) {
        selectTime.push({ id: i, title: i < 10 ? `0${i}:00` : `${i}:00` })
    }
    return selectTime
}

export const nowDate = () => getFormattedDate()

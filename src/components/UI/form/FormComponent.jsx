const FormComponent = ({
    userName,
    setUserName,
    email,
    setEmail,
    size,
    setSize,
    cityId,
    setCityId,
    date,
    setDate,
    nowDate,
    time,
    setTime,
    sizeItems,
    selectTime,
    itemsCity,
    handleSubmit
}) => {
    const handleDateChange = (e) => {
        const userDate = e.target.value
        setTime('')
        setDate(userDate)
    }

    return (
        <div className="field__wrap">
            <form className="field__form" onSubmit={handleSubmit}>
                <label htmlFor="client" hidden>
                    Имя
                </label>
                <input
                    pattern="^[A-Za-zА-Яа-я0-9]{3,}$"
                    className="field__input"
                    id="client"
                    type="text"
                    placeholder='Введите имя не менее трех букв'
                    value={userName}
                    required={true}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="email" hidden>
                    Email
                </label>
                <input
                    className="field__input"
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="field__size">
                    <span className="field__radio">Размер часов: </span>
                    {sizeItems.map((item, index) => (
                        <label key={index} className="field__radio">
                            {item}
                            <input
                                type="radio"
                                checked={size === item}
                                onChange={() => setSize(item)}
                            />
                        </label>
                    ))}
                </div>

                <label htmlFor="city" hidden>
                    Город
                </label>
                <select
                    className="field__input"
                    type="text"
                    value={cityId}
                    id="city"
                    onChange={(e) => setCityId(e.target.value)}
                >
                    <option
                        disabled
                        className="field__city"
                        style={{ color: 'white' }}
                    >
                        {'Выберите город'}
                    </option>
                    {itemsCity.map((item) => (
                        <option
                            key={item.id}
                            className="field__city"
                            value={item.id}
                        >
                            {item.title}
                        </option>
                    ))}
                </select>

                <label htmlFor="date" hidden>
                    Дата
                </label>
                <input
                    className="field__input"
                    id="date"
                    type="date"
                    placeholder="Введите дату"
                    value={date}
                    min={nowDate}
                    onChange={handleDateChange}
                    required
                />

                <label htmlFor="time" hidden>
                    Время
                </label>
                <select
                    className="field__input"
                    value={time}
                    id="time"
                    required
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option
                        disabled
                        value=""
                        className="field__city"
                        style={{ color: 'white' }}
                    >
                        Выберите время
                    </option>
                    {selectTime.map((item) => (
                        <option
                            key={item.id}
                            className="field__city"
                            value={item.id}
                        >
                            {item.title}
                        </option>
                    ))}
                </select>

                <button className="field__btn">Выбор мастера</button>
            </form>
        </div>
    )
}

export default FormComponent

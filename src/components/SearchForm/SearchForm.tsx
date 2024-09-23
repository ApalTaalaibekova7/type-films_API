import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { UseAppDispatch } from '../../hooks';
import { getFilmByKeyword } from '../../Store/Slices/FilmsSlices';

const SearchForm: FC = () => {
    const [value, setValue] = useState('')
    const dispatch = UseAppDispatch()

    const updateValue: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    const handleForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (value.trim().length) {
            dispatch(getFilmByKeyword(value))
            setValue('')
        }
    }
    return (
        <form onSubmit={handleForm}>
            <input 
            value={value}
            onChange = {updateValue}
            type="text" placeholder='Film name' />
            <button>Search</button>
        </form>
    );
};

export default SearchForm;
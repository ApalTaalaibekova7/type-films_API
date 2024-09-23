import React, { FC } from 'react';

const SearchForm: FC = () => {
    return (
        <form>
            <input type="text" placeholder='Film name' />
            <button>Search</button>
        </form>
    );
};

export default SearchForm;
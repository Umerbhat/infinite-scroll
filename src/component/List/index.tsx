import React from 'react';
import classes from './List.module.css'


const List: React.FC = ({ children }) => {
    return (
        <ul className={classes.list}>
            {children}
        </ul>

    );
}

export default List;
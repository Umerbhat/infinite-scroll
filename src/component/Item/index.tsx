import React from 'react';
import classes from './Item.module.css'
import { QuestionItem } from '../../common/types';
import getFormatedDate from '../../utils/getFormatedDate';

interface Props {
    item: QuestionItem;
    onItemClick: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item: QuestionItem) => void;
}

const Item: React.FC<Props> = ({ item, onItemClick }) => {
    return (
        <li className={classes.container} role="button" tabIndex={0} onClick={(e) => onItemClick(e, item)} onKeyDown={e => { e.keyCode === 13 && onItemClick(e, item) }}>
            <h6 className={classes.heading} dangerouslySetInnerHTML={{ __html: item.title }}>
            </h6>
            <div className={classes.subheading}>
                <div className={classes.author}><em dangerouslySetInnerHTML={{ __html: item.owner.display_name }}></em></div>
                <div className={classes.date}>{getFormatedDate(item.creation_date)}</div>
            </div>
        </li>

    );
}

export default Item;
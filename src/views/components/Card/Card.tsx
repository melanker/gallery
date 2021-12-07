import React from 'react';
import {Card as MuiCard, CardMedia} from '@mui/material'
import {IPhoto} from '../../../context/PhotosContext';
import * as styled from './Card.style.js';

const Card = ({id, albumId, title, url, thumbnailUrl}: IPhoto) => {
    return (
        <styled.Card>
            <styled.CardHeader titleTypographyProps={{noWrap: true}}
                               title={title}
            />
            <CardMedia component="img"
                       height="150"
                       image={thumbnailUrl}
            >
            </CardMedia>
        </styled.Card>
    );
};

export default Card;

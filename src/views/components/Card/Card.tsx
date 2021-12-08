import React from 'react';
import {Card as MuiCard, CardActions, CardMedia, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
            <CardActions>
                <IconButton data-action="edit" data-id={id}>
                    <EditIcon/>
                </IconButton>
                <IconButton data-action="delete" data-id={id}>
                    <DeleteForeverIcon />
                </IconButton>
            </CardActions>
        </styled.Card>
    );
};

export default Card;

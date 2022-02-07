import React, {useRef, useContext, useEffect} from 'react';
import httpRequest from "../helpers/fetchHelper";
import {IPhoto, PhotosContext} from "../context/PhotosContext";
import {Grid} from '@mui/material';
import Card from './components/Card/Card';
import * as styled from "./Grid.style";
import {chunk} from 'lodash/';
import {useVirtual} from "react-virtual";

const CHUNK_SIZE = 6

const Gallery = () => {
    const parentRef = useRef<HTMLInputElement>(null);

    const {
        allPhotos,
        setAllPhotos,
    } = useContext(PhotosContext);


    const rowsData = chunk(allPhotos, CHUNK_SIZE);

    const rowVirtualizer = useVirtual({
        size: Math.ceil(rowsData.length),
        parentRef,
        estimateSize: React.useCallback(() => 100, []),
        overscan: 3
    });


    useEffect(() => {
        httpRequest('https://jsonplaceholder.typicode.com/photos').then((data) => {
            setAllPhotos(data)
        });
    }, [])


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const element: HTMLButtonElement | EventTarget = event.target;

        const id = (element as HTMLButtonElement).parentElement?.dataset?.id ||
            (element as HTMLButtonElement).parentElement?.parentElement?.dataset?.id
        const action = (element as HTMLButtonElement).parentElement?.dataset?.action ||
            (element as HTMLButtonElement).parentElement?.parentElement?.dataset?.action

        if (!id || !action) {
            return;
        }

        const photoIndex = allPhotos.findIndex((photo: IPhoto) => photo.id === parseInt(id, 10))

        if (action === "delete") {
            const newAllPhotos = [...allPhotos];
            newAllPhotos.splice(photoIndex, 1)
            setAllPhotos(newAllPhotos);
        }
    }


    return (
        // @ts-ignore
        <styled.Container onClick={handleClick} ref={parentRef as React.RefObject<HTMLDivElement>}>
            <Grid container rowSpacing={2}>
                {rowVirtualizer.virtualItems.map(virtualRow => (
                    rowsData[virtualRow.index].map((photo: IPhoto) => (
                            <Grid key={`${photo.albumId}_${photo.id}`} item xs={2}>
                                <Card {...photo} />
                            </Grid>
                        )
                    )))}
            </Grid>
        </styled.Container>
    );
};

export default Gallery;

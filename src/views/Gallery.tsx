import React, {DOMElement, useContext, useEffect, useState} from 'react';
import httpRequest from "../helpers/fetchHelper";
import {IPhoto, PhotosContext} from "../context/PhotosContext";
import {Grid} from '@mui/material';
import Card from './components/Card/Card';
import * as styled from "./Grid.style";
import InfiniteScroll from "react-infinite-scroll-component";

const BLOCK_SIZE = 42;

const Gallery = () => {
    const [hasMore, setHasMore] = useState(true);
    const [blockNumber, setBlockNumber] = useState(0);

    const {
        allPhotos,
        setAllPhotos,
    } = useContext(PhotosContext);

    useEffect(() => {
        httpRequest('https://jsonplaceholder.typicode.com/photos').then((data) => {
            setAllPhotos(data)
        });
    }, [])

    const fetchNext = () => {
        setBlockNumber(blockNumber + 1);
        setHasMore((BLOCK_SIZE * (blockNumber + 1)) < allPhotos.length);
    }

    const getPhotosBlock = () => {
        return [...allPhotos.slice(0, BLOCK_SIZE * (blockNumber + 1))]
    }

    const handleClick = (event: React.MouseEvent<Node>) => {
        const element: Node | EventTarget = event.target;
        const id = (element as Node).parentElement?.dataset?.id ||
            (element as Node).parentElement?.parentElement?.dataset?.id
        const action = (element as Node).parentElement?.dataset?.action ||
            (element as Node).parentElement?.parentElement?.dataset?.action

        if (!id || !action) {return;}

        const photoIndex = allPhotos.findIndex((photo: IPhoto) => photo.id === parseInt(id, 10))

        if (action === "delete") {
            const newAllPhotos = [...allPhotos];
            newAllPhotos.splice(photoIndex, 1)
            setAllPhotos(newAllPhotos);
        }
    }



    return (
        <styled.Container onClick={handleClick}>
            <InfiniteScroll
                next={fetchNext}
                hasMore={hasMore}
                loader={<h4>Loading ...</h4>}
                dataLength={blockNumber * BLOCK_SIZE}
            >
                <Grid container rowSpacing={2}>
                    {getPhotosBlock().map((photo: IPhoto) => (
                        <Grid key={`${photo.albumId}_${photo.id}`} item xs={2}>
                            <Card {...photo} />
                        </Grid>
                    ))}
                </Grid>

            </InfiniteScroll>
        </styled.Container>
    );
};

export default Gallery;

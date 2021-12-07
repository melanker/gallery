import React, {useContext, useEffect, useState} from 'react';
import httpRequest from "../helpers/fetchHelper";
import {IPhoto, PhotosContext} from "../context/PhotosContext";
import {Grid} from '@mui/material';
import Card from './components/Card/Card';
import * as styled from "./Grid.style";
import InfiniteScroll from "react-infinite-scroll-component";

const BLOCK_SIZE = 40;

const Gallery = () => {
    const [loadedPhotos, setLoadedPhotos] = useState<IPhoto[] | []>([]);
    const [hasMore, setHasMore] = useState(true);
    const [blockNumber, setBlockNumber] = useState(1);

    const {
        allPhotos,
        setAllPhotos,
    }: any = useContext(PhotosContext);

    useEffect(() => {
        httpRequest('https://jsonplaceholder.typicode.com/photos').then((data) => {
            setAllPhotos(data)
            setLoadedPhotos(data.slice(0, BLOCK_SIZE))
            setHasMore(true);
        });
    }, [])

    const fetchNext = () => {
        setLoadedPhotos([...loadedPhotos, ...allPhotos.slice(BLOCK_SIZE * blockNumber, BLOCK_SIZE * (blockNumber + 1))])
        setBlockNumber(blockNumber + 1);
        setHasMore((BLOCK_SIZE * (blockNumber + 1)) < allPhotos.length);
    }

    console.log(allPhotos)
    return (
        <styled.Container>
            <InfiniteScroll
                next={fetchNext}
                hasMore={hasMore}
                loader={<h4>Loading ...</h4>}
                dataLength={blockNumber * BLOCK_SIZE}
            >
                <Grid container rowSpacing={2}>
                    {loadedPhotos.map((photo: IPhoto) => (
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

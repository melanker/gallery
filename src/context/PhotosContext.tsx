import React, {createContext, useState} from 'react';

export interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface IPhotoContext {
    allPhotos: IPhoto[],
    setAllPhotos: (photos: IPhoto[]) => void
}


export const PhotosContext = createContext<IPhotoContext>({
    allPhotos: [],
    setAllPhotos: (photos) => {},
});

interface RootProviderProps {
    children: React.ReactNode;
}

const PhotosProvider = ({ children }: RootProviderProps) => {
    const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);

    return (
        <PhotosContext.Provider value={{
            allPhotos,
            setAllPhotos
        }}
        >
            {children}
        </PhotosContext.Provider>
    );
};

export default PhotosProvider;

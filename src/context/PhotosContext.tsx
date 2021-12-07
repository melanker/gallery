import React, {createContext, useState} from 'react';

export interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export const PhotosContext = createContext<{allPhotos: IPhoto[], setAllPhotos: (photos: IPhoto[]) => void}>({
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

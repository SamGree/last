import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAlbumStore = create(
  persist(
    (set) => ({
      albums: [],

      setAlbums: (albums) =>
        set((state) => ({
          albums: Array.isArray(albums) ? albums : [],
        })),

      addAlbum: (album) => {
        set((state) => ({
          albums: [
            ...new Map(
              [album, ...state.albums].map((album) => [album.id, album])
            ).values(),
          ],
        }));
      },

      updateAlbum: (updatedAlbum) => {
        set((state) => ({
          albums: state.albums.map((album) =>
            album.id === updatedAlbum.id ? { ...album, ...updatedAlbum } : album
          ),
        }));
      },

      removeAlbum: (albumId) => {
        set((state) => ({
          albums: state.albums.filter((album) => album.id !== albumId),
        }));
      },

      getAlbumById: (albumId) => {
        const state = useAlbumStore.getState();
        return state.albums.find((album) => album.id === albumId) || null;
      },
    }),
    {
      name: 'album-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAlbumStore;

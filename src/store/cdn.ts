import { CdnData } from '@/data';
import { create } from 'zustand';

const createFileMapper = (
  cdnBaseUrl = 'https://fprints-data.b-cdn.net/assets/icons'
) => {
  const fileToFolder = new Map();

  const addFiles = (folderName: string, fileNames: string[]) => {
    fileNames.forEach(fileName => {
      fileToFolder.set(fileName, folderName);
    });
  };
  const getFolder = (fileName: string) => {
    return fileToFolder.get(fileName) || null;
  };
  const getCdnUrl = (fileName: string) => {
    const folder = getFolder(fileName);
    if (!folder) return null;
    return `${cdnBaseUrl}/${folder}/${fileName}.webp`;
  };

  return {
    addFiles,
    getFolder,
    getCdnUrl,
  };
};

export type CdnStore = {
  initialized: boolean;
  initializeFiles: (data: CdnData) => void;
  getCdnUrl: (fileName: string) => string | null;
};

export const useCdnStore = create<CdnStore>(set => {
  const fileMapper = createFileMapper();

  return {
    initialized: false,
    initializeFiles: (data: CdnData) => {
      Object.entries(data).forEach(([folder, files]) => {
        fileMapper.addFiles(folder, files);
      });
      set({ initialized: true });
    },
    getCdnUrl: (fileName: string) => fileMapper.getCdnUrl(fileName),
  };
});

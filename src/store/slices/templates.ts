import { ITemplate } from "@/types/template.type";
import { createSlice } from "@reduxjs/toolkit";

interface IStore {
  selectedTemplateId: string | null;
  availableTemplates: ITemplate[];
  attachedFiles: {
    indexOfExcelSheet: number;
    files: File[];
  }[];
  excelData: Record<string, string | boolean>[];
}

const initialState: IStore = {
  selectedTemplateId: null,
  availableTemplates: [],
  attachedFiles: [],
  excelData: [],
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setSelectedTemplateId: (
      state,
      action: {
        payload: string;
      }
    ) => {
      state.selectedTemplateId = action.payload;
    },
    setAvailableTemplates: (
      state,
      action: {
        payload: ITemplate[];
      }
    ) => {
      state.availableTemplates = action.payload;
    },
    addAttachedFiles: (
      state,
      action: {
        payload: {
          indexOfExcelSheet: number;
          files: File[];
        };
      }
    ) => {
      const { indexOfExcelSheet, files } = action.payload;
      const attachedFilesWithoutIndex = state.attachedFiles.filter(
        (file) => file.indexOfExcelSheet !== indexOfExcelSheet
      );
      state.attachedFiles = [
        ...attachedFilesWithoutIndex,
        { indexOfExcelSheet, files },
      ];
    },
    clearAttachedFiles: (state) => {
      state.attachedFiles = [];
    },
    setExcelData: (
      state,
      action: {
        payload: Record<string, string | boolean>[];
      }
    ) => {
      state.excelData = action.payload;
    },
    clearExcelData: (state) => {
      state.excelData = [];
    },
  },
});

export const {
  setSelectedTemplateId,
  setAvailableTemplates,
  addAttachedFiles,
  clearAttachedFiles,
  setExcelData,
  clearExcelData,
} = templateSlice.actions;

export default templateSlice.reducer;

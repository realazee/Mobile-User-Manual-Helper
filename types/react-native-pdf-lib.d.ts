declare module 'react-native-pdf-lib' {
  export interface PDFPage {
    getText(): Promise<string>;
  }

  export interface PDFDocument {
    getPages(): Promise<PDFPage[]>;
  }

  export default {
    PDFDocument: {
      fromFile(path: string): Promise<PDFDocument>;
    }
  };
} 
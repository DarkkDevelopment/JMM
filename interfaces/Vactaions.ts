export interface AgazaHistory {
  AgazaType: {
    AgazaType: string;
  };
  AgazaDate: Date;
  id: number;
}

export interface Vacatoion {
  PersonCode: number;
  PersonName: string;
  history: AgazaHistory[];
  NumberOfAgazaDays: number;
}

import { DocumentReference, FieldValue, Timestamp } from "firebase/firestore";

export interface IBudget {
  id: string,
  color: string,
  icon: string,
  name: string,
  total: number,
  used: number,
}

export interface ITransactions {
  budgetRef: DocumentReference,
  created_at: Timestamp,
  name: string,
  type: number,
  value: number,
  wallet: string
}
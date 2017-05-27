export interface IItem {
  $key?: string;
  name?: string;
  borrowerName?: string;
  dueDate?: string;
  status?: string;
  image?: string;
  path?: string;
  photoURL: string;
  formattedRetDate?: string;
  reservationDays?: string;
  entityName?: string;
  reserved?: string;
  loan?: string;
  timeInMillis?: string;
  formattedShortDate?: string;
}

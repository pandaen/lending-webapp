export interface IEntity {
  $key?: string;
  name?: string;
  fromHours?: string;
  location?: string;
  room?: string;
  toHours?: string;
  owner?: string;
  ownerName?: string;
  reservationDays?: string;
  termsAndConditions?: string;
}

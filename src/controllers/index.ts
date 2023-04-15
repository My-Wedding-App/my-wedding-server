import { CreateInvitation, GetInvitation } from "./invitation";
import { CreateGuest,GetAllGuests,GetGuest } from "./guest";

const controllers: any[] = [
  GetInvitation,
  CreateInvitation,
  CreateGuest,
  GetGuest, 
  GetAllGuests
];

export default controllers;
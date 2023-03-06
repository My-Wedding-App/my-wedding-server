import { CreateInvitation, GetInvitation } from "./invitation";
import { CreateGuest,GetGuest } from "./guest";

const controllers: any[] = [
  GetInvitation,
  CreateInvitation,
  CreateGuest,
  GetGuest
];

export default controllers;
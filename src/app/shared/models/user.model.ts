import { Item } from "./Item.model";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string; 
    is_confirmed: boolean;
    phone?: string;
    created_at: string; 
  
    items?: Item[];
    notifications?: Notification[];
    history?: History[];
  }
  
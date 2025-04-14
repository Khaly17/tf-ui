export interface Item {
    id: string;
    name: string;
    type: string;
    status: 'Perdu' | 'Retrouvé';
    description?: string;
    created_at: string;
    owner_id?: string;
  }
  
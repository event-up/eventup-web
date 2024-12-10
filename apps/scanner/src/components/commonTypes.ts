export interface Participant {
  name: string;
  email: string;
  food: string;
  drinks: string[];
  id: number;
  empId: string;
  isWinner: boolean;
  nic: string;
  vehicleNo: string;
}

export interface DecodeResponse {
  data: {
    beverages?: string[];
    email: string;
    emp_no?: string;
    food_preference?: string;
    id?: number;
    name: string;
    nic?: string;
    vehicle_no?: string;
  };
}

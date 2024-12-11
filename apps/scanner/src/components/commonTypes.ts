export interface Participant {
  employee_name: string;
  email: string;
  first_name: string;
  ref_id: string;
  smsLogs: { number: string; smsSent: 'Y' | 'N' }[];
  qrUrl: string;
  checkIns: {
    checkpointCode: string;
    isChecked: boolean;
    checkedInTime: string;
  }[];
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

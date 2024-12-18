export interface Participant {
  spouse: boolean;
  children: any;
  employee_name: string;
  email: string;
  first_name: string;
  last_name: string;

  ref_id: string;
  smsLogs: { number: string; smsSent: 'Y' | 'N' }[];
  qrUrl: string;
  checkIns: {
    checkpointCode: string;
    isChecked: boolean;
    checkedInTime: string;
  }[];
  votes: {
    contestantId: string;
    timestamp: string;
  }[];

  drink_pref: string;
  table_no: string;
  //todo deactivate
  food_pref: string;
}

type contestantCategoriesType = 'KING' | 'QUEEN';
export interface Contestant {
  name: string;
  photoUrl: string;
  id: string;
  voteCount: number;
  category: contestantCategoriesType;
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

export interface SystemConfig {
  values: { code: string; name: string }[];
}

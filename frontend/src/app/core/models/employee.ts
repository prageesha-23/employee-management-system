export interface Employee {
  EmpID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string | null;
  Department: string | null;
  Position: string | null;
  HireDate: string | null;
  ActiveStatus: boolean;
}
export interface CreateEmployee {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Department: string;
  Position: string;
  HireDate: string;
}


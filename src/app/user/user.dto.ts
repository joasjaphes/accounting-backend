import { Company } from "../company/company.entity";

export interface UserDTO {
    id:string;
    firstName:string;
    surname:string;
    email:string;
    phoneNumber:string;
    username:string;
    password?:string;
    role:string;
    companyId?:string;
    company?:Company
}
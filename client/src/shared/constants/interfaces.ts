export interface Application { 
    id?: number, 
    timestamp?: Date,
    firstName: string, 
    lastName: string, 
    zip: number, 
    phone: string, 
    email: string, 
    state: string, 
    discipline: string,
    region?: string, 
    bilingual?: boolean, 
    telepractice?: boolean, 
    emails?: boolean, 
    reference?: string, 
    comments?: string,
    resume?: string
}

export interface ViewParams { 
    id: string
}
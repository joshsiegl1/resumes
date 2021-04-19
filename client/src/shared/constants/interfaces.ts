export interface Application { 
    id?: number, 
    timestamp?: Date,
    firstName: string, 
    lastName: string, 
    address1: string, 
    address2?: string, 
    city: string, 
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
    resume?: string, 
    src: number, 
    site?: string  
}

export interface Job { 
    id?: number, 
    location: string, 
    discipline: string, 
    title: string, 
    description: string
}

export interface ViewParams { 
    id: string
}
const API_DEV_HOSTNAME = "http://localhost:5000/"; 
const API_PROD_HOSTNAME = "https://ebs-job-apps.herokuapp.com/"; 

const CLIENT_DEV_HOSTNAME = "http://localhost:8080/"; 
const CLIENT_PROD_HOSTNAME = "https://apply.ebscareers.com/"; 

export const getApiHostname = () => { 
    if (process.env.NODE_ENV === "production") 
        return API_PROD_HOSTNAME; 
    else return API_DEV_HOSTNAME; 
}

export const getClientHostname = () => { 
    if (process.env.NODE_ENV === "production")
        return CLIENT_PROD_HOSTNAME; 
    else return CLIENT_DEV_HOSTNAME; 
}

export const APPLICATION_POST = getApiHostname() + 'application'; 
export const APPLICATION_GET = getApiHostname() + 'application'; 
export const RESUME_POST = getApiHostname() + 'resume'; 
export const DOWNLOAD_POST = getApiHostname() + 'download'; 
export const DOWNLOAD_RESUME_POST = getApiHostname() + 'downloadresumes'; 
export const CAREERLINKS = getApiHostname() + 'careerlinks';
export const DISCIPLINES = getApiHostname() + 'disciplines'; 
export const LOGINS = getApiHostname() + 'logins'; 
export const JOB_POST = getApiHostname() + 'job';  
export const JOB_GET = getApiHostname() + 'job'; 
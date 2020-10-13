const API_DEV_HOSTNAME = "http://localhost:5000/"; 
const API_PROD_HOSTNAME = "https://ebs-linkgen.herokuapp.com/"; 

const CLIENT_DEV_HOSTNAME = "http://localhost:8080/"; 
const CLIENT_PROD_HOSTNAME = "https://ebsstorageaccount3.z13.web.core.windows.net"; 

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
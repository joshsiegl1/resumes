import * as actions from './types'; 

import { Application } from 'shared/constants/interfaces'; 

const initialState: {
    applications: Application[]
} = 
{ 
    applications: []
}; 

export default function applicationReducer(state: {applications: Application[]} = initialState, action: { type: string, applications: Application[]}) { 
    switch(action.type) { 
        case actions.SET_APPLICATIONS: 
            return action.applications; 
        default: 
            return state; 
    }
}
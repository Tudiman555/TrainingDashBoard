import axios, { CancelToken } from "axios";
import { Group } from "../modals/Group";
import { BASE_URL } from "./base";

 export interface GroupRequest {
    limit?: number;
    offset?: number;
    query: string;
    status: "all-groups" | "favourite" | "archieved";
  }
  
   export interface GroupResponse {
      data : Group[]
   }
   export interface GroupByIdResponse {
     data : Group
   }
  
   export const fetchGroups = (data: GroupRequest, token? : CancelToken) => {
    const url = BASE_URL + "/groups";
    return axios
      .get<GroupResponse>(url, { params: data , cancelToken : token })
      .then((response) => response.data.data)
  };

  export const fetchGroupDetails = (id?: number ) => {
    const url = BASE_URL + "/groups/" + id;
    return axios.get<GroupByIdResponse>(url).then(response => {return response.data.data}).catch(e => console.log(e))
  }
     
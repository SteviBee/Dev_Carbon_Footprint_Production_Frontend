import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API:
 * NO - frontend-specific stuff here
 * ALL -  API-aware stuff here
 *
 */

class CarbonApi {
    // the token for interactive with the API will be stored here.
    static token;
    static userToken;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${CarbonApi.userToken ? CarbonApi.userToken : CarbonApi.token}` };
        // if method is get then set params to data else set to empty obj
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes



    // return one user
    static async getOneUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user
    }

    // sign up a user
    static async signUp(data) {
        let res = await this.request(`auth/register`, data, "POST")
        CarbonApi.userToken = res.token
        return res.token
    }

    // checks auth and returns token if user and password correct
    static async login(data) {
        let res = await this.request(`auth/token`, data, "POST")
        CarbonApi.userToken = res.token
        return res.token
    }

    // gets data from CPU ask
    static async requestCPU(data) {
        console.log("DATA TO CARBON API", data);
        let res = await this.request(`calc/cpu`, data, "POST")
        console.log("DATA BACK from CARBON", res);
        // CarbonApi.userToken = res.token
        return res
    }


    // updates user data
    // static async patchUser(username, data) {
    //     console.log("username, in API", username);
    //     let res = await this.request(`users/${username}`, data, "PATCH")
    //     CarbonApi.userToken = res.token
    //     return res.token
    // }


}

// for now, put token ("testuser" / "password" on class)

CarbonApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default CarbonApi;
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://catchapp-backend.onrender.com";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CatchAppApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CatchAppApi.token}` };
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

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Delete user profile page. */

  static async deleteProfile(username) {
    let data = {};
    let res = await this.request(`users/${username}`, data, "delete");
    return res.user;
  }

  /** Get area matching filter. */

  static async getArea(name) {
    let res = await this.request(`areas/${name}`);
    console.log(res);
    return res.area;
  }


  /** Get areas matching filter. */

    static async getAreas(name) {
      let res = await this.request("areas", { name });
      console.log(res);
      return res.areas;
    }

  /** Get areas matching filter. */

    static async getMessages(area) {
      let res = await this.request("messages", { area });
      console.log(res);
      return res.messages;
    }

    /** Post new message to database */
    static async postMessage(data) {
      let res = await this.request("messages", data, "post" );
      console.log(res);
      return res.message;
    }
}


export default CatchAppApi;

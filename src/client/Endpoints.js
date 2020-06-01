import AppConfig from "./AppConfig";
import { generatePath } from "react-router-dom";

const Endpoints = {
  allowedTypes: ["api", "client"],
  api: {
    login: "super/api/login",
    checkToken: "super/api/check-token",
  },

  client: {
    login: "/super",
    dashboard: "/super/dashboard",
  },

  get: function (type, endpointName, data) {
    type = type.toLowerCase();
    if (typeof data !== "object")
      throw new Error("Data is a non-object when object is required.");
    if (typeof type !== "string") throw new Error("Type must be string");
    if (!this.allowedTypes.includes(type))
      throw new Error("Type must be in " + this.allowedTypes.toString());
    if (type === "api") {
      if (typeof this.api[endpointName] === undefined)
        throw new Error(endpointName + " endpoint not found in API.");
      return AppConfig.API_URL + generatePath(this.api[endpointName], data);
    } else if (type === "client") {
      if (typeof this.client[endpointName] === undefined)
        throw new Error(endpointName + " endpoint not found in client.");
      return generatePath(this.client[endpointName], data);
    }
  },

  getRaw: function (type, endpointName) {
    type = type.toLowerCase();
    if (typeof type !== "string") throw new Error("Type must be string.");
    if (!this.allowedTypes.includes(type))
      throw new Error("Type must be in " + this.allowedTypes.toString());
    if (type === "api") {
      if (typeof this.api[endpointName] === undefined)
        throw new Error(endpointName + " endpoint not found in API.");
      return AppConfig.API_URL + this.api[endpointName];
    } else if (type === "client") {
      if (typeof this.client[endpointName] === undefined)
        throw new Error(endpointName + " endpoint not found in client.");
      return this.client[endpointName];
    }
  },
};

export default Endpoints;
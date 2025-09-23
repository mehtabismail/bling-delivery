let env = "dev";
// let env = 'stage';
// let env = 'prod';

export const stg_url = "https://isqrool-be.azurewebsites.net/";
export const local_url = "http://192.168.43.169:2005/";
export const dev_url = "http://localhost:3000";
export const prod_url = "https://be.isqroll.co.nz/";

export const BASE_URL =
  env == "dev" ? dev_url : env == "prod" ? prod_url : stg_url;

export const APP_VERSION = env == "prod" ? "10" : "2";
export const APP_VERSION_ANDROID = env == "prod" ? "7" : "2";
export const APP_VERSION_IOS = env == "prod" ? "5" : "2";
export const envType = env;

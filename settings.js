import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext } from "react";

const VPN_REMOTE = false;
export const BASE_URL = VPN_REMOTE
  ? "http://id-04.tunnel.web.id:3450/api/v1"
  : "http://192.168.1.11:4000/api/v1";

export const TOKEN_KEY = "token";
export const TOKEN_PREFIX = "Bearer";
export const CONTEXT_APP = createContext({});
export const STORAGE = AsyncStorage;

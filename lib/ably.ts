// /lib/ably.ts
import { Realtime } from "ably";

// Asignar un clientId único:
export const clientId = "usuario1";

const ablyClient = new Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId,
});

export default ablyClient;

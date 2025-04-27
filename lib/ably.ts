// /lib/ably.ts
import { Realtime } from "ably";

// Asignar un clientId único:
export const clientId = crypto.randomUUID();

const ablyClient = new Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId,
});

export default ablyClient;

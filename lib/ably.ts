import { Realtime } from "ably";

/* Librería para gestión de chat en vivo: */

const ablyClient = new Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY!);

export default ablyClient;
import {ok} from "@/lib/response";import {getSession} from "@/lib/auth";export async function GET(){return ok(await getSession())}

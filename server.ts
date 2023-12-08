import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
    logDevReady(build);
}

export interface Env {
    BEER: string;
}
declare module "@remix-run/server-runtime" {
    interface AppLoadContext {
        //  your context secret sauce goes here
        env: Env;
    }
}

export const onRequest = createPagesFunctionHandler({
    build,
    getLoadContext: (context) => {
        if (typeof context.env.BEER != "string") {
            throw new Error("Environment Load Error: $BEER missing");
        }
        return {
            env: context.env,
        };
    },
    mode: build.mode,
});

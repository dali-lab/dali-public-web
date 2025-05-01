import { createRequestHandler } from "@remix-run/express";
import { type ServerBuild } from "@remix-run/node";
import compression from "compression";
import express from "express";
import morgan from "morgan";

const viteDevServer = process.env.NODE_ENV === "production" ? undefined : await import("vite").then((vite) => vite.createServer({
    server: { middlewareMode: true },
}));

const app = express();

app.use(compression());

app.disable("x-powered-by");

if (viteDevServer) {
    app.use(viteDevServer.middlewares);
} else {
    app.use("assets", express.static("build/client/assets", { maxAge: "1h" }));
}

app.use(morgan("tiny"));

async function getBuild() {
    try {
        const build = viteDevServer 
        ? await viteDevServer.ssrLoadModule("virtual:remix/server-build") 
        : await import("../build/server/index.js");
        return { build: build as unknown as ServerBuild, error: null };
    } catch (error) {
        console.error("Failed to load build", error);
        return { error: error, build: null as unknown as ServerBuild };
    }
}

app.all(
    "*",
    createRequestHandler({
        build: async () => {
            const { error, build } = await getBuild();
            if (error) {
                throw error;
            }
            return build;
        },
    })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

{
    "version": 2,
    "builds": [
        { "src": "Arca-Back-API/server.ts", "use": "@vercel/node" },
        { "src": "nuxt-ui-pro-dashboard/nuxt.config.ts", "use": "@nuxtjs/vercel-builder" }
    ],
    "routes": [
        { "src": "/api/.*", "dest": "Arca-Back-API/server.ts" },
        { "src": "/(.*)", "dest": "nuxt-ui-pro-dashboard/$1" }
    ]
}
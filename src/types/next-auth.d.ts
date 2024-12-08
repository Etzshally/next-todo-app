import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        name: string;
        id: string;
    }

    interface Session {
        user: User & {
            name: string;
            id: string;
        };
        token: {
            name: string;
            id: string;
        };
    }
}

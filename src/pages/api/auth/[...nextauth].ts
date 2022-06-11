import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// tudo após o endpoint auth cai dentro deste arquivo graças ao spread [...nextauth]
export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ]
})
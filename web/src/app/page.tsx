import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Card className="max-w-xs bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">First Steps →</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-white/80">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </CardDescription>
                <Button asChild className="mt-4 bg-white/20 hover:bg-white/30">
                  <Link href="https://create.t3.gg/en/usage/first-steps" target="_blank">
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="max-w-xs bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Documentation →</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-white/80">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </CardDescription>
                <Button asChild className="mt-4 bg-white/20 hover:bg-white/30">
                  <Link href="https://create.t3.gg/en/introduction" target="_blank">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Button asChild className="rounded-full bg-white/10 px-10 py-3 font-semibold hover:bg-white/20">
                <Link href={session ? "/api/auth/signout" : "/auth"}>
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </Button>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}

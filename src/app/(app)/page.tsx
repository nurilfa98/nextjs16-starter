// Halaman / (tepat setelah login): sapaan singkat dan kotak menu dengan kolom
// pencarian. Menu yang tampil disaring sesuai role user (lihat nav-config.ts).
//
// Sapaan dan daftar menu butuh data user (cookie), jadi berada di dalam
// <Suspense>; judul "Menu" statis ikut diprerender.

import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuLauncher, MenuLauncherSkeleton } from "@/components/layout/menu-launcher";
import { Skeleton } from "@/components/ui/skeleton";
import { verifySession } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-4 sm:pb-8">
      <Suspense fallback={<GreetingSkeleton />}>
        <Greeting />
      </Suspense>
      <Suspense fallback={<MenuLauncherSkeleton />}>
        <Menu />
      </Suspense>
    </div>
  );
}

// Sapaan sederhana dengan nama depan user.
async function Greeting() {
  const user = await verifySession();
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">Halo, {user.fullName.split(" ")[0]}</h1>
      <p className="text-sm text-muted-foreground">Pilih menu di bawah, atau cari dengan kolom pencarian.</p>
    </div>
  );
}

function GreetingSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72 max-w-full" />
    </div>
  );
}

async function Menu() {
  const user = await verifySession();
  return <MenuLauncher role={user.role} />;
}

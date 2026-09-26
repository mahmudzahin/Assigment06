'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isWorkoutsActive = pathname === '/';
  const isMyPlanActive = pathname === '/my-plan';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-20 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-wider text-white sm:text-xl"
        >
          <Dumbbell className="h-5 w-5 text-lime-400 sm:h-6 sm:w-6" />
          <span>FITLOG</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all md:px-5 ${
              isWorkoutsActive
                ? 'bg-[#213502] text-[#a3e635]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all md:px-5 ${
              isMyPlanActive
                ? 'bg-[#213502] text-[#a3e635]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-2.5 py-1.5 text-[10px] font-bold text-black sm:px-3 sm:text-xs"
          >
            <span>Plan</span>
            <span>0</span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-zinc-600 px-2.5 py-1.5 text-[10px] font-bold text-zinc-300 sm:px-3 sm:text-xs"
          >
            <span>Saved</span>
            <span>0</span>
          </Link>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-zinc-800 px-4 py-2 sm:hidden">
        <div className="flex gap-2">

          <Link
            href="/"
            className={`flex-1 rounded-full px-4 py-2 text-center text-xs font-semibold ${
              isWorkoutsActive
                ? 'bg-[#213502] text-[#a3e635]'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`flex-1 rounded-full px-4 py-2 text-center text-xs font-semibold ${
              isMyPlanActive
                ? 'bg-[#213502] text-[#a3e635]'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            My Plan
          </Link>

        </div>
      </div>
    </nav>
  );
}
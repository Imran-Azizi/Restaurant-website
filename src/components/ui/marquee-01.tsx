"use client";

import { useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "“What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.”",
    profile:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "“This is easily one of the most reliable SaaS tools we’ve adopted. The UI is intuitive, integrations are seamless, and it saves us countless hours every week.”",
    profile:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "“We evaluated multiple solutions, but this stood out immediately. It’s fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.”",
    profile:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "“What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.”",
    profile:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <Card
      className={cn(
        "relative h-full w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10",
        "bg-[#141018] p-4 text-white shadow-none",
        "transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-out)]",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-white/20 motion-safe:hover:bg-[#1b161f]",
      )}
    >
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          <img
            className="size-8 rounded-full object-cover"
            width={32}
            height={32}
            alt=""
            src={profile}
            loading="lazy"
            decoding="async"
          />
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-medium leading-none text-white">
              {name}
            </p>
            <p className="mt-1 truncate text-xs font-medium leading-none text-white/40">
              {username}
            </p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}

export default function TestimonialMarqueeDemo() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((review, i) => (
          <ReviewCard key={`${review.username}-static-${i}`} {...review} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden py-2",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
      )}
    >
      <Marquee
        pauseOnHover
        repeat={5}
        className="w-full p-0 [--duration:20s] [--gap:1rem]"
      >
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review.username}-a-${index}`} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        repeat={5}
        className="w-full p-0 [--duration:20s] [--gap:1rem]"
      >
        {secondRow.map((review, index) => (
          <ReviewCard key={`${review.username}-b-${index}`} {...review} />
        ))}
      </Marquee>
    </div>
  );
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300;

const RELEASES = "https://api.github.com/repos/Hanno-Tech/nanno-releases/releases?per_page=10";
const FALLBACK = "https://github.com/Hanno-Tech/nanno-releases/releases";

// Latest Windows installer (pre-releases included while we're in beta). The app itself only
// opens with an active plan, so the installer link can be public.
export async function GET() {
  try {
    const res = await fetch(RELEASES, { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 300 } });
    const releases = (await res.json()) as { draft: boolean; assets: { name: string; browser_download_url: string }[] }[];
    for (const r of releases.filter((x) => !x.draft)) {
      const exe = r.assets.find((a) => /^Nanno-Setup-.*\.exe$/.test(a.name));
      if (exe) return NextResponse.redirect(exe.browser_download_url, 302);
    }
  } catch {
    // GitHub down or rate-limited: send people to the releases page instead.
  }
  return NextResponse.redirect(FALLBACK, 302);
}

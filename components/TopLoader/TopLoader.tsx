"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress-custom.css";
NProgress.configure({ showSpinner: false, minimum: 0.08 });

export default function TopLoaderAppRouter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    function isInternalLink(target: HTMLElement | null) {
      if (!target) return false;
      const anchor = target.closest("a");
      if (!anchor) return false;
      const href = (anchor as HTMLAnchorElement).getAttribute("href") ?? "";
      const targetAttr = (anchor as HTMLAnchorElement).getAttribute("target");
      if (href.startsWith("http") && !href.startsWith(window.location.origin))
        return false;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
      if (targetAttr === "_blank") return false;
      if (href.startsWith("#")) return false;
      return true;
    }

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!isInternalLink(el)) return;
      NProgress.start();
    };

    const onPop = () => {
      NProgress.start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams?.toString()]);

  return <Suspense fallback={null}></Suspense>;
}

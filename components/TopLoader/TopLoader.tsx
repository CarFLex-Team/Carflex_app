"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress-custom.css";

NProgress.configure({ showSpinner: false, minimum: 0.08 });

function TopLoaderInner() {
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
      const anchor = el?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (!isInternalLink(el)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const targetUrl = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search
      ) {
        return;
      }

      NProgress.start();
    };

    const onPop = () => {
      NProgress.start();
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams?.toString()]);

  return null;
}

export default function TopLoaderAppRouter() {
  return (
    <Suspense fallback={null}>
      <TopLoaderInner />
    </Suspense>
  );
}

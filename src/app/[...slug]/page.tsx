import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allRoutes, routeByPath } from "@/lib/routes";
import { metadataFor } from "@/lib/seo";
import { heroImageFor, renderRoute } from "@/lib/render";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allRoutes()
    .filter((route) => route.path !== "/")
    .map((route) => ({
      slug: route.path.slice(1).split("/"),
    }));
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const route = routeByPath(path);
  if (!route) return {};

  return metadataFor(route, await heroImageFor(route));
}

export default async function DynamicRoutePage({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const route = routeByPath(path);

  if (!route) {
    notFound();
  }

  return renderRoute(route);
}

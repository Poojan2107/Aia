import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allRoutes, routeByPath } from "@/lib/routes";
import { metadataFor } from "@/lib/seo";
import { renderRoute } from "@/lib/render";

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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const route = routeByPath(path);
  if (!route) return {};

  return metadataFor(route);
}

export default async function DynamicRoutePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const path = "/" + slug.join("/");
  const route = routeByPath(path);

  if (!route) {
    notFound();
  }

  const industry =
    typeof resolvedSearchParams?.industry === "string" ? resolvedSearchParams.industry : undefined;

  return renderRoute(route, { industry });
}

import { API_URL } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/departments`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const items = data.departments || [];
      if (items.length > 0) {
        return items.map((item: any) => ({ slug: item.slug }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch departments for static params:", error);
  }
  return [{ slug: "placeholder" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

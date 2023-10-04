const projectId = "default"; // your supabase project id

export default function supabaseLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/render/image/public/${src}?width=${width}&quality=${
    quality || 90
  }`;
}

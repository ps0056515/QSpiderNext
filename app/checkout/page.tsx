import { CheckoutForm } from './CheckoutForm';

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams.course;
  const initial =
    typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] ?? '' : '';
  const rawPath = searchParams.path;
  const initialPath =
    typeof rawPath === 'string' ? rawPath : Array.isArray(rawPath) ? rawPath[0] ?? '' : '';
  return <CheckoutForm initialCourseSlug={initial} initialPathSlug={initialPath} />;
}

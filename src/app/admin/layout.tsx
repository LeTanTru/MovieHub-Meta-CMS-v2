import { SidebarLayout } from '@/components/layout';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}

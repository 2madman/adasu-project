import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Panel - Adasu',
  description: 'Admin panel for managing products',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Adasu Admin Panel</h1>
          <Link href="/" className="text-sm hover:underline">
            Return to Website
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
} 
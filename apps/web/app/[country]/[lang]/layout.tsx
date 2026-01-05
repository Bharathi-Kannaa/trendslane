import Navbar from '@/components/Navbar/navbar';
import { Toaster } from '@workspace/ui/components/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import Subscribe from '@/components/Subscribe/subscribe';
import Footer from '@/components/Footer/footer';
import { ConvexClientProvider } from '@/components/providers/ConvexProvider';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <Navbar />
        <Toaster />
        {children}
        <Subscribe />
        <Footer />
      </ConvexClientProvider>
      <Toaster position='bottom-right' duration={4000} />
    </ClerkProvider>
  );
}

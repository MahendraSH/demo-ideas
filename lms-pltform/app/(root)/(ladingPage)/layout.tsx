import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import { auth } from "@clerk/nextjs";

export default function RootLandingLayout({
  // (root LandinagPage)
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const isAuth = userId ? true : false;
  return (
    <main className=" bg-background">
      <Navbar isAuth={isAuth} />
      {children}
      <Footer />
    </main>
  );
}

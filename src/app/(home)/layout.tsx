import { Footer } from "app/components/shared/Footer";
import { RequireAuth } from "app/components/shared/Middleware";
import Navbar from "app/components/shared/Navbar/Navbar";
import "app/styles/globals.scss";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function Layout3({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
}

import { RequireAuth } from "app/components/shared/MiddlewareX";
import RequireNoAuth from "app/components/shared/MiddlewareX/RequireNoAuth";
import NavbarLogged from "app/components/shared/Navbar/NavbarLogged";
import "app/styles/globals.scss";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function LayoutAuth({ children }: Props) {
  return (
    <>
      <RequireNoAuth>
            {children}
      </RequireNoAuth>
    </>
  );
}

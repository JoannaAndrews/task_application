import Header from "./Header";
import { Outlet } from "react-router";

const Layout = ({ onLogout }: { onLogout: any }) => {

  return (
    <div>
      <Header onLogout={onLogout}></Header>
      {/* Header, then Dashboard (which includes sidebar + main) */}
      <main><Outlet></Outlet></main>

    </div>
  );
};

export default Layout;


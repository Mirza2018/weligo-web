import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/share/Header";
import { Footer } from "../components/share/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 ">
        <ScrollRestoration />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;

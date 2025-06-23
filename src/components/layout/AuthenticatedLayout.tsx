import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function AuthenticatedLayout() {
  return (
    <>
      <TopBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
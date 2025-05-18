import { Navigate } from "react-router";

export function Home() {
  return <Navigate to="/post-list" replace />;
}

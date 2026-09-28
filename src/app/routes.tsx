import { Navigate, createBrowserRouter } from "react-router";
import BioHub from "../App";

export const router = createBrowserRouter([
  { path: "/", Component: BioHub },
  { path: "/noticias", Component: BioHub },
  { path: "/artigos", Component: BioHub },
  { path: "/agenda", Component: BioHub },
  { path: "/oportunidades", Component: BioHub },
  { path: "/area-da-liga", Component: BioHub },
  { path: "*", element: <Navigate to="/" replace /> },
]);

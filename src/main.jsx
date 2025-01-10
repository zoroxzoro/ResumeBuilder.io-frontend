import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

import EditResume from "./pages/dashcomp/[resume]/edit/index.jsx";
import ViewResume from "./myresume/[resumeId]/view/index.jsx";
import { ThemeProvider } from "./components/ui/ThemeProvider.jsx";
import { ModeToggle } from "./costumeComps/Toggle.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "*",
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <SignedIn>
            <Dashboard />
          </SignedIn>
        ),
      },
      {
        path: "/dashboard/resume/:id/edit",
        element: <EditResume />,
      },
    ],
  },

  {
    path: "/auth/sign-in",
    element: <Login />,
  },
  {
    path: "/myresume/:resumeId/view",
    element: <ViewResume />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);

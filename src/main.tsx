import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserCard } from "./cards/UserCard.tsx";
import { RegistCard } from "./cards/RegistCard.tsx";
import { TopCard } from "./cards/TopCard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<TopCard />} />
          <Route path="/cards/:id" element={<UserCard />} />
          <Route path="/cards/register" element={<RegistCard />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import Times from "./services/time-zone.ts";

const root = document.getElementById("root");
if ((root !== null) && (root !== undefined)) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
// console.log("Hollo word");
// const timeZone = new Times("+7");

// if (root !== null) {
//   timeZone.boxTime = root;
//   timeZone.timeZone();
// }

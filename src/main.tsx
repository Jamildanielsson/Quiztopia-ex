import App from "./App";
import React from "react";
import "./index.scss";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
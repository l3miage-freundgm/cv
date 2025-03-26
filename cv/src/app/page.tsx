import CV from "./cv/page";
import * as React from "react";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function App() {
  return (
    <HeroUIProvider>
      <CV/>
    </HeroUIProvider>
  );
}

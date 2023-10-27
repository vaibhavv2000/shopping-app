import { useState, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store";

const light = {
  primary: "dodgerblue",
  secondary: "#fff",
  primary_text: "#111",
  secondary_text: "#111",
};

const dark = {
  primary: "#111",
  secondary: "#151515",
  primary_text: "#fff",
  secondary_text: "#777",
};

function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const { isDarkMode } = useSelector((state: RootState) => state.user)

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });
  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={isDarkMode ? dark : light}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}

export default StyledComponentsRegistry;

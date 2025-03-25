import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import CV from "~/cv/cv";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FREUND GALEANO Matias" },
    { name: "description", content: "Welcome to my React CV!" },
  ];
}

export default function Home() {
  return <CV />;
}

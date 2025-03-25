import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import ProfessionalCVV2 from "~/components/ProfessionalCVV2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <ProfessionalCVV2 />;
}

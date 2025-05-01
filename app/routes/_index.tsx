import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "DALI Lab" },
    { name: "description", content: "Welcome to DALI Lab!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Navbar />
      <h1>DALI Lab</h1>
    </div>
  );
}

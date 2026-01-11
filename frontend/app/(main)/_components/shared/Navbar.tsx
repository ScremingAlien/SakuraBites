import Link from "next/link";
import CategoryList from "./CategoryList";
import MainNavbar from "./navbar/MainNavbar";

type Props = {};

export default function Navbar({ }: Props) {
  return (
    <section className="  space-y-5">
      <MainNavbar />
      <CategoryList />
    </section>
  );
}

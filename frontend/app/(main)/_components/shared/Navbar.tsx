import Link from "next/link";
import CategoryList from "./CategoryList";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <section className="  space-y-5">
      <div className=" flex  justify-between items-center">
        <span className=" text-ONE text-4xl font-semibold font-sansita ">
          SakuraBites
        </span>
        <div className=" space-x-8">
          {navlinkData.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className=" text-xl font-sansita uppercase tracking-[1px]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <CategoryList />
    </section>
  );
}

const navlinkData: { name: string; link: string }[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
];

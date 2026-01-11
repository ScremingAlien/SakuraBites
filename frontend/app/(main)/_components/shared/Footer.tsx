import React from "react";

type Props = {};

export default function Footer({ }: Props) {
  const year: number = new Date().getFullYear();

  return (
    <section className="   pt-5">
      <div className=" flex   justify-end">social media links --</div>
      <div className=" space-x-4  w-full flex justify-between items-end">
        <h2>Sakura<span className=" text-THREE">Bites</span></h2>
        <span>© {year} SakuraBites. All Rights Reserved.</span>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Item = {
  sku: string;
  name: string;
  brand: string;
  type: string;
  colour: string;
  sizes: string[];
  rrp: string;
  cost: string;
  margin: string;
  status: "Pending" | "Needs changes" | "Approved";
  supplier: string;
  submittedAt: string;
  image: string;
  thumbs: string[];
};

const items: Item[] = [
  {
    sku: "BLZ-981237-BLK-01",
    name: "Oversized Structured Blazer",
    brand: "Design Studio",
    type: "Blazer",
    colour: "Jet Black",
    sizes: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14"],
    rrp: "$145.00",
    cost: "$74.00",
    margin: "48.97%",
    status: "Pending",
    supplier: "North Lane Apparel Ltd",
    submittedAt: "2026-05-18 11:42 UTC",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    sku: "SRT-771004-GRY-02",
    name: "French Terry Oversized Shorts",
    brand: "Athletic Supply",
    type: "Shorts",
    colour: "Grey",
    sizes: ["XS", "S", "M", "L", "XL"],
    rrp: "$49.99",
    cost: "$21.10",
    margin: "57.79%",
    status: "Needs changes",
    supplier: "Peak Sport Wholesale",
    submittedAt: "2026-05-19 08:15 UTC",
    image: "https://images.unsplash.com/photo-1617952385804-7efee95f5ee4?auto=format&fit=crop&w=1200&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1617952385804-7efee95f5ee4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=400&q=80"
    ]
  }
];

export default function Home() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedSku, setSelectedSku] = useState(items[0].sku);
  const selected = items.find((i) => i.sku === selectedSku) ?? items[0];
  const index = items.findIndex((i) => i.sku === selectedSku);

  const nav = (d: -1 | 1) => {
    const next = (index + d + items.length) % items.length;
    setSelectedSku(items[next].sku);
  };

  return (
    <main className="min-h-screen bg-[#efefef] text-[#2d2d2d]">
      <div className="mx-auto max-w-[1420px] px-5 py-5">
        <header className="mb-4 flex items-end justify-between border-b border-zinc-300 pb-3">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-500">Supplier ingestion queue</p>
            <h1 className="text-[30px] font-semibold">Catalogue Approval Workspace</h1>
          </div>
          <p className="text-sm">{index + 1} of 24 pending review</p>
        </header>

        {view === "list" ? (
          <section className="border border-zinc-300 bg-white">
            <div className="grid gap-2 border-b border-zinc-200 p-3 md:grid-cols-[1fr_repeat(3,180px)_220px]">
              <input className="h-11 border border-zinc-400 px-3 text-sm" placeholder="Search SKU, name, supplier or brand" />
              <select className="h-11 border border-zinc-400 px-3 text-sm"><option>Status: All</option></select>
              <select className="h-11 border border-zinc-400 px-3 text-sm"><option>Supplier: All</option></select>
              <select className="h-11 border border-zinc-400 px-3 text-sm"><option>Type: All</option></select>
              <button className="h-11 bg-black px-4 text-sm font-semibold text-white">Approve selected (2)</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.12em] text-zinc-600">
                  <tr className="border-b border-zinc-300 bg-[#f8f8f8]">
                    <th className="px-3 py-3"><input type="checkbox" defaultChecked /></th><th>Item</th><th>SKU</th><th>Supplier</th><th>Colour</th><th>Sizes</th><th>Status</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={it.sku} className="border-b border-zinc-200">
                      <td className="px-3 py-3"><input type="checkbox" defaultChecked={i === 0} /></td>
                      <td className="py-3 font-semibold">{it.name}<div className="text-xs font-normal text-zinc-500">{it.brand}</div></td>
                      <td>{it.sku}</td><td>{it.supplier}</td><td>{it.colour}</td><td>{it.sizes.join(", ")}</td><td>{it.status}</td>
                      <td className="pr-3 text-right"><button onClick={() => { setSelectedSku(it.sku); setView("detail"); }} className="border border-zinc-400 px-3 py-1.5 text-xs">Open</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section>
            <div className="mb-4 text-xs">Home &nbsp;›&nbsp; Men &nbsp;›&nbsp; CTAS &nbsp;›&nbsp; Festival &nbsp;›&nbsp; {selected.name}</div>
            <div className="grid bg-white lg:grid-cols-[72px_1fr_390px]">
              <aside className="border-r border-zinc-300 bg-[#f2f2f2] p-2">
                <div className="space-y-3">
                  {selected.thumbs.map((t) => (
                    <button key={t} className="relative block aspect-[3/4] w-full overflow-hidden border border-zinc-300 bg-white">
                      <Image src={t} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </aside>

              <div className="relative bg-[#f1f1f1] p-3 md:p-4">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[760px] bg-[#ececec]">
                  <Image src={selected.image} alt={selected.name} fill className="object-cover" priority />
                </div>
                <button onClick={() => nav(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-6xl text-zinc-700">‹</button>
                <button onClick={() => nav(1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl text-zinc-700">›</button>
              </div>

              <article className="border-l border-zinc-300 bg-white p-5">
                <button onClick={() => setView("list")} className="mb-4 text-xs uppercase tracking-[0.1em] text-zinc-500">← back to list</button>
                <h2 className="text-[42px] leading-[1.1]">{selected.brand} {selected.name}</h2>
                <p className="mt-3 text-[40px] font-semibold">{selected.rrp}</p>
                <p className="mt-2 text-sm">Cost {selected.cost} · Margin {selected.margin}</p>

                <div className="mt-6 text-sm">
                  <p className="font-bold uppercase tracking-[0.1em]">Colour: <span className="font-normal">{selected.colour}</span></p>
                  <div className="mt-2 flex gap-2">
                    {selected.thumbs.slice(0, 2).map((t) => (
                      <button key={t} className="relative h-16 w-12 overflow-hidden border border-zinc-400">
                        <Image src={t} alt="option" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em]">Size:</p>
                  <select className="mt-2 h-12 w-full border border-zinc-500 px-3 text-sm"><option>Please select</option>{selected.sizes.map((s) => <option key={s}>{s}</option>)}</select>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_56px] gap-2">
                  <button className="bg-[#0a8f4c] py-3 text-lg font-bold text-white">APPROVE ITEM</button>
                  <button className="rounded-full border border-zinc-300 text-2xl">♡</button>
                </div>

                <div className="mt-5 border border-zinc-200 p-4 text-sm">
                  <p>Submitted by {selected.supplier}</p>
                  <p>{selected.submittedAt}</p>
                  <p className="mt-2">SKU: {selected.sku}</p>
                  <p>Type: {selected.type}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="border border-zinc-400 py-2.5 font-semibold">Reject</button>
                  <button className="border border-zinc-400 py-2.5 font-semibold">Need Changes</button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button onClick={() => nav(-1)} className="border border-zinc-400 py-2 text-sm">← Previous item</button>
                  <button onClick={() => nav(1)} className="border border-zinc-400 py-2 text-sm">Next item →</button>
                </div>
              </article>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

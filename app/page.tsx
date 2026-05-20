"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Status = "LIVE" | "PENDING" | "DRAFT";
type Product = { id:string; name:string; brand:string; area:string; category:string; rrp:string; status:Status; stock:number; updated:string; image:string; variants:{size:string; sku:string; ean:string; stock:number; available:number; price:string; cost:string}[] };

const products: Product[] = [
  { id:"45075832", name:"cropped blazer in black", brand:"DESIGN STUDIO", area:"Womenswear", category:"Tailoring", rrp:"£45.00", status:"LIVE", stock:120, updated:"21 May 2024", image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80", variants:[{size:"4",sku:"45075832-4",ean:"5059671234567",stock:12,available:10,price:"£45.00",cost:"£18.00"},{size:"6",sku:"45075832-6",ean:"5059671234568",stock:18,available:15,price:"£45.00",cost:"£18.00"},{size:"8",sku:"45075832-8",ean:"5059671234569",stock:20,available:16,price:"£45.00",cost:"£18.00"}] },
  { id:"27123456", name:"Air Force 1 '07 trainers in white", brand:"Nike", area:"Menswear", category:"Footwear", rrp:"£110.00", status:"LIVE", stock:58, updated:"21 May 2024", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", variants:[] },
  { id:"62789123", name:"tiered smock dress in cream floral", brand:"New Look", area:"Womenswear", category:"Dresses", rrp:"£28.99", status:"PENDING", stock:0, updated:"20 May 2024", image:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80", variants:[] },
];

const Pill=({status}:{status:Status})=><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status==="LIVE"?"bg-emerald-100 text-emerald-700":status==="PENDING"?"bg-amber-100 text-amber-700":"bg-zinc-200 text-zinc-700"}`}>{status}</span>;

export default function Home(){
  const [selectedId,setSelectedId]=useState(products[0].id);
  const [expanded,setExpanded]=useState(false);
  const s=useMemo(()=>products.find(p=>p.id===selectedId)??products[0],[selectedId]);

  return <main className="min-h-screen bg-[#f5f6f8] p-6 text-zinc-900"><div className="mx-auto max-w-[1700px]">{!expanded?(
    <div className="grid gap-0 rounded-xl border border-zinc-200 bg-white lg:grid-cols-[1fr_560px]">
      <section className="border-r border-zinc-200 p-7">
        <div className="mb-5 flex items-start justify-between"><div><p className="text-sm text-zinc-500">Catalogue › Products</p><h1 className="text-[52px] font-semibold leading-none">Products</h1><p className="mt-2 text-zinc-500">View and manage all products across all areas and brands.</p></div><div className="flex gap-2"><button className="h-11 rounded-lg border border-zinc-300 px-4">Export</button><button className="h-11 rounded-lg bg-zinc-900 px-4 text-white">Add product</button></div></div>
        <div className="mb-5 grid gap-2 rounded-lg border border-zinc-200 p-3 md:grid-cols-[2fr_repeat(5,1fr)_1fr]"><input className="h-11 rounded-md border border-zinc-300 px-3" placeholder="Search by product name, code or brand" />{["Brand","Area","Category","Season","Status"].map(x=><select key={x} className="h-11 rounded-md border border-zinc-300 px-3"><option>{x}</option></select>)}<button className="h-11 rounded-md border border-zinc-300">More filters</button></div>
        <table className="w-full text-left text-sm"><thead className="text-xs uppercase text-zinc-500"><tr className="border-b border-zinc-200"><th className="w-8 py-3"><input type="checkbox"/></th><th>Image</th><th>Product name</th><th>Product code</th><th>Brand</th><th>Area</th><th>Category</th><th>RRP</th><th>Status</th><th>Stock</th><th>Updated</th></tr></thead><tbody>{products.map(p=><tr key={p.id} className={`cursor-pointer border-b border-zinc-200 ${p.id===s.id?"bg-zinc-50":""}`} onClick={()=>setSelectedId(p.id)}><td className="py-3"><input type="checkbox"/></td><td><Image src={p.image} alt={p.name} width={40} height={52} className="h-12 w-10 rounded object-cover"/></td><td className="font-medium">{p.brand}<div className="font-normal normal-case">{p.name}</div></td><td>{p.id}</td><td>{p.brand}</td><td>{p.area}</td><td>{p.category}</td><td>{p.rrp}</td><td><Pill status={p.status}/></td><td>{p.stock}</td><td>{p.updated}</td></tr>)}</tbody></table>
      </section>
      <aside className="p-7"><div className="mb-3 flex items-center justify-between"><Pill status={s.status}/><button onClick={()=>setExpanded(true)} className="text-2xl">✕</button></div><h2 className="text-[46px] font-semibold leading-[1.05]">{s.brand}<br/>{s.name}</h2><p className="mt-3 text-sm text-zinc-600">Product code<br/><span className="text-3xl text-zinc-900">{s.id}</span></p><div className="mt-4 grid grid-cols-[1fr_84px] gap-2"><Image src={s.image} alt={s.name} width={340} height={420} className="h-[360px] w-full rounded object-cover"/><div className="space-y-2">{[s.image,s.image,s.image,s.image].map((im,i)=><Image key={i} src={im} alt="thumb" width={84} height={86} className="h-[84px] w-full rounded object-cover"/>)}</div></div><div className="mt-5 border-t border-zinc-200 pt-4"><div className="mb-2 flex gap-5 text-sm"><span className="border-b-2 border-zinc-900 pb-1">Overview</span><span>Variants</span><span>Inventory</span></div><h3 className="font-semibold">Product information</h3><p className="mt-2 text-sm text-zinc-600">Category<br/><span className="text-zinc-900">{s.category}</span></p></div></aside>
    </div>
  ):(
    <section className="rounded-xl border border-zinc-200 bg-white p-7"><div className="mb-3 text-sm text-zinc-500">Catalogue › Products › {s.id}</div><div className="mb-4 flex items-center justify-between"><h1 className="text-[54px] font-semibold leading-none">{s.brand} {s.name}</h1><button onClick={()=>setExpanded(false)} className="rounded-lg border px-4 py-2">Back</button></div><div className="grid gap-5 lg:grid-cols-[1fr_380px]"><div><div className="grid gap-3 md:grid-cols-[1fr_1fr]"><Image src={s.image} alt={s.name} width={700} height={800} className="h-[420px] w-full rounded object-cover"/><div className="grid grid-cols-2 gap-3">{[s.image,s.image,s.image,s.image].map((im,i)=><Image key={i} src={im} alt="media" width={220} height={200} className="h-[202px] w-full rounded object-cover"/>)}</div></div><div className="mt-4 rounded-lg border border-zinc-200"><div className="border-b px-4 py-3 font-semibold">Variants</div><table className="w-full text-sm"><thead><tr className="border-b text-zinc-500"><th className="px-4 py-2 text-left">Size</th><th>SKU</th><th>EAN</th><th>Stock</th><th>Available</th><th>Price</th><th>Cost price</th></tr></thead><tbody>{s.variants.map(v=><tr key={v.sku} className="border-b"><td className="px-4 py-2">{v.size}</td><td>{v.sku}</td><td>{v.ean}</td><td>{v.stock}</td><td>{v.available}</td><td>{v.price}</td><td>{v.cost}</td></tr>)}</tbody></table></div></div><div className="space-y-4"><div className="rounded-lg border border-zinc-200 p-4"><h3 className="mb-3 font-semibold">Commercials</h3><div className="grid grid-cols-2 gap-y-3 text-sm"><span>RRP</span><b>{s.rrp}</b><span>Cost price</span><b>£18.00</b><span>Margin</span><b>60.0%</b><span>Markup</span><b>150.0%</b></div></div><div className="rounded-lg border border-zinc-200 p-4"><h3 className="mb-3 font-semibold">Stock overview</h3><div className="grid grid-cols-3 gap-2 text-sm"><div><p className="text-zinc-500">Total</p><p className="text-2xl">120</p></div><div><p className="text-zinc-500">Available</p><p className="text-2xl">98</p></div><div><p className="text-zinc-500">On order</p><p className="text-2xl">40</p></div></div></div></div></div></section>
  )}</div></main>
import Image from "next/image";

const fields = [
  { label: "Type", value: "Blazer" },
  { label: "Name", value: "Oversized Structured Blazer" },
  { label: "Brand", value: "ASOS DESIGN" },
  { label: "Colour", value: "Jet Black" },
  { label: "Margin", value: "48.97%" },
  { label: "Image", value: "Primary + 3 additional" }
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 md:px-8">
      <section className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-black px-3 py-1.5 text-xs font-extrabold tracking-[0.2em] text-white">ASOS</span>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-700">Catalogue Approval</p>
          </div>
          <p className="hidden items-center gap-2 text-sm font-medium text-zinc-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
            1 of 24 pending review
          </p>
        </header>

        <div className="grid lg:grid-cols-[360px_1fr]">
          <aside className="border-b border-zinc-200 bg-zinc-50 p-5 lg:border-r lg:border-b-0 lg:p-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <span className="absolute left-3 top-3 z-10 rounded-full bg-black/85 px-3 py-1 text-[11px] font-semibold tracking-[0.09em] text-white">WOMENSWEAR</span>
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                alt="Black oversized blazer on model"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["SKU", "AS-981237-BLK"],
                ["Size", "UK 10"],
                ["RRP", "$145.00"],
                ["Cost Price", "$74.00"]
              ].map(([label, value]) => (
                <article key={label} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-500">{label}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
                  {label === "Cost Price" ? (
                    <p className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">Margin 48.97%</p>
                  ) : null}
                </article>
              ))}
            </div>
          </aside>

          <section className="p-6 md:p-8">
            <header>
              <h1 className="text-2xl font-bold leading-tight text-zinc-950 md:text-3xl">ASOS DESIGN Oversized Structured Blazer</h1>
              <p className="mt-2 text-sm font-medium text-zinc-500">Review item content, costing and attributes before publication.</p>
            </header>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {fields.map((field) => (
                <article key={field.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-500">{field.label}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-900">{field.value}</p>
                </article>
              ))}
            </div>

            <article className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600">Details</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                Single-breasted blazer in premium woven fabric with light shoulder padding, notch lapels, flap pockets and relaxed
                oversized tailoring. Fully lined with internal pocket and back vent for ease of movement. Suitable for smart-casual
                and occasion styling.
              </p>
            </article>

            <footer className="mt-6 flex flex-wrap justify-end gap-3">
              <button className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50">Reject</button>
              <button className="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-200">Need Changes</button>
              <button className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5">Approve Item</button>
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}

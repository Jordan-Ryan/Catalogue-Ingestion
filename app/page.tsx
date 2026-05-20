"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Status = "LIVE" | "PENDING" | "DRAFT";
type Variant = {
  size: string;
  colour: string;
  sku: string;
  ean: string;
  status: Status;
  stock: number;
  available: number;
  rrp: string;
  price: string;
  cost: string;
};

type ProductField = {
  key: string;
  label: string;
  value: string;
  mandatory?: boolean;
};

type Product = {
  id: string;
  name: string;
  brand: string;
  area: string;
  category: string;
  rrp: string;
  status: Status;
  stock: number;
  updated: string;
  image: string;
  gallery: string[];
  productInfo: ProductField[];
  commercials: ProductField[];
  attributes: ProductField[];
  inventory: ProductField[];
  suppliers: ProductField[];
  history: ProductField[];
  variants: Variant[];
};

const products: Product[] = [
  {
    id: "45075832",
    name: "cropped blazer in black",
    brand: "ASOS DESIGN",
    area: "Womenswear",
    category: "Tailoring",
    rrp: "£45.00",
    status: "LIVE",
    stock: 120,
    updated: "21 May 2024",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    ],
    productInfo: [
      { key: "code", label: "Product code", value: "45075832", mandatory: true },
      { key: "category", label: "Category", value: "Tailoring > Blazers", mandatory: true },
      { key: "season", label: "Season", value: "AW24", mandatory: true },
      { key: "fit", label: "Fit", value: "Regular" },
      { key: "composition", label: "Composition", value: "Main: 100% Polyester" },
    ],
    commercials: [
      { key: "rrp", label: "RRP", value: "£45.00", mandatory: true },
      { key: "cost", label: "Cost", value: "£18.00", mandatory: true },
      { key: "margin", label: "Margin", value: "60.0%" },
    ],
    attributes: [
      { key: "occasion", label: "Occasion", value: "Going out" },
      { key: "pattern", label: "Pattern", value: "Plain" },
    ],
    inventory: [
      { key: "available", label: "Available", value: "98" },
      { key: "reserved", label: "Reserved", value: "22" },
    ],
    suppliers: [{ key: "supplier", label: "Primary supplier", value: "Shenzhen Textiles Ltd" }],
    history: [{ key: "updated", label: "Last updated", value: "21 May 2024, 10:42" }],
    variants: [
      { size: "4", colour: "Black", sku: "45075832-4", ean: "5059671234567", status: "LIVE", stock: 12, available: 10, rrp: "£45.00", price: "£45.00", cost: "£18.00" },
      { size: "6", colour: "Black", sku: "45075832-6", ean: "5059671234568", status: "LIVE", stock: 18, available: 15, rrp: "£45.00", price: "£45.00", cost: "£18.00" },
    ],
  },
  {
    id: "27123456",
    name: "Air Force 1 '07 trainers in white",
    brand: "Nike",
    area: "Menswear",
    category: "Footwear",
    rrp: "£110.00",
    status: "LIVE",
    stock: 58,
    updated: "21 May 2024",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"],
    productInfo: [
      { key: "code", label: "Product code", value: "27123456", mandatory: true },
      { key: "category", label: "Category", value: "Footwear > Trainers", mandatory: true },
    ],
    commercials: [{ key: "rrp", label: "RRP", value: "£110.00", mandatory: true }],
    attributes: [{ key: "material", label: "Upper material", value: "Leather" }],
    inventory: [{ key: "available", label: "Available", value: "45" }],
    suppliers: [{ key: "supplier", label: "Primary supplier", value: "Nike EMEA" }],
    history: [{ key: "updated", label: "Last updated", value: "21 May 2024, 12:10" }],
    variants: [],
  },
];

const tabs = ["Overview", "Variants", "Attributes", "Inventory", "Suppliers", "Media", "History", "Change log"] as const;

const Pill = ({ status }: { status: Status }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status === "LIVE" ? "bg-emerald-100 text-emerald-700" : status === "PENDING" ? "bg-amber-100 text-amber-700" : "bg-zinc-200 text-zinc-700"}`}>{status}</span>
);

const DetailFields = ({ fields }: { fields: ProductField[] }) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {fields.map((field) => (
      <div key={field.key}>
        <p className="text-xs text-zinc-500">{field.label}{field.mandatory ? " *" : ""}</p>
        <p className="font-medium">{field.value}</p>
      </div>
    ))}
  </div>
);

export default function Home() {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const selected = useMemo(() => products.find((p) => p.id === selectedId) ?? products[0], [selectedId]);

  return (
    <main className="min-h-screen bg-white px-8 py-7 text-zinc-900">
      <div className="mb-4 text-sm text-zinc-500">Catalogue › Products</div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-semibold">Products</h1>
          <p className="mt-2 text-zinc-500">Select a product to open full detail view.</p>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border border-zinc-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr><th className="px-4 py-3">Image</th><th>Product name</th><th>Product code</th><th>Brand</th><th>Area</th><th>Category</th><th>Status</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} onClick={() => setSelectedId(p.id)} className={`cursor-pointer border-t ${selected.id === p.id ? "bg-zinc-50" : "bg-white"}`}>
                <td className="px-4 py-3"><Image src={p.image} alt={p.name} width={44} height={58} className="h-14 w-11 rounded object-cover" /></td>
                <td className="font-medium">{p.brand}<div className="font-normal">{p.name}</div></td><td>{p.id}</td><td>{p.brand}</td><td>{p.area}</td><td>{p.category}</td><td><Pill status={p.status} /></td><td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-xl border border-zinc-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Catalogue › Products › {selected.id}</p>
            <h2 className="text-4xl font-semibold">{selected.brand} {selected.name} <span className="align-middle"><Pill status={selected.status} /></span></h2>
          </div>
          <div className="text-sm text-zinc-500">Added: {selected.updated}</div>
        </div>

        <div className="mb-5 grid gap-5 xl:grid-cols-[1.2fr_1fr_340px]">
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="mb-3 font-semibold">Media</h3>
            <div className="grid gap-3 md:grid-cols-[1fr_1fr]"><Image src={selected.gallery[0]} alt={selected.name} width={580} height={680} className="h-[420px] w-full rounded object-cover" /><div className="grid grid-cols-2 gap-3">{selected.gallery.map((im, i) => <Image key={i} src={im} alt={`media-${i}`} width={180} height={200} className="h-[200px] w-full rounded object-cover" />)}</div></div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4"><h3 className="mb-4 font-semibold">Product summary</h3><DetailFields fields={selected.productInfo} /></div>
          <div className="space-y-4"><div className="rounded-lg border border-zinc-200 p-4"><h3 className="mb-4 font-semibold">Commercials</h3><DetailFields fields={selected.commercials} /></div><div className="rounded-lg border border-zinc-200 p-4"><h3 className="mb-4 font-semibold">Stock overview</h3><DetailFields fields={selected.inventory} /></div></div>
        </div>

        <div className="mb-4 flex gap-5 border-b text-sm">
          {tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? "border-b-2 border-zinc-900 font-semibold" : "text-zinc-500"}`}>{tab}</button>)}
        </div>

        {activeTab === "Variants" ? (
          <table className="w-full text-left text-sm">
            <thead className="text-zinc-500"><tr className="border-b"><th className="py-2">Size</th><th>Colour</th><th>SKU</th><th>EAN</th><th>Status</th><th>Stock</th><th>Available</th><th>RRP</th><th>Price</th><th>Cost</th></tr></thead>
            <tbody>{selected.variants.map((v) => <tr key={v.sku} className="border-b"><td className="py-2">{v.size}</td><td>{v.colour}</td><td>{v.sku}</td><td>{v.ean}</td><td><Pill status={v.status} /></td><td>{v.stock}</td><td>{v.available}</td><td>{v.rrp}</td><td>{v.price}</td><td>{v.cost}</td></tr>)}</tbody>
          </table>
        ) : (
          <DetailFields
            fields={
              activeTab === "Attributes" ? selected.attributes :
              activeTab === "Inventory" ? selected.inventory :
              activeTab === "Suppliers" ? selected.suppliers :
              activeTab === "History" || activeTab === "Change log" ? selected.history :
              selected.productInfo
            }
          />
        )}
      </section>
    </main>
  );
}

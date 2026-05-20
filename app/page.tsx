import Image from "next/image";

type CatalogueItem = {
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
};

const ingestionQueue: CatalogueItem[] = [
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
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
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
    image:
      "https://images.unsplash.com/photo-1617952385804-7efee95f5ee4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    sku: "TEE-182220-WHT-07",
    name: "Essential Crew T-Shirt",
    brand: "Urban Basic",
    type: "T-Shirt",
    colour: "White",
    sizes: ["S", "M", "L"],
    rrp: "$35.00",
    cost: "$13.80",
    margin: "60.57%",
    status: "Pending",
    supplier: "Threadline Manufacturing",
    submittedAt: "2026-05-19 14:26 UTC",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
  }
];

const selectedItem = ingestionQueue[0];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] text-[#222]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Supplier ingestion queue</p>
            <h1 className="mt-1 text-3xl font-bold">Catalogue Approval Workspace</h1>
            <p className="text-sm text-zinc-500">Review supplier products before publishing to the live catalogue.</p>
          </div>
          <p className="text-sm font-semibold">1 of 24 pending review</p>
        </header>

        <section className="mb-6 rounded bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <input className="h-11 min-w-[230px] flex-1 border border-zinc-300 px-3 text-sm" placeholder="Search SKU, name, supplier or brand" />
            <select className="h-11 border border-zinc-300 px-3 text-sm"><option>Status: All</option></select>
            <select className="h-11 border border-zinc-300 px-3 text-sm"><option>Supplier: All</option></select>
            <select className="h-11 border border-zinc-300 px-3 text-sm"><option>Type: All</option></select>
            <button className="h-11 bg-black px-4 text-sm font-semibold text-white">Approve selected (2)</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-y border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-[0.12em] text-zinc-500">
                  <th className="px-3 py-3"><input type="checkbox" aria-label="select all" defaultChecked /></th>
                  <th className="px-3 py-3">Item</th>
                  <th className="px-3 py-3">SKU</th>
                  <th className="px-3 py-3">Supplier</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Colour</th>
                  <th className="px-3 py-3">Sizes</th>
                  <th className="px-3 py-3">Margin</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {ingestionQueue.map((item, index) => (
                  <tr key={item.sku} className={`border-b border-zinc-200 ${index === 0 ? "bg-zinc-50/70" : "bg-white"}`}>
                    <td className="px-3 py-3 align-top"><input type="checkbox" defaultChecked={index < 2} /></td>
                    <td className="px-3 py-3 font-semibold">{item.name}<p className="text-xs font-normal text-zinc-500">{item.brand}</p></td>
                    <td className="px-3 py-3">{item.sku}</td>
                    <td className="px-3 py-3">{item.supplier}</td>
                    <td className="px-3 py-3">{item.type}</td>
                    <td className="px-3 py-3">{item.colour}</td>
                    <td className="px-3 py-3">{item.sizes.length} sizes</td>
                    <td className="px-3 py-3 font-semibold">{item.margin}</td>
                    <td className="px-3 py-3">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid overflow-hidden rounded bg-white shadow-sm lg:grid-cols-[90px_1fr_390px]">
          <aside className="hidden border-r border-zinc-200 bg-zinc-50 p-3 lg:block">
            <div className="space-y-3">
              {[selectedItem.image, ingestionQueue[1].image, ingestionQueue[2].image].map((img) => (
                <div key={img} className="relative aspect-[3/4] overflow-hidden border border-zinc-300 bg-zinc-100">
                  <Image src={img} alt="thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          </aside>

          <div className="border-r border-zinc-200 bg-[#f3f3f3] p-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-[#e9e9e9]">
              <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" priority />
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-4xl text-zinc-700">‹</button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-4xl text-zinc-700">›</button>
            </div>
            <p className="mt-3 text-center text-sm text-zinc-600">Submitted by {selectedItem.supplier} · {selectedItem.submittedAt}</p>
          </div>

          <article className="p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-zinc-500">Item details</p>
            <h2 className="text-3xl font-bold leading-tight">{selectedItem.brand} {selectedItem.name}</h2>
            <p className="mt-3 text-3xl font-black">{selectedItem.rrp}</p>
            <p className="mt-1 text-sm text-zinc-600">Cost {selectedItem.cost} · Margin {selectedItem.margin}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-zinc-500">SKU</p><p className="font-semibold">{selectedItem.sku}</p></div>
              <div><p className="text-zinc-500">Colour</p><p className="font-semibold">{selectedItem.colour}</p></div>
              <div><p className="text-zinc-500">Type</p><p className="font-semibold">{selectedItem.type}</p></div>
              <div><p className="text-zinc-500">Size run</p><p className="font-semibold">{selectedItem.sizes.join(", ")}</p></div>
            </div>

            <div className="mt-6 border-y border-zinc-200 py-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-zinc-700">Product details</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">Single-breasted blazer in premium woven fabric with light shoulder padding, notch lapels, flap pockets and relaxed oversized tailoring. Ingestion rule: each SKU maps to a single colour, while the same SKU can contain multiple sizes.</p>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 border border-zinc-300 py-3 font-semibold">Reject</button>
              <button className="flex-1 bg-zinc-200 py-3 font-semibold">Need Changes</button>
              <button className="flex-1 bg-black py-3 font-semibold text-white">Approve</button>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 border border-zinc-300 py-2 text-sm font-semibold">← Previous item</button>
              <button className="flex-1 border border-zinc-300 py-2 text-sm font-semibold">Next item →</button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

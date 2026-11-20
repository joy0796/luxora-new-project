//  "use client";
// import Image from "next/image";import {Heart,Minus,Plus,Truck,RotateCcw,ShieldCheck} from "lucide-react";import {useState} from "react";import type {Product} from "@/lib/data";import {useCart} from "./cart-provider";import {ProductCard} from "./product-card";
// export function ProductClient({product:p}:{product:Product}){const[image,setImage]=useState(0),[color,setColor]=useState(p.colors[0].name),[qty,setQty]=useState(1);const{addToCart}=useCart();const related: Product[] = [];;return <><motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.55}} className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]"><div className="grid gap-3 sm:grid-cols-[72px_1fr]"><div className="order-2 flex gap-2 sm:order-1 sm:flex-col">{p.images.map((x,i)=><button key={x} onClick={()=>setImage(i)} className={`relative aspect-square w-[64px] overflow-hidden border ${image===i?"border-ink":"border-transparent"}`}><Image src={x} alt="" fill sizes="64px" className="object-cover"/></button>)}</div><div className="relative aspect-[.9] overflow-hidden bg-[#eee9e2] sm:order-2"><Image src={p.images[image]} alt={p.name} fill sizes="50vw" className="object-cover" priority/></div></div><div className="flex flex-col justify-center lg:px-8"><span className="eyebrow">{p.category}</span><h1 className="display-serif mt-4 text-4xl md:text-5xl">{p.name}</h1><p className="mt-4 text-lg">${p.price.toFixed(2)}</p><p className="mt-5 max-w-lg text-sm leading-7 text-muted">{p.description}</p><div className="mt-7"><div className="mb-3 flex justify-between text-[10px] uppercase tracking-[.1em]"><span>Color</span><span>{color}</span></div><div className="flex gap-2">{p.colors.map(c=><button key={c.name} onClick={()=>setColor(c.name)} className={`h-8 w-8 rounded-full border-2 ${color===c.name?"border-ink":"border-transparent"}`} style={{backgroundColor:c.hex}}/>)}</div></div><div className="mt-7 flex gap-3"><div className="flex items-center border border-line"><button className="p-3" onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={13}/></button><span className="w-8 text-center text-xs">{qty}</span><button className="p-3" onClick={()=>setQty(qty+1)}><Plus size={13}/></button></div><button onClick={()=>Array.from({length:qty}).forEach(()=>addToCart())} className="lux-button flex-1">Add to Cart</button><button className="grid w-12 place-items-center border border-line"><Heart size={17}/></button></div><div className="mt-8 grid grid-cols-3 border-y border-line py-5">{[[Truck,"Free Shipping"],[RotateCcw,"Easy Returns"],[ShieldCheck,"Secure Payment"]].map(([Icon,t])=><div key={t as string} className="flex flex-col items-center gap-2 text-center"><Icon size={17}/><span className="text-[9px] uppercase tracking-[.08em]">{t as string}</span></div>)}</div><div className="mt-7 space-y-4 border-b border-line pb-5 text-xs"><div className="flex justify-between"><span className="text-muted">Material</span><span>{p.material}</span></div><div className="flex justify-between"><span className="text-muted">Dimensions</span><span>{p.dimensions}</span></div></div></div></motion.div><section className="mt-20 border-t border-line pt-14"><span className="eyebrow">You may also like</span><h2 className="display-serif mt-2 text-4xl">Complete the edit</h2><div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{(related.length?related:products.filter(x=>x.id!==p.id).slice(0,4)).map(x=><ProductCard key={x.id} product={x}/>)}</div></section></>}




"use client";

import Image from "next/image";
import {
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import type { Product } from "@/lib/data";
import { products } from "@/lib/data";

import { useCart } from "./cart-provider";
import { ProductCard } from "./product-card";

export function ProductClient({ product: p }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [color, setColor] = useState(p.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  const related: Product[] = [];

  const productImages = p.images.length > 0 ? p.images : [p.image];

  const relatedProducts = related.length
    ? related
    : products.filter((x) => x.id !== p.id).slice(0, 4);

  const features = [
    { Icon: Truck, text: "Free Shipping" },
    { Icon: RotateCcw, text: "Easy Returns" },
    { Icon: ShieldCheck, text: "Secure Payment" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]"
      >
        {/* Product Images */}
        <div className="grid gap-3 sm:grid-cols-[72px_1fr]">
          <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
            {productImages.map((x, i) => (
              <button
                key={`${x}-${i}`}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`View product image ${i + 1}`}
                aria-pressed={image === i}
                className={`relative aspect-square w-[64px] overflow-hidden border ${
                  image === i ? "border-ink" : "border-transparent"
                }`}
              >
                <Image
                  src={x}
                  alt={`${p.name} thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-[.9] overflow-hidden bg-[#eee9e2] sm:order-2">
            <Image
              src={productImages[image] ?? p.image}
              alt={p.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center lg:px-8">
          <span className="eyebrow">{p.category}</span>

          <h1 className="display-serif mt-4 text-4xl md:text-5xl">
            {p.name}
          </h1>

          <p className="mt-4 text-lg">${p.price.toFixed(2)}</p>

          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
            {p.description}
          </p>

          {/* Color Selection */}
          <div className="mt-7">
            <div className="mb-3 flex justify-between text-[10px] uppercase tracking-[.1em]">
              <span>Color</span>
              <span>{color}</span>
            </div>

            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={`Select ${c.name} color`}
                  aria-pressed={color === c.name}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === c.name
                      ? "border-ink"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Cart */}
          <div className="mt-7 flex gap-3">
            <div className="flex items-center border border-line">
              <button
                type="button"
                className="p-3"
                onClick={() =>
                  setQty((current) => Math.max(1, current - 1))
                }
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>

              <span className="w-8 text-center text-xs">{qty}</span>

              <button
                type="button"
                className="p-3"
                onClick={() => setQty((current) => current + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(p, color, qty)}
              className="lux-button flex-1"
            >
              Add to Cart
            </button>

            <button
              type="button"
              aria-label="Add to wishlist"
              className="grid w-12 place-items-center border border-line"
            >
              <Heart size={17} />
            </button>
          </div>

          {/* Shopping Benefits */}
          <div className="mt-8 grid grid-cols-3 border-y border-line py-5">
            {features.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Icon size={17} />

                <span className="text-[9px] uppercase tracking-[.08em]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Product Specifications */}
          <div className="mt-7 space-y-4 border-b border-line pb-5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Material</span>
              <span>{p.material}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Dimensions</span>
              <span>{p.dimensions}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Products */}
      <section className="mt-20 border-t border-line pt-14">
        <span className="eyebrow">You may also like</span>

        <h2 className="display-serif mt-2 text-4xl">
          Complete the edit
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {relatedProducts.map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </section>
    </>
  );
}

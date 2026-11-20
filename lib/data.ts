export type Product={id:string;slug:string;name:string;price:number;category:string;categorySlug:string;image:string;images:string[];description:string;colors:{name:string;hex:string}[];material:string;dimensions:string;badge?:string};
export type Collection={slug:string;name:string;description:string;image:string};
export const collections:Collection[]=[
{slug:"tote-bags",name:"Tote Bags",description:"Structured silhouettes for workdays, weekends and everything between.",image:"/images/collections/tote-bags.jpg"},
{slug:"shoulder-bags",name:"Shoulder Bags",description:"Effortless shapes designed to sit beautifully from day to night.",image:"/images/collections/shoulder-bags.jpg"},
{slug:"crossbody-bags",name:"Crossbody Bags",description:"Hands-free essentials with a refined, everyday attitude.",image:"/images/collections/crossbody-bags.jpg"},
{slug:"mini-bags",name:"Mini Bags",description:"Small silhouettes with a distinctly elevated presence.",image:"/images/collections/top-handle-bags.jpg"},
{slug:"evening-bags",name:"Evening Bags",description:"Polished companions for dinners, celebrations and after-dark moments.",image:"/images/collections/tote-bags.jpg"},
{slug:"work-bags",name:"Work Bags",description:"Elegant capacity for the pace of modern work.",image:"/images/products/classic-tote-1.jpg"}];
const a={
classic:"/images/products/classic-tote-1.jpg",
classic2:"/images/products/classic-tote-2.jpg",
shoulder:"/images/products/shoulder-2.jpg",
luna:"/images/products/luna-shoulder-1.jpg",
crossbody:"/images/products/crossbody-2.jpg",
mini:"/images/products/mini-crossbody-1.jpg",
top:"/images/products/top-handle-2.jpg",
elise:"/images/products/elise-top-handle-1.jpg"
};
export const products:Product[]=[
{id:"classic-tote",slug:"classic-tote",name:"The Classic Tote",price:189,category:"Tote Bags",categorySlug:"tote-bags",image:a.classic,images:[a.classic,a.classic2,a.classic],description:"A timeless structured tote with enough room for the essentials and a refined silhouette that works from office hours to evening plans.",colors:[{name:"Cognac",hex:"#8b5f3d"},{name:"Black",hex:"#252525"}],material:"Premium vegan leather",dimensions:"32 × 25 × 13 cm",badge:"Best Seller"},
{id:"everyday-carryall",slug:"everyday-carryall",name:"Everyday Carryall",price:165,category:"Tote Bags",categorySlug:"tote-bags",image:a.luna,images:[a.luna,a.classic,a.top],description:"An easy, generous carryall with a softly structured shape and understated hardware.",colors:[{name:"Sand",hex:"#c6b39f"},{name:"Mocha",hex:"#8a6247"}],material:"Textured vegan leather",dimensions:"36 × 28 × 14 cm"},
{id:"luxe-work-tote",slug:"luxe-work-tote",name:"Luxe Work Tote",price:209,category:"Work Bags",categorySlug:"work-bags",image:a.classic2,images:[a.classic2,a.classic,a.shoulder],description:"A polished work companion designed around a spacious interior and clean architectural lines.",colors:[{name:"Espresso",hex:"#684a37"},{name:"Black",hex:"#242424"}],material:"Smooth vegan leather",dimensions:"39 × 30 × 13 cm",badge:"New"},
{id:"soft-slouch-tote",slug:"soft-slouch-tote",name:"Soft Slouch Tote",price:179,category:"Tote Bags",categorySlug:"tote-bags",image:a.shoulder,images:[a.shoulder,a.luna,a.classic],description:"A relaxed, tactile tote with a softly draped profile and effortless everyday appeal.",colors:[{name:"Oat",hex:"#ded4c9"},{name:"Black",hex:"#252525"}],material:"Soft grain vegan leather",dimensions:"34 × 27 × 12 cm"},
{id:"mila-shoulder",slug:"mila-shoulder",name:"Mila Shoulder Bag",price:159,category:"Shoulder Bags",categorySlug:"shoulder-bags",image:a.shoulder,images:[a.shoulder,a.luna,a.classic],description:"A softly curved shoulder bag with a clean strap and compact, polished proportions.",colors:[{name:"Black",hex:"#252525"},{name:"Stone",hex:"#b9aa9a"}],material:"Premium vegan leather",dimensions:"27 × 18 × 8 cm"},
{id:"noa-crossbody",slug:"noa-crossbody",name:"Noa Crossbody",price:139,category:"Crossbody Bags",categorySlug:"crossbody-bags",image:a.crossbody,images:[a.crossbody,a.mini,a.shoulder],description:"A compact crossbody designed for hands-free days and easy evenings.",colors:[{name:"Camel",hex:"#9a6c4a"},{name:"Black",hex:"#252525"}],material:"Textured vegan leather",dimensions:"23 × 16 × 7 cm"},
{id:"luna-mini",slug:"luna-mini",name:"Luna Mini",price:129,category:"Mini Bags",categorySlug:"mini-bags",image:a.mini,images:[a.mini,a.crossbody,a.elise],description:"A petite statement piece for evenings when you only need the essentials.",colors:[{name:"Ivory",hex:"#eee7dd"},{name:"Camel",hex:"#9a6c4a"}],material:"Smooth vegan leather",dimensions:"19 × 13 × 6 cm"},
{id:"celine-evening",slug:"celine-evening",name:"Celine Evening Bag",price:149,category:"Evening Bags",categorySlug:"evening-bags",image:a.elise,images:[a.elise,a.mini,a.crossbody],description:"A refined evening silhouette finished with a discreet chain for elegant occasions.",colors:[{name:"Chocolate",hex:"#5c4030"},{name:"Black",hex:"#202020"}],material:"Satin-touch vegan leather",dimensions:"22 × 14 × 6 cm"}];
export const bestSellers=products.slice(0,4);
export function getCollection(slug:string){return collections.find(x=>x.slug===slug)}
export function getProduct(slug:string){return products.find(x=>x.slug===slug)}

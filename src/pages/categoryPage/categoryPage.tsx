// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import AsideNav from "../../components/asideNav/asideNav";
// import Bradscubs from "../../components/breadcubs/breadcubs";
// import ProductsCatalog from "../../components/productCatalog/productCatalog";
// import ProductsViewed from "../../components/productsViewed/productViewed";
// import Partners from "../../components/partners/index";
// import LayoutDefault from "../../layout/layoutDefault/layoutDefault";
// import { ROUTES } from "../../models/constant";
// import HeaderDefault from "../../layout/headerDefault/headerDefault";
// import FooterDefault from "../../layout/footerDefault/footerDefault";

// interface Category {
//   id: number;
//   name: string;
// }

// interface Bradscub {
//   id: number;
//   link?: string;
//   name: string;
//   active?: boolean;
// }

// const categories: Category[] = [
//   {
//     id: 1,
//     name: "Геотекстиль",
//   },
//   {
//     id: 2,
//     name: "Пленки, мембраны, ленты, клеи",
//   },
//   {
//     id: 3,
//     name: "Утеплители универсальные",
//   },
//   {
//     id: 4,
//     name: "Пароизоляция для дома",
//   },
//   {
//     id: 5,
//     name: "Гидроизоляция для дома",
//   },
//   {
//     id: 6,
//     name: "Техническая изоляция",
//   },
//   {
//     id: 7,
//     name: "Утеплители для дома",
//   },
// ];

// const bradscubs: Bradscub[] = [
//   {
//     id: 1,
//     link: ROUTES.main,
//     name: "Главная страница",
//   },
//   {
//     id: 2,
//     link: ROUTES.catalog + "/a",
//     name: "Каталог стройматериалов",
//   },
//   {
//     id: 3,
//     link: ROUTES.catalog + "/a",
//     name: "Стройматериалы",
//   },
//   {
//     id: 4,
//     name: "Изоляционные материалы",
//     active: true,
//   },
// ];

// const CategoryPage: React.FC = () => {
//   // const {useCategoriesId,useSetCategoriesId} = useState()

//   return (
//     <div className="wrapper__inner">
//       <div className="text_page fav catalog">
//         <div className="container row">
//           <AsideNav />
//           <div>
//             <HeaderDefault />
//             <div className="col-9 col-sm-12"></div>
//             <div className="text_page_top">
//               <h1>
//                 Изоляционные <b>материалы</b>
//               </h1>
//               <Bradscubs bradscubs={bradscubs} />
//             </div>
//             <div className="subsection row">
//               {categories.map((category) => (
//                 <Link
//                   key={category.id}
//                   className="subsection_item"
//                   to={`${ROUTES.catalog}/${category.id}`}
//                 >
//                   {category.name}
//                 </Link>
//               ))}
//             </div>
//             {/* <ProductsCatalog /> */}
//             <div className="catalog_b_inf">
//               <div className="container row">
//                 <div className="col-9 col-sm-12">
//                   <ProductsViewed />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Partners />
//       <FooterDefault />
//     </div>
//   );
// };

// export default CategoryPage;
export {};

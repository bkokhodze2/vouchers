import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useEffect, useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Image from "next/image";
import Button from "../../components/UI/button";

export default function Wishlist({}: any) {
  const baseApi = process.env.baseApi;
  const [vouchers, setVouchers] = useState<[]>([]);
  const favourites = useSelector((state: any) => state.favourites);

  console.log("favourites", favourites)

  const Router = useRouter();


  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="Company"/>
        </Head>


        <div className={"container m-auto mt-8 mb-[100px]"}>

          <p className={"text-[#383838] text-[28px] font-bold mb-4"}>
            Wishlist
          </p>
          {favourites?.favouritesList.length > 0 ?
              <div className={"container m-auto grid grid-flow-row-dense grid-cols-4 gap-[30px] gap-y-[40px]"}>

                {favourites?.favouritesList.map((item: any, index: number) => {
                  return <OfferItem data={item} key={index}/>
                })}

              </div> : <div
                  className={"mt-9 container m-auto w-full max-w-[490px] flex justify-center items-center flex flex-col "}>
                <div className={"max-w-[250px]"}>
                  <Image src={IMAGES.notFound}
                         quality={60}
                         blurDataURL={IMAGES.placeholder.src}
                         placeholder="blur"
                         loading={"lazy"}
                         alt={"not found image"}
                         style={{objectFit: "cover"}}/>
                </div>
                <p className={"!uppercase mt-10 text-[#383838] text-[28px] font-bold "}>wishlist is empty</p>
                <div onClick={() => Router.push('/')}>
                  <Button bgColor={"#383838"} textColor={"white"} text={"Back to home"} classes={"mt-6"}/>
                </div>

              </div>
          }

        </div>
      </>
  )
}


Wishlist.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//
//   const response = await fetch(`${baseApi}/vouchers?contractId=662&name=${query.slug}`);
//   // const response = await fetch(`https://vouchers.pirveli.ge/api/racoon-transactions/vouchers?contractId=662&name=${query.slug}`);
//
//   const data = await response.json();
//   let serverData = data;
//
//   return {
//     props: {
//       serverData,
//     },
//   };
// }

import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import React, {useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Image from "next/image";
import Button from "../../components/UI/button";

export default function Wishlist({}: any) {
  const baseApi = process.env.baseApi;
  const [vouchers, setVouchers] = useState<[]>([]);
  const favourites = useSelector((state: any) => state.favourites);

  const Router = useRouter();

  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="Company"/>
        </Head>


        <div className={"container m-auto mt-8 mb-[100px]"}>

          <p className={"text-[#383838] text-[28px] font-bold mb-4 aveSofBold"}>
            Wishlist
          </p>


          {favourites?.favouritesList.length > 0 ?
              <div
                  className={"mt-4 grid grid-flow-row-dense grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-5 md:gap-y-[42px] md:gap-x-[30px]"}>

                {
                  favourites?.favouritesList.map((item: any, index: number) => {
                    return <OfferItem data={item} key={index}/>
                  })
                }

              </div> : <div
                  className={"mt-9 m-auto w-full max-w-[490px] flex justify-center items-center flex flex-col "}>
                <div className={"max-w-[250px]"}>
                  <Image src={IMAGES.notFound}
                         quality={60}
                         blurDataURL={IMAGES.placeholder.src}
                         placeholder="blur"
                         loading={"lazy"}
                         alt={"not found image"}
                         style={{objectFit: "cover"}}/>
                </div>
                <p className={"!uppercase mt-10 text-[#383838] text-[28px] font-bold aveSofBold"}>wishlist is empty</p>
                <div onClick={() => Router.push('/')}>
                  <Button bgColor={"#383838"} textColor={"white"} text={"Back to home"} classes={"mt-6 aveSofRegular"}/>
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

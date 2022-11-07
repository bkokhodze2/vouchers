import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useEffect, useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "../../components/UI/button";
import axios from "axios";

export default function Search({serverData}: any) {
  const baseApi = process.env.baseApi;
  const [vouchers, setVouchers] = useState<[]>([]);

  const Router = useRouter();
  const [isResult, setIsResult] = useState(true);

  let slug = Router?.query.slug;


  useEffect(() => {

    if (slug) {
      axios.get(`${baseApi}/vouchers?contractId=662&name=${slug}`).then((res) => {
        setVouchers(res.data)
      })
    }

  }, [Router.query.slug])


  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="Company"/>
        </Head>

        <div className={""}>

          <div className={"container m-auto mt-8 mb-[100px]"}>

            {vouchers.length > 0 ? <>
              <p className={"text-[#383838] text-[28px] font-bold mb-4"}>
                Search result “<span className={"text-purple"}>{Router.query.slug}</span>”
              </p>
              <div className={"container m-auto grid grid-flow-row-dense grid-cols-4 gap-[30px] gap-y-[40px]"}>

                {vouchers?.map((item: any, index: number) => {
                  return <OfferItem data={item} key={index}/>
                })}

              </div>
            </> : <div
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
              <p className={"uppercase mt-10 text-[#383838] text-[28px] font-bold"}>no result found</p>
              <p className={"mt-6 text-base text-[#38383899] text-center"}>We’ve searched more than 350 hotels we did
                not find any hotels for your search.</p>

              <div onClick={() => Router.push('/')}>
                <Button bgColor={"#383838"} textColor={"white"} text={"Back to home"} classes={"mt-6"}/>
              </div>

            </div>
            }

          </div>


        </div>
      </>
  )
}


Search.getLayout = function getLayout(page: any) {
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

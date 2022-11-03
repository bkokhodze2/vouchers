import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "../../components/UI/button";

export default function Success() {

  const Router = useRouter();
  const [isResult, setIsResult] = useState(true);

  return (
      <>
        <Head>
          <title>success page</title>
          <meta name="description" content="Company"/>
        </Head>

        <div className={"bg-[white]"}>

          <div className={"container m-auto mt-8 mb-[100px]"}>
            <div
                className={"mt-9 container m-auto w-full max-w-[490px] flex justify-center items-center flex flex-col "}>
              <div className={"max-w-[250px]"}>

                <Image
                    src={IMAGES.thank}
                    quality={70}
                    blurDataURL={IMAGES.placeholder.src}
                    placeholder="blur"
                    priority={true}
                    alt={"not found image"}
                    style={{objectFit: "cover"}}/>
              </div>

              <div onClick={() => Router.push('/')}>
                <Button bgColor={"#383838"} textColor={"white"} text={"Back to home"} classes={"mt-6"}/>
              </div>

            </div>

          </div>


        </div>
      </>
  )
}


Success.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//   // const response = await fetch(`${baseApi}/company/${query.slug}`);
//
//   // const data = await response.json();
//   // let serverData = data.data;
//   let serverData = [1, 2, 3];
//
//   return {
//     props: {
//       serverData,
//     },
//   };
// }

import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import React, {useEffect, useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import Image from "next/image";
import OfferSlider from "../../components/UI/slider/offer-slider";
import axios from "axios";
import {Form, Select} from "antd";
import PulseLoader from "react-spinners/PulseLoader";
import FreeScroll from "../../components/UI/slider/free-scroll";

export default function Category({serverData}: any) {
  const baseApi = process.env.baseApi;
  const [vouchers, setVouchers] = useState<[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [promo, setPromo] = useState<any>([]);

  const Router = useRouter();

  const [filterForm] = Form.useForm();

  const {Option} = Select;


  useEffect(() => {
    setIsLoading(true)

    if (Router?.query?.id) {
      axios.get(`${baseApi}/vouchers?contractId=662&categoryId=${Router?.query?.id}&limit=100&isValid=true`).then((res) => {
        setVouchers(res.data)
        setIsLoading(false)
      })
    }

    if (!!promo && Router?.query?.id) {
      axios
          .get(`${baseApi}/vouchers?contractId=662&categoryId=${Router?.query?.id}&isPromo=1&limit=999&isValid=true`)
          .then((res) => {
            setPromo(res.data)
          });
    }

  }, [Router?.query?.id])

  const onFinish = (values: any) => {
  };

  // @ts-ignore
  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="Company"/>
        </Head>

        <div className={""}>

          {isLoading && <div className={"w-full flex justify-center items-center flex-col mt-16 mb-10"}>
						<img className={"h-[250px] w-auto"} src={IMAGES.gif.src} style={{objectFit: "cover"}}
						     alt={"skeleton animation"}/>
						<div className={"flex items-end mt-10"}>
							<p className={"text-[#383838] text-[24px]"}>Loading</p>
							<PulseLoader size={5} color="#383838" speedMultiplier={0.7} className={"mb-1.5 ml-1.5 "}/>
						</div>

					</div>
          }

          <div className={"m-auto  mt-4 ph:mt-8 pb-[100px]"}>


            {promo.length > 0 &&
								<div className={"flex flex-col mt-[44px] md:mt-[40px]"}>
									<div className={"sm:container h-min con pl-0px ph:p-auto ph:m-auto w-full"}>
										<h1
												className={"text-[18px] pl-3 sm:pl-0 m-auto sm:text-[28px] text-[#383838] font-bold aveSofBold"}>Popular
											offers</h1>
										<div className={"mt-4"}>
											<OfferSlider data={promo}/>
											<FreeScroll data={promo} miniHeight={true}/>
										</div>
									</div>
								</div>}


            {/*<div className={"h-[60px] bg-[black] mt-[54px] flex justify-between"}>*/}
            {/*  <div className={"flex"}>*/}
            {/*    <Form*/}
            {/*        form={filterForm}*/}
            {/*        name="validate_other"*/}
            {/*        onFinish={onFinish}*/}
            {/*        initialValues={{}}*/}

            {/*    >*/}
            {/*      <Form.Item*/}
            {/*          name="select"*/}
            {/*          className={"w-[100px]"}*/}
            {/*      >*/}
            {/*        <Select*/}
            {/*            mode="tags"*/}
            {/*            showSearch={false}*/}
            {/*            placeholder="Please select favourite colors"*/}
            {/*            maxTagCount={1}*/}
            {/*            tagRender={() => <p>1</p>}*/}
            {/*        >*/}
            {/*          <Option value="red">Red</Option>*/}
            {/*          <Option value="green">Green</Option>*/}
            {/*          <Option value="blue">Blue</Option>*/}
            {/*        </Select>*/}
            {/*      </Form.Item>*/}

            {/*    </Form>*/}
            {/*  </div>*/}

            {/*  <div></div>*/}
            {/*</div>*/}

            <div className={"m-auto container mt-[20px] hidden sm:flex"}>
              <Image
                  src={IMAGES.banner}
                  quality={70}
                  blurDataURL={IMAGES.placeholder.src}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"banner"}
              />
            </div>

            <div className={"mb-[114px] container m-auto mt-[44px] w-full flex sm:hidden relative"}>
              <img
                  src={IMAGES.mobileBanner.src}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"banner"}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                  }}
              />

            </div>

            <div
                className={"mt-[40px] container m-auto mt-4 grid grid-flow-row-dense grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 xl:gap-[30px]"}>
              {
                vouchers?.map((item: any, index: any) => {
                  return <OfferItem data={item} key={index}/>
                })
              }
            </div>

          </div>

        </div>
      </>
  )
}


Category.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//   const response = await fetch(`${baseApi}/vouchers?contractId=662&categoryId=${query.id}`);
//
//   const serverData = await response.json();
//
//   console.log("data", serverData)
//
//   // let serverData = [1, 2, 3];
//
//   return {
//     props: {
//       serverData,
//     },
//   };
// }

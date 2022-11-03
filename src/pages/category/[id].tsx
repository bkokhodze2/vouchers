import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useEffect, useState} from "react";
import OfferItem from "../../components/blocks/offer-item";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "../../components/UI/button";
import OfferSlider from "../../components/UI/slider/offer-slider";
import axios from "axios";
import {Form, Select} from "antd";
import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";

export default function Category({serverData}: any) {
  const baseApi = process.env.baseApi;
  const [vouchers, setVouchers] = useState<[]>([])
  const [isLoading, setIsLoading] = useState(true);


  const Router = useRouter();

  const [filterForm] = Form.useForm();

  const {Option} = Select;


  useEffect(() => {
    setIsLoading(true)

    if (Router?.query?.id) {
      axios.get(`${baseApi}/vouchers?contractId=662&categoryId=${Router?.query?.id}`).then((res) => {
        setVouchers(res.data)
        setIsLoading(false)
      })
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

          {isLoading && <div className={"container m-auto flex justify-center mt-16 mb-10"}>
            <div >
							<RingLoader
									color="#8338EC"
									size={80}
									speedMultiplier={1}
							/>
							<div className={"flex items-end mt-10"}>
								<p className={"text-[#383838] text-[24px]"}>Loading</p>
								<PulseLoader size={5} color="#383838" speedMultiplier={0.7} className={"mb-1.5 ml-1.5 "}/>
							</div>
            </div>

					</div>
          }

          <div className={"container m-auto mt-8 pb-[100px]"}>

            {vouchers.length > 0 && !isLoading && <div className={"flex flex-col w-full category"}>
							<div className={"container m-auto"}>
								<h1 className={"text-[28px] text-[#383838] font-bold"}>Popular</h1>
								<div className={"mt-4"}>
									<OfferSlider nav={true} data={vouchers}/>
								</div>
							</div>
						</div>

            }

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

            <div className={"container m-auto mt-[20px]"}>
              <Image
                  src={IMAGES.banner}
                  quality={70}
                  blurDataURL={IMAGES.banner.src}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"banner"}
              />
            </div>

            <div className={"container mt-[40px] m-auto grid grid-flow-row-dense grid-cols-4 gap-[30px] gap-y-[40px]"}>
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

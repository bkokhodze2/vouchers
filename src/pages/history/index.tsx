import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Button from "../../components/UI/button";
import {Form, Modal, Input, Rate} from "antd";
import axios from "axios";


export default function History({serverData}: any) {
  const baseApi = process.env.baseApi;

  const [vouchers, setVouchers] = useState<[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [commentForm] = Form.useForm();
  const {TextArea} = Input;


  useEffect(() => {
    axios.get(`${baseApi}/vouchers?contractId=662&providerId=${63}`).then((res) => {
      setVouchers(res.data)
    })


  }, [])


  const handleCancel = () => {
    commentForm.resetFields();
    setIsModalOpen(false);
  };
  const onFinishComment = (values: object) => {


  }

  const HistoryItem = ({evaluated}: any) => {
    const [isEvaluated, setIsEvaluated] = useState<boolean>(evaluated)

    return <div
        className={"md:p-6 p-4 md:pr-[30px] flex flex-col ph:flex-row md:flex-col md:gap-0 gap-[18px] bg-[#F7F7F7] rounded-0 md:rounded-2xl"}>
      <div
          className={"md:order-1 order-2 w-full ph:w-[50%] md:w-full flex mb-0 md:mb-[30px] gap-[15px] md:gap-[0px] flex-col md:flex-row md:justify-between"}>
        <div className={"flex flex-row md:flex-col items-center md:items-start xl:w-[200px]"}>
          <p className={"text-[#38383899] "}>Order Id</p>
          <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>sdsd</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899] "}>Date</p>
          <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>20.10.2022</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899] "}>Quantity</p>
          <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>1</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899] "}>Price</p>
          <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>$ 150</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899] "}>Sum</p>
          <span className={"md:text-base text-sm ml-[6px] md:ml-0 text-purple"}>P 1 500</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899]"}>Earn Point</p>
          <span className={"text-[#56971F] md:text-base text-sm ml-[6px] md:ml-0"}>0</span>
        </div>
        <div className={"flex flex-row md:flex-col items-center md:items-start "}>
          <p className={"text-[#38383899] "}>Voucher Code</p>
          <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0 font-bold"}>234569</span>
        </div>

      </div>

      <div className={"md:order-2 order-1 w-full ph:w-[50%] md:w-full flex flex-col md:flex-row"}>

        <div
            className={"w-full flex max-w-full min-w-full min-h-full ph:max-w-[150px] ph:max-h-[200px] ph:min-h-[114px] md:max-w-[240px] md:min-w-[240px] md:max-h-[150px] md:mr-[30px]"}>
          <img src={IMAGES.offerItem.src}
               placeholder="blur"
               alt={"product image"}
               className={"rounded-xl"}
               style={{objectFit: "cover"}}
          />
        </div>

        <div className={"flex flex-col md:flex-row justify-between items-start md:items-center w-full"}>
          <div className={"flex flex-col"}>
            <h2 className={"text-[#383838] font-bold md:text-[22px] text-base mt-4 md:mt-0"}>ASSA RESTAURANT</h2>
            <p className={"text-base mt-2 text-[#38383899] max-w[464px] hidden md:flex"}>From 80 lari, hotel apartments
              in
              the Orbi
              hotel network
              in Batumi</p>
          </div>

          <div className={"ml-0 md:ml-[30px] md:mt-0 mt-2"}>

            {
              isEvaluated ? <Rate disabled defaultValue={4} className={"text-[16px] min-w-[120px] h-[20px] mb-1.5"}/> :
                  <div onClick={() => {
                    setIsModalOpen(true)
                  }}>
                    <Button classes={"hidden md:flex"} bgColor={"#383838"} text={"Add Review"} textColor={"white"}/>
                    <p className={"text-[#8338EC] text-base underline flex md:hidden"}>Add review</p>
                  </div>
            }

          </div>

        </div>
      </div>

    </div>
  }

  return (
      <>

        <Head>
          <title>order history page</title>
          <meta name="description" content="order history page"/>
        </Head>
        <Modal
            className={"reviewModal"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={""}
            title={""}

            width={620}>

          <div className={"flex p-6 bg-[#d9d9d933] rounded-[16px]"}>
            <div className={"w-full max-w-[125px] max-h-[84px] mr-4 relative"}>
              <Image src={IMAGES.offerItem}
                     quality={70}
                     blurDataURL={IMAGES.placeholder.src}
                     placeholder="blur"
                     priority={true}
                     alt={"product image"}
                     className={"rounded-xl"}
                     style={{objectFit: "cover"}}
              />
              {/*<div*/}
              {/*    className={"absolute top-[8px] left-[8px] z-20 flex justify-center items-center bg-[#E35A43] rounded-[100px] h-[25px]"}>*/}
              {/*  <p className={"text-[white] text-[12px] px-[12px]"}>- 50 USD</p>*/}
              {/*</div>*/}
            </div>
            <div>
              <p className={"text-[#383838b3] text-base leading-[16px]"}>#45678</p>
              <h3 className={"text-[#383838] font-bold text-[18px leading-[18px]"}>Campus Alba Castello Mare Hotel &
                Wellness Resort</h3>
              <p className={"text-[#38383899] mt-[8px] text-[14px] leading-[17px]"}>Room for 2 guests from Campus Alba
                Castello Mare Hotel & Wellness Resort!</p>
            </div>

          </div>
          <Form
              form={commentForm}
              onFinish={onFinishComment}
              className={"p-6 pb-[32px] pt-[18px]"}>

            <Form.Item name={"rate"} className={"flex justify-center"}>
              <Rate className={"text-[27px]"}/>
            </Form.Item>

            <Form.Item name={"comment"}>
              <TextArea rows={4} placeholder={"Add Comment"}
                        className={"bg-[#d9d9d91a] rounded-[16px] border-none p-5"}/>
            </Form.Item>

            <div className={"flex justify-end mt-6 items-center"}>
              <p className={"mr-10 text-[#383838] cursor-pointer"} onClick={handleCancel}>Cancel</p>
              <button type={"submit"}
                      className={"flex justify-center items-center rounded-xl bg-purple py-4 px-10 cursor-pointer"}>
                <p className={"text-[white]"}>Add Review</p>
              </button>
            </div>

          </Form>

        </Modal>

        <div className={""}>
          <div
              className={"grid grid-rows-1 ph:pt-8 pt-0 pb-[100px] grid-cols-1 lg:grid-cols-4 md:container m-auto grid-flow-col gap-4 ph:gap-[30px]"}>

            {/*company info*/}
            <div className={"rounded-xl hidden lg:flex w-full"}>
              <div className={"sticky top-[150px] max-h-[calc(100vh_-_2rem)] w-full overflow-scroll rounded-xl"}>
                <div className={"h-[160px] w-full relative bg-[#d9d9d933] rounded-t-xl "}>
                  <Image src={IMAGES.company}
                         quality={70}
                         blurDataURL={IMAGES.placeholder.src}
                         priority={true}
                         alt={"company image"}
                         style={{objectFit: "cover"}}
                         layout={"fill"}
                         className={"rounded-t-xl"}/>

                  <div className={"flex justify-center items-center w-full z-10 absolute -bottom-[40px]"}>
                    <Image src={IMAGES.detailsImg}
                           quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           priority={true}
                           alt={"company logo"}
                           width={104}
                           height={104}
                           className={"z-10"}/>
                  </div>
                </div>
                <div className={"pt-[60px] px-6 pb-4 bg-[#d9d9d933] rounded-b-xl"}>
                  <p className={"text-[22px] font-bold text-[#383838] text-center capitalize"}>vano tvauri</p>
                </div>
              </div>
            </div>
            {/*company info*/}

            <div className={"col-span-1 md:col-span-3"}>
              <h2 className={"capitalize text-[#383838] text-[28px] font-bold leading-[28px] hidden ph:flex"}>order
                history</h2>
              <div
                  className={"mt-0 ph:mt-4 w-full bg-white rounded-[16px] space-y-[16px] ph:space-y-[30px] flex flex-col"}>
                {[1, 2, 3, 4, 5, 6].map((e, index) => {
                  return <HistoryItem key={index} evaluated={index % 2 == 0}/>
                })}
              </div>
            </div>

          </div>
        </div>
      </>
  )
}


History.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}



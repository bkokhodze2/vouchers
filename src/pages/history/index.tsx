import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import Image from "next/image";
import React, {useState} from "react";
import Button from "../../components/UI/button";
import Rate from "antd/lib/rate";
import {Form, Modal, Input} from "antd";


export default function History({serverData}: any) {
  const [vouchers, setVouchers] = useState<[]>(serverData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [commentForm] = Form.useForm();
  const {TextArea} = Input;

  const handleCancel = () => {
    commentForm.resetFields();
    setIsModalOpen(false);
  };
  const onFinishComment = (values: object) => {

    console.log("values", values)

  }

  const HistoryItem = ({evaluated}: any) => {
    const [isEvaluated, setIsEvaluated] = useState<boolean>(evaluated)

    return <div className={"p-6 pr-[30px] flex flex-col bg-[white] rounded-2xl"}>

      <div className={"flex mb-[30px] justify-between"}>
        <div className={"flex flex-col w-[200px]"}>
          <p className={"text-[#38383899] "}>Order Id</p>
          <span className={"text-[#383838] text-base"}>sdsd</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Date</p>
          <span className={"text-[#383838] text-base"}>20.10.2022</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Quantity</p>
          <span className={"text-[#383838] text-base"}>1</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Price</p>
          <span className={"text-[#383838] text-base"}>$ 150</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Sum</p>
          <span className={"text-[#383838] text-base text-purple"}>P 1 500</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Earn Point</p>
          <span className={"text-[#383838] text-base"}>0</span>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-[#38383899] "}>Voucher Code</p>
          <span className={"text-[#383838] text-base font-bold"}>234569</span>
        </div>

      </div>

      <div className={"flex"}>

        <div className={"w-full max-w-[240px] max-h-[150px] mr-[30px]"}>
          <Image src={IMAGES.offerItem} alt={"product image"} className={"rounded-xl"}
                 style={{objectFit: "cover"}}/>
        </div>

        <div className={"flex justify-between items-center w-full"}>
          <div className={"flex flex-col"}>
            <h2 className={"text-[#383838] font-bold text-[22px]"}>ASSA RESTAURANT</h2>
            <p className={"text-base mt-2 text-[#38383899] max-w[464px]"}>From 80 lari, hotel apartments in
              the Orbi
              hotel network
              in Batumi</p>
          </div>

          <div className={"ml-[30px]"}>

            {
              isEvaluated ? <Rate disabled defaultValue={4} className={"text-[16px] h-[20px] mb-1.5"}/> :
                  <div onClick={() => {
                    setIsModalOpen(true)
                  }}>
                    <Button bgColor={"#383838"} text={"Add Review"} textColor={"white"}/>
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
              <Image src={IMAGES.offerItem} alt={"product image"} className={"rounded-xl"}
                     style={{objectFit: "cover"}}/>
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

        <div className={"bg-[#F5F6F8]"}>
          <div
              className={"grid grid-rows-1 pt-8 pb-[100px] grid-cols-4 container m-auto grid-flow-col gap-[30px]"}>

            {/*company info*/}
            <div className={"rounded-xl"}>
              <div className={"sticky top-[150px] max-h-[calc(100vh_-_2rem)] overflow-scroll rounded-xl"}>
                <div className={"h-[160px] w-full relative bg-[#d9d9d933] rounded-t-xl "}>
                  <Image src={IMAGES.company} alt={"company image"} style={{objectFit: "cover"}} layout={"fill"}
                         className={"rounded-t-xl"}/>

                  <div className={"flex justify-center items-center w-full z-10 absolute -bottom-[40px]"}>
                    <Image src={IMAGES.detailsImg} alt={"company logo"} width={104} height={104}
                           className={"z-10"}/>
                  </div>
                </div>
                <div className={"pt-[60px] px-6 pb-4 bg-[#d9d9d933] rounded-b-xl"}>
                  <p className={"text-[22px] font-bold text-[#383838] text-center capitalize"}>vano tvauri</p>
                </div>
              </div>
            </div>
            {/*company info*/}

            <div className={"col-span-3"}>
              <h2 className={"capitalize text-[#383838] text-[28px] font-bold leading-[28px]"}>order history</h2>
              <div className={"mt-4 w-full bg-white rounded-[16px] space-y-[30px] flex flex-col"}>
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

export async function getServerSideProps({query}: any) {

  const baseApi = process.env.baseApi;
  const response = await fetch(`${baseApi}/vouchers?contractId=662&providerId=${63}`);
  const serverData = await response.json();

  return {
    props: {
      serverData,
    },
  };
}

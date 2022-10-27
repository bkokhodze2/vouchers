import type {NextPage} from 'next'
import Layout from "../../../../../components/layouts/user-layout"
import Head from 'next/head'
import {notification} from 'antd';

import type {CheckboxChangeEvent} from 'antd/es/checkbox';
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import GalleryScroll from "../../../../../components/blocks/gallery-scroll";
import Comment from "../../../../../components/blocks/comment";
import Phone from '../../../../../../public/images/icons/phone';
import Watch from "../../../../../../public/images/icons/watch";
import Location from "../../../../../../public/images/icons/location";
import InStock from "../../../../../components/UI/in-stock";
import Button from "../../../../../components/UI/button";
import Quantity from "../../../../../components/UI/quantity";
import Tabs from "antd/lib/tabs";
import Link from "next/link";
import axios from "axios";
import router, {useRouter} from "next/router";
import OfferSlider from "../../../../../components/UI/slider/offer-slider";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";

import {
  addToCartWithQuantity,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../../../../components/slices/cartSlice";

const CountDown = dynamic(
    () => import("../../../../../components/UI/count-down"),
    {ssr: false}
)


export default function Details({serverOffer, serverVoucher}: any) {
  const Router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [isWithMoney, setIsWithMoney] = useState(true);

  const [quantity, setQuantity] = useState<number>(1)

  const baseApi = process.env.baseApi;

  console.log("cart", cart)

  const handleAddToCart = (product: any) => {
    product.quantity = quantity;
    product.isPoint = !isWithMoney;

    dispatch(addToCartWithQuantity(product));

    // Router.push('/cart')

    notification['success']({
      message: 'item successfully add',

    });

  };

  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart({}));
  };

  // @ts-ignore
  let slugVoucher = Router?.query.slugVoucher?.replaceAll('-', ' ');
  // @ts-ignore
  let slug = Router?.query.slug?.replaceAll('-', ' ');

  // let slug = Router?.query.slug.replaceAll('-', ' ');

  useEffect(() => {
    axios(`${baseApi}/vouchers?contractId=662&providerName=${slug}&voucherName=${slugVoucher}`).then((res) => {
    })
  }, [])

  const getCount = (count: number) => {
  }

  const RightSide = () => {

    return <div className={"h-full"}>

      <div className={"bg-[#d9d9d933] rounded-xl p-8"}>

        <div className={"grid grid-cols-2 grid-rows-1 bg-[white] w-full h-[48px] rounded-xl p-1"}>

          <div onClick={() => {
            setIsWithMoney(true)
          }}
               className={"flex w-full rounded-[10px] justify-center items-center cursor-pointer"}
               style={{backgroundColor: isWithMoney ? "#8338EC" : "transparent"}}>
            <span className={" text-[20px] font-[500] mr-2"}
                  style={{color: isWithMoney ? "#FFFFFF" : "#383838"}}>$</span>
            <p className={"text-[white] text-base"} style={{color: isWithMoney ? "#FFFFFF" : "#383838"}}>with money</p>
          </div>

          <div onClick={() => {
            setIsWithMoney(false)
          }}
               className={"flex w-full rounded-[10px] justify-center items-center cursor-pointer"}
               style={{backgroundColor: !isWithMoney ? "#8338EC" : "transparent"}}>
            <span className={" text-[20px] font-[500] mr-2"}
                  style={{color: !isWithMoney ? "#FFFFFF" : "#383838"}}>P</span>
            <p className={" text-base"} style={{color: !isWithMoney ? "#FFFFFF" : "#383838"}}>with point</p>
          </div>

        </div>
        <div className={"grid grid-cols-2 grid-rows-1 gap-1 gap-x-[30px] gap-y-6 mt-8"}>

          <div className={"bg-[white] py-2 pl-[28px] rounded-xl flex h-min"}>
            <div className={"min-w-[10px] flex items-center"}>
              <Image src={ICONS.dollar} className={"cursor-pointer "} alt={"share icon"}/>
            </div>
            <div className={"flex flex-col ml-[28px]"}>
              <p className={"text-[#383838] text-base"}>Voucher price</p>
              <div className={"flex flex-nowrap items-center"}>
                {
                  isWithMoney ?
                      <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>$ {serverVoucher[0]?.entries[0]?.entryAmount}</p> :
                      <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>{serverVoucher[0]?.entries[0]?.entryAmount * serverVoucher[0]?.entries[0]?.multiplier}</p>
                }

                {/*<p className={"ml-3 text-base text-[#38383899] whitespace-nowrap line-through"}>200 $</p>*/}
              </div>
            </div>
          </div>

          <div className={"flex justify-center items-center w-full h-[68px] bg-[white] rounded-xl px-5"}>
            {/*<Quantity getCount={getCount} data={serverVoucher} currentQuantity={1}/>*/}

            <div className={"rounded-xl bg-[#EEEEEE] h-[48px] w-full flex items-center"}>
              <div className={"rounded-[10px] bg-[white] h-full w-full py-1 px-[10px] flex items-center"}>
                <div onClick={() => setQuantity((prevState: number) => prevState - 1)}
                     className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
                  <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#EEEEEE]"}/>
                </div>
                <div className={"flex flex-col w-full justify-center items-center text-center"}>
                  <p className={"text-[#383838] text-base"}>Quantity</p>
                  <p className={"text-[#383838] text-base font-bold"}>{quantity}</p>
                </div>
                <div onClick={() => setQuantity((prevState: number) => prevState + 1)}
                     className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
                  <div
                      className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838] after:content-[''] after:min-w-[12.5px] after:h-[1.5px] after:bg-[#383838] after:rounded after:rotate-90 after:absolute"}/>
                </div>
              </div>
            </div>

          </div>

        </div>
        {/*/!*save & share*!/*/}
        {/*<div className={"flex justify-between"}>*/}
        {/*  <div className={"flex items-center"}>*/}
        {/*    <Image src={ICONS.heart} className={"cursor-pointer"} alt={"heart icon"}/>*/}
        {/*    <span className={"ml-[11px]"}>save</span>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <Image src={ICONS.share} className={"cursor-pointer"} alt={"share icon"}/>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*/!*save & share*!/*/}


        <div>
          <p className={"text-[#383838] text-[22px] font-bold mt-8"}>Room Type</p>
          <div className={"rounded-xl bg-[white] mt-4 py-4 px-2"}>
            Room for 2 persons (Monday to Friday)
          </div>


          {/*options*/}
          <div className={"grid grid-cols-2 grid-rows-1 gap-1 gap-x-[30px] gap-y-6 mt-8"}>

            <div className={"bg-[white] py-2 pl-[28px] rounded-xl flex h-min"}>
              <div className={"min-w-[10px] flex items-center"}>
                <Image src={ICONS.percent} className={"cursor-pointer "} alt={"share icon"}/>
              </div>
              <div className={"flex flex-col ml-[28px]"}>
                <p className={"text-[#383838] text-base"}>Saving</p>
                <div className={"flex flex-nowrap items-center"}>
                  <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>25%</p>
                  <p className={"ml-3 text-base text-[#38383899] whitespace-nowrap"}>( $50 )</p>
                </div>
              </div>
            </div>
            <div className={"bg-[white] py-2 pl-[28px] rounded-xl flex h-min"}>
              <div className={"min-w-[10px] flex items-center"}>
                <Image src={ICONS.dollar} className={"cursor-pointer "} alt={"share icon"}/>
              </div>
              <div className={"flex flex-col ml-[28px]"}>
                <p className={"text-[#383838] text-base"}>Price</p>
                <div className={"flex flex-nowrap items-center"}>
                  <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>150 $</p>
                  <p className={"ml-3 text-base text-[#38383899] whitespace-nowrap line-through"}>200 $</p>
                </div>
              </div>
            </div>

          </div>


          {/*options*/}

          <div className={""}>
            <div className={"flex mt-[34px] bg-[white] p-6 rounded-xl col-span-2"}>
              <p className={"text-purple text-base font-[500] mr-5"}>
                <CountDown data={serverVoucher[0]?.additionalInfo[0]?.useEndDate}/>
              </p>

              <InStock max={serverVoucher[0]?.additionalInfo[0]?.limitQuantity}
                       current={serverVoucher[0]?.additionalInfo[0]?.soldQuantity}/>
            </div>
            {/*{*/}
            {/*    checked && <div className={"grid grid-cols-2 grid-rows-2 gap-1 gap-x-[30px] gap-y-6 mt-[22px]"}>*/}

            {/*			<div className={"bg-[white] py-2 pl-[28px] rounded-xl flex h-min"}>*/}
            {/*				<div className={"min-w-[10px] flex items-center"}>*/}
            {/*					<Image src={ICONS.dollar} className={"cursor-pointer "} alt={"share icon"}/>*/}
            {/*				</div>*/}
            {/*				<div className={"flex flex-col ml-[28px]"}>*/}
            {/*					<p className={"text-[#383838] text-base"}>Price</p>*/}
            {/*					<div className={"flex flex-nowrap items-center"}>*/}
            {/*						<p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>150 $</p>*/}
            {/*						<p className={"ml-3 text-base text-[#38383899] whitespace-nowrap line-through"}>200 $</p>*/}
            {/*					</div>*/}
            {/*				</div>*/}
            {/*			</div>*/}

            {/*			<div className={"bg-[white] py-2 pl-[28px] rounded-xl flex h-min"}>*/}
            {/*				<div className={"min-w-[10px] flex items-center"}>*/}
            {/*					<Image src={ICONS.percent} className={"cursor-pointer "} alt={"share icon"}/>*/}
            {/*				</div>*/}
            {/*				<div className={"flex flex-col ml-[28px]"}>*/}
            {/*					<p className={"text-[#383838] text-base"}>Saving</p>*/}
            {/*					<div className={"flex flex-nowrap items-center"}>*/}
            {/*						<p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>25%</p>*/}
            {/*						<p className={"ml-3 text-base text-[#38383899] whitespace-nowrap"}>( $50 )</p>*/}
            {/*					</div>*/}
            {/*				</div>*/}
            {/*			</div>*/}

            {/*			<div className={"flex bg-[#d9d9d980] p-6 rounded-xl col-span-2 justify-between"}>*/}
            {/*				<div className={"flex items-center"}>*/}
            {/*					<Image src={ICONS.warning} className={"cursor-pointer"} alt={"warning icon"}/>*/}
            {/*					<p className={"text-base text-[#383838] text-base mr-5 ml-2 "}>you don&apos;t have enough point</p>*/}
            {/*				</div>*/}
            {/*				<p className={"text-purple uppercase font-[500] cursor-pointer"}>buy now</p>*/}
            {/*			</div>*/}

            {/*		</div>*/}
            {/*}*/}
          </div>

        </div>


        {/* buy & cart buttons*/}
        <div className={"flex gap-[30px] justify-between mt-6"}>
          <div className={"w-full"}>
            <Button text={"Buy now"} bgColor={"#8338EC"} classes={"!w-full"}/>
          </div>
          <div
              className={"w-full rounded-xl bg-[white] px-10 flex justify-center items-center cursor-pointer flex-nowrap"}>
            <div className={"min-w-[15px] flex"}>
              <Image src={ICONS.cart} className={"cursor-pointer"} alt={"cart icon"}/>
            </div>
            <p className={"ml-3 text-base text-[#383838] whitespace-nowrap"}
               onClick={() => handleAddToCart(serverVoucher)}>Add to Cart</p>
          </div>
        </div>
        {/* buy & cart buttons*/}

      </div>
    </div>

  }


  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="details"/>
        </Head>

        <div className={"bg-[#F5F6F8]"}>

          {/*""*/}

          <div className={"flex flex-col"}>

            <GalleryScroll/>

            <div className={"container grid grid-cols-3 gap-[30px] m-auto pt-8"}>

              {/*left side*/}
              <div className={"h-full col-span-2 "}>
                <Link href={`/company/${serverVoucher[0]?.additionalInfo[0]?.provider?.name}`}>
                  <div
                      className={"flex justify-between w-full p-6 rounded-xl items-center bg-[white] cursor-pointer"}>
                    <div className={"mr-4 flex justify-center items-center"}>
                      <Image src={IMAGES.detailsImg} height={60} width={60} alt={"image"}/>
                    </div>
                    <div className={"flex-1 flex-col"}>
                      <h2 className={"text-[22px] font-bold text-[#383838]"}>{serverVoucher[0]?.additionalInfo[0]?.provider?.name}</h2>
                      <p className={"text-[#38383899] mt-[11px]"}>{serverVoucher[0]?.additionalInfo[0]?.subTitles[0]?.description}</p>
                    </div>
                    <div className={"mr-[9px]"}>
                      <Image src={ICONS.rightArrowDetails} alt={"arrow icon"}/>
                    </div>
                  </div>

                </Link>

                {/*info*/}
                <div className={"flex justify-between mt-5"}>

                  {/*phone number*/}
                  {serverVoucher[0]?.additionalInfo[0]?.provider?.providerContacts[0]?.value &&
											<div className={"group flex items-center relative"}>
												<Phone classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {serverVoucher[0]?.additionalInfo[0]?.provider?.providerContacts[0]?.value}</p>
												<div
														className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
													<Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
												</div>

												<div
														style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
														className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
													<p className={"text-[#383838b3] text-base"}>+ 995 577 77 79 00</p>
													<p className={"text-[#383838b3] text-base"}>+ 995 577 57 75 07</p>
												</div>
											</div>
                  }
                  {/*phone number*/}

                  {/*working hours*/}
                  <div className={"group flex items-center relative"}>
                    {/*<Image src={ICONS.watch} alt={"phone icon"}/>*/}

                    <Watch classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>

                    <p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>Working
                      Hours</p>
                    <div
                        className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
                      <Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
                    </div>

                    <div
                        style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
                        className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>

                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>Monday</p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>Monda s sy</p>
                        <p className={"text-[#383838]"}>10:00 - 21:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>dsds sd</p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>sd s gs</p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>Mond sfsaay</p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>Mon sfsfs day</p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>
                      <div className={"flex justify-between"}>
                        <p className={"mr-6 text-[#383838b3]"}>f ssff s f </p>
                        <p className={"text-[#383838]"}>09:00 - 22:00</p>
                      </div>

                    </div>
                  </div>
                  {/*working hours*/}

                  {/*location dropdown*/}
                  {serverVoucher[0]?.additionalInfo[0]?.provider?.providerAddresses[0]?.value &&
											<div className={"group flex items-center relative"}>
												<Location classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>

												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {serverVoucher[0]?.additionalInfo[0]?.provider?.providerAddresses[0]?.value}
												</p>
												<div
														className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
													<Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
												</div>

												<div
														style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
														className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
													<p className={"text-[#383838b3] text-base"}>Telavi , village Napareuli</p>
													<p className={"text-[#383838b3] text-base"}>Telavi , village Ikalto</p>
													<p className={"text-[#383838b3] text-base"}>Sagarejo , village khashmi</p>
													<p className={"text-[#383838b3] text-base"}>Telavi , village Napareuli</p>
												</div>
											</div>
                  }
                  {/*location dropdown*/}


                  <div className={"flex space-x-[33px] items-center"}>
                    {serverVoucher[0]?.additionalInfo[0]?.provider.facebookUrl && <div className={"cursor-pointer"}>
											<Link href={serverVoucher[0]?.additionalInfo[0]?.provider.facebookUrl}
														target={"_blank"}>
												<Image src={ICONS.fb} alt={"fb icon"}/>
											</Link>
										</div>
                    }
                    {
                        serverVoucher[0]?.additionalInfo[0]?.provider.instagramUrl && <div className={"cursor-pointer"}>
													<Link href={serverVoucher[0]?.additionalInfo[0]?.provider.instagramUrl} target={"_blank"}>
														<Image src={ICONS.insta} alt={"insta icon"}/>
													</Link>
												</div>
                    }

                  </div>

                </div>
                {/*info*/}
                {/*<div className={"w-full h-[1px] bg-[#d9d9d94d] my-8 "}/>*/}
                <Tabs defaultActiveKey="1" className={"tabDescription mt-[46px]"}>
                  <Tabs.TabPane
                      tab={<h3 className={"capitalize text-[#383838] text-[22px] font-bold"}>offer details</h3>}
                      key="1">
                    <div
                        dangerouslySetInnerHTML={{__html: serverVoucher[0]?.additionalInfo[0]?.descriptions[0]?.description}}/>
                  </Tabs.TabPane>

                  <Tabs.TabPane
                      tab={<h3 className={"capitalize text-[#383838] text-[22px] font-bold"}>conditions</h3>}
                      key="2">
                    <div
                        dangerouslySetInnerHTML={{__html: serverVoucher[0]?.additionalInfo[0].subDescriptions[0].description}}
                    />
                  </Tabs.TabPane>
                </Tabs>

                {/*Offer Details*/}

                {/*Offer Details*/}


                {/*reviews*/}
                <div className={"mt-[100px]"}>
                  <h4 className={"text-[22px] font-bold text-[#383838] mb-4"}>Reviews</h4>
                  <div className={"flex flex-col space-y-6"}>
                    <Comment rate={3}/>
                    <Comment rate={5}/>
                    <Comment rate={3}/>
                    <Comment rate={5}/>
                    <Comment rate={3}/>
                  </div>
                </div>
                {/*reviews*/}
              </div>
              {/*left side*/}

              <RightSide/>
            </div>

            {/*recommended*/}
            <div className={"flex flex-col w-full mt-[100px] mb-[112px] details"}>
              <div className={"container m-auto"}>
                <h1 className={"text-[28px] text-[#383838] font-bold"}>Recommended</h1>
                <div className={"mt-4"}>
                  <OfferSlider data={serverOffer}/>
                </div>
              </div>
            </div>
            {/*recommended*/}

          </div>

        </div>
      </>
  )
}


Details.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}


export async function getServerSideProps({query}: any) {
  const baseApi = process.env.baseApi;


  let slugVoucher = query.slugVoucher?.replaceAll('-', ' ');
  let slug = query.slug?.replaceAll('-', ' ');


  const responseVoucher = await fetch(`${baseApi}/vouchers?contractId=662&providerName=${slug}&voucherName=${slugVoucher}`);
  const responseAll = await fetch(`${baseApi}/vouchers?contractId=662`);

  const serverVoucher = await responseVoucher.json();
  const serverOffer = await responseAll.json();

  // let serverData = [1, 2, 3];

  return {
    props: {
      serverVoucher,
      serverOffer
    },
  };
}

import Layout from "../../../../../components/layouts/user-layout"
import Head from 'next/head'
import {Badge, notification} from 'antd';
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
import Tabs from "antd/lib/tabs";
import Link from "next/link";
import axios from "axios";
import router, {useRouter} from "next/router";
import OfferSlider from "../../../../../components/UI/slider/offer-slider";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import {
  addToCartWithQuantity, getTotals,
} from "../../../../../components/slices/cartSlice";

import {addToFavourites, clearFavourites, getTotalsFavourite} from "../../../../../components/slices/favouritesSlice";
import {heartPurple} from "../../../../../../public/images/icons";
import slider from "../../../../../../public/images/images/mainSlider.png";

const CountDown = dynamic(
    () => import("../../../../../components/UI/count-down"),
    {ssr: false}
)
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Details({serverOffer, serverVoucher}: any) {
  const baseApi = process.env.baseApi;

  const [vouchers, setVouchers] = useState<[]>([]);
  const [voucher, setVoucher] = useState<any>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isWithMoney, setIsWithMoney] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useSelector((state: any) => state.cart);
  const favourites = useSelector((state: any) => state.favourites);
  const dispatch = useDispatch();
  const Router = useRouter();


  // @ts-ignore
  let slugVoucher = Router?.query.slugVoucher;
  // @ts-ignore
  let slug = Router?.query.slug?.replaceAll('-', ' ');

  const items = [
    {
      label: <h3 className={"capitalize text-[#383838] text-[22px] font-bold"}>offer details</h3>,
      key: 'item-1',
      children: <div
          dangerouslySetInnerHTML={{__html: voucher[0]?.additionalInfo[0]?.descriptions[0]?.description}}/>
    },
    {
      label: <h3 className={"capitalize text-[#383838] text-[22px] font-bold"}>conditions</h3>,
      key: 'item-2',
      children: <div
          dangerouslySetInnerHTML={{__html: voucher[0]?.additionalInfo[0].subDescriptions[0].description}}
      />
    },
  ];

  useEffect(() => {
    if (slugVoucher && slug) {
      axios.get(`${baseApi}/vouchers?contractId=662&providerName=${slug}&id=${slugVoucher}`).then((res) => {
        setVoucher(res.data)

        if (res.data.length === 0) {
          Router.push("/");
        }
      })
      axios.get(`${baseApi}/vouchers?contractId=662`).then((res) => {
        setVouchers(res.data)
      })
    }
  }, [slugVoucher, slug])

  useEffect(() => {
    dispatch(getTotalsFavourite({}));
    dispatch(getTotals({}));
  }, [cart, voucher, favourites, dispatch]);

  const handleAddToCart = (product: any) => {
    product.quantity = quantity;
    product.isPoint = !isWithMoney;
    dispatch(addToCartWithQuantity(product));

    notification['success']({
      message: 'item successfully add',
    });
  };
  const addFav = (product: any) => {
    dispatch(addToFavourites(product));
  }

  const getWeekByNumber = (index: number) => {
    return weekDays[index - 1]
  }

  useEffect(() => {
    setIsFavourite(false);
    favourites.favouritesList.map((e: any) => {
      if (_.get(e, 'additionalInfo[0].genericTransactionTypeId', 0) === _.get(voucher, '[0].additionalInfo[0].genericTransactionTypeId', 0)) {
        setIsFavourite(true);
      }
    })
  }, [dispatch, favourites, voucher])

  const RightSide = () => {
    return <div className={"h-full"}>
      <div className={"bg-[#d9d9d933] rounded-xl p-8 top-[150px] sticky overflow-y-scroll "}>
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
                      <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>
                        ${_.get(voucher, '[0].entries[0].entryAmount', 0) * quantity}
                      </p> :
                      <p className={"text-[18px] text-purple flex-nowrap whitespace-nowrap"}>
                        {_.get(voucher, '[0].entries[0].entryAmount', 0) * _.get(voucher, '[0].entries[0].multiplier', 0) * quantity}
                      </p>
                }
              </div>
            </div>
          </div>

          <div className={"flex justify-center items-center w-full h-[68px] bg-[white] rounded-xl px-5"}>
            <div className={"rounded-xl bg-[#EEEEEE] h-[48px] w-full flex items-center"}>
              <div className={"rounded-[10px] bg-[white] h-full w-full py-1 px-[10px] flex items-center"}>
                <div onClick={() => quantity != 1 && setQuantity((prevState: number) => prevState - 1)}
                     className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
                  <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#EEEEEE]"}
                       style={{
                         backgroundColor: quantity != 1 ? "#383838" : "#EEEEEE"
                       }}
                  />
                </div>
                <div className={"flex flex-col w-full justify-center items-center text-center"}>
                  <p className={"text-[#383838] text-base"}>Quantity</p>
                  <p className={"text-[#383838] text-base font-bold"}>{quantity}</p>
                </div>
                <div
                    onClick={() => quantity < (_.get(voucher, '[0].additionalInfo[0].limitQuantity', 0) - _.get(voucher, '[0].additionalInfo[0].soldQuantity', 0)) && setQuantity((prevState: number) => prevState + 1)}
                    className={`plus ${quantity < (_.get(voucher, '[0].additionalInfo[0].limitQuantity', 0) - _.get(voucher, '[0].additionalInfo[0].soldQuantity', 0)) && 'active'} cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center`}>
                  <div
                      className={" after min-w-[12.5px] h-[1.5px] rounded bg-[#383838] "}
                      style={{
                        backgroundColor: quantity < (_.get(voucher, '[0].additionalInfo[0].limitQuantity', 0) - _.get(voucher, '[0].additionalInfo[0].soldQuantity', 0)) ? "#383838" : "#EEEEEE",
                      }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={"text-[#383838] text-[22px] font-bold mt-8"}>Room Type </p>
          <div className={"rounded-xl bg-[white] mt-4 py-4 px-2"}>Room for 2 persons (Monday to Friday)</div>

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
                <CountDown data={_.get(voucher, '[0].additionalInfo[0].useEndDate', 0)}/>
              </p>
              <InStock max={_.get(voucher, '[0].additionalInfo[0].limitQuantity', 0)}
                       current={_.get(voucher, '[0].additionalInfo[0].soldQuantity', 0)}/>
            </div>
          </div>
        </div>

        {/* buy & cart buttons*/}
        <div className={"grid grid-cols-2 grid-rows-2 gap-1 gap-x-[30px] gap-y-8 mt-8"}>
          <div
              className={"w-full rounded-xl bg-[white] px-10 flex justify-center items-center cursor-pointer flex-nowrap"}
              onClick={() => handleAddToCart(voucher)}>
            <div className={"min-w-[15px] flex"}>
              <Image src={ICONS.cart} className={"cursor-pointer"} alt={"cart icon"}/>
            </div>
            <p className={"ml-3 text-base text-[#383838] whitespace-nowrap"}
            >Add to Cart</p>
          </div>
          <div
              className={"w-full rounded-xl bg-[white] px-10 flex justify-center items-center cursor-pointer flex-nowrap"}
              onClick={() => {
                addFav(voucher[0])
              }}
          >
            <div className={"min-w-[15px] flex"}>
              {isFavourite ? <Image src={ICONS.heartPurple}
                                    quality={70}
                                    blurDataURL={IMAGES.placeholder.src}
                                    placeholder="blur"
                                    priority={true}
                                    className={"cursor-pointer"}
                                    alt={"cart icon"}/> :
                  <Image src={ICONS.heart}
                         quality={70}
                         blurDataURL={IMAGES.placeholder.src}
                         placeholder="blur"
                         priority={true}
                         className={"cursor-pointer"}
                         alt={"cart icon"}
                  />}
            </div>
            <p className={"ml-3 text-base text-[#383838] whitespace-nowrap"}
            >save</p>
          </div>
          <div className={" col-span-2"} onClick={() => dispatch(clearFavourites({}))}>
            <Button text={"Buy now"} bgColor={"#8338EC"} classes={"!w-full"}/>
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

          <div className={"flex flex-col"}>
            {_.get(voucher, '[0].additionalInfo[0].attachments', []).length > 0 && <GalleryScroll data={voucher}/>}
            <div className={"container grid grid-cols-3 gap-[30px] m-auto pt-8"}>
              {/*left side*/}
              <div className={"h-full col-span-2 "}>
                <Link href={`/company/${_.get(voucher, '[0].additionalInfo[0].provider.name', '')}`}>
                  <div
                      className={"flex justify-between w-full p-6 rounded-xl items-center bg-[white] cursor-pointer"}>
                    <div className={"mr-4 flex justify-center items-center"}>
                      <Image
                          src={IMAGES.detailsImg}
                          quality={40}
                          blurDataURL={IMAGES.placeholder.src}
                          placeholder="blur"
                          loading={"lazy"}
                          height={60}
                          width={60}
                          alt={"image"}/>
                    </div>
                    <div className={"flex-1 flex-col"}>
                      <h2 className={"text-[22px] font-bold text-[#383838]"}>{_.get(voucher, '[0].additionalInfo[0].provider.name', '')}
                      </h2>
                      <p className={"text-[#38383899] mt-[11px]"}>{_.get(voucher, '[0].additionalInfo[0].subTitles[0].description', '')}</p>
                    </div>
                    <div className={"mr-[9px]"}>
                      <Image src={ICONS.rightArrowDetails} alt={"arrow icon"}/>
                    </div>
                  </div>
                </Link>

                {/*info*/}
                <div className={"flex justify-between mt-5"}>
                  {/*phone number*/}
                  {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', '') &&
											<div className={"group flex items-center relative"}>
												<Phone classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', '')}</p>
                        {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts', 0).length > 1 && <div
														className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
													<Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
												</div>}
                        {
                            _.get(voucher, '[0].additionalInfo[0].provider.providerContacts', 0).length > 1 &&
														<div
																style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
																className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
                              {
                                _.get(voucher, '[0].additionalInfo[0].provider.providerContacts', []).slice(1, _.get(voucher, '[0].additionalInfo[0].provider.providerContacts', 0).length).map((item: any, index: number) => {
                                  return <p className={"text-[#383838b3] text-base"} key={index}>
                                    {item.value}
                                  </p>
                                })
                              }
														</div>
                        }
											</div>
                  }
                  {/*phone number*/}

                  {/*working hours*/}
                  <div className={"group flex items-center relative"}>
                    <Watch classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
                    <p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>Working
                      Hours</p>
                    <div
                        className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
                      <Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
                    </div>
                    {_.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', []).length > 0 && <div
												style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
												className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
                      {
                        _.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', []).map((item: any, index: number) => {
                          return <div className={"flex justify-between"} key={index}>
                            <p className={"mr-6 text-[#383838b3]"}>{getWeekByNumber(item.dayId)}</p>
                            <p className={"text-[#383838]"}>{item.startHour} - {item.endHour}</p>
                          </div>
                        })
                      }
										</div>
                    }
                  </div>
                  {/*working hours*/}

                  {/*location dropdown*/}
                  {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', '') &&
											<div className={"group flex items-center relative"}>
												<Location classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', '')}
												</p>
                        {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses', []).length > 1 && <div
														className={"group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
													<Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>
												</div>}

                        {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses', []).length > 1 && <div
														style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
														className={"group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
                          {
                            _.get(voucher, '[0].additionalInfo[0].provider.providerAddresses', []).slice(1, _.get(voucher, '[0].additionalInfo[0].provider.providerAddresses', 0).length).map((item: any, index: number) => {
                              return <p className={"text-[#383838b3] text-base"} key={index}>
                                {item.value}
                              </p>
                            })
                          }
												</div>}
											</div>
                  }
                  {/*location dropdown*/}
                  <div className={"flex space-x-[33px] items-center"}>
                    {_.get(voucher, '[0]?.additionalInfo[0]?.provider.facebookUrl', null) &&
												<div className={"cursor-pointer"}>
													<Link href={_.get(voucher, '[0]?.additionalInfo[0]?.provider.facebookUrl', null)}
																target={"_blank"}>
														<Image src={ICONS.fb} alt={"fb icon"}/>
													</Link>
												</div>
                    }
                    {
                        _.get(voucher, '[0]?.additionalInfo[0]?.provider.instagramUrl', null) &&
												<div className={"cursor-pointer"}>
													<Link href={_.get(voucher, '[0]?.additionalInfo[0]?.provider.instagramUrl', null)}
																target={"_blank"}>
														<Image src={ICONS.insta} alt={"insta icon"}/>
													</Link>
												</div>
                    }
                  </div>
                </div>
                {/*info*/}
                <Tabs defaultActiveKey="1" className={"tabDescription mt-[46px]"} items={items}/>

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
            {vouchers.length > 0 && <div className={"flex flex-col w-full mt-[100px] mb-[112px] details"}>
							<div className={"container m-auto"}>
								<h1 className={"text-[28px] text-[#383838] font-bold"}>Recommended</h1>
								<div className={"mt-4"}>
									<OfferSlider data={vouchers}/>
								</div>
							</div>
						</div>}
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

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//
//   console.log("baseAapi", baseApi)
//
//   let slugVoucher = query.slugVoucher?.replaceAll('-', ' ');
//   let slug = query.slug?.replaceAll('-', ' ');
//
//   const responseVoucher = await fetch(`${baseApi}/vouchers?contractId=662&providerName=${slug}&voucherName=${slugVoucher}`);
//   const responseAll = await fetch(`${baseApi}/vouchers?contractId=662`);
//
//   // const responseVoucher = await fetch(`https://vouchers.pirveli.ge/api/racoon-transactions/vouchers?contractId=662&providerName=${slug}&voucherName=${slugVoucher}`);
//   // const responseAll = await fetch(`https://vouchers.pirveli.ge/api/racoon-transactions/vouchers?contractId=662`);
//
//   const serverVoucher = await responseVoucher.json();
//   const serverOffer = await responseAll.json();
//
//   // let serverData = [1, 2, 3];
//
//   return {
//     props: {
//       serverVoucher,
//       serverOffer
//     },
//   };
// }

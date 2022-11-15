import Layout from "../../../../../components/layouts/user-layout"
import Head from 'next/head'
import {notification} from 'antd';
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
import {useRouter} from "next/router";
import OfferSlider from "../../../../../components/UI/slider/offer-slider";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import {
  addToCartWithQuantity, getTotals,
} from "../../../../../components/slices/cartSlice";

import {addToFavourites, clearFavourites, getTotalsFavourite} from "../../../../../components/slices/favouritesSlice";
import FreeScroll from "../../../../../components/UI/slider/free-scroll";
import Lari from "../../../../../../public/images/icons/lari";

const CountDown = dynamic(
    () => import("../../../../../components/UI/count-down"),
    {ssr: false}
)
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Details() {
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
  const getOldPrice = () => {
    return (_.get(voucher, '[0].additionalInfo[0].servicePrice', 0) * 100) / (100 - (_.get(voucher, '[0].additionalInfo[0].percentage', 0)))
  }

  const getSave = () => {
    return getOldPrice() - _.get(voucher, '[0].additionalInfo[0].servicePrice', 0)
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
    return <div className={"h-full container m-auto  md:p-0 "}>
      <div className={"bg-[transparent] lg:bg-[#ffffff66] rounded-xl p-0 lg:p-8 top-[150px] sticky overflow-y-scroll "}>
        <div className={"grid grid-cols-2 grid-rows-1 bg-[white] w-full h-[48px] rounded-xl p-1"}>
          <div onClick={() => {
            setIsWithMoney(true)
          }}
               className={"flex w-full rounded-[10px] justify-center items-center cursor-pointer"}
               style={{backgroundColor: isWithMoney ? "#8338EC" : "transparent"}}>
            <span className={" text-[20px] font-[500] mr-2"}
                  style={{color: isWithMoney ? "#FFFFFF" : "#383838"}}><Lari
                color={isWithMoney ? "#FFFFFF" : "#383838"}/></span>
            <p className={"text-[white] text-base"} style={{color: isWithMoney ? "#FFFFFF" : "#383838"}}>with money</p>
          </div>
          <div onClick={() => {
            setIsWithMoney(false)
          }}
               className={"flex w-full rounded-[10px] justify-center items-center cursor-pointer"}
               style={{backgroundColor: !isWithMoney ? "#8338EC" : "transparent"}}>
            <span className={"text-[20px] font-[500] mr-2 flex items-center"}>
              <Image
                  src={IMAGES.coin}
                  quality={100}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  width={20}
                  height={20}
                  alt={"coin icon"}
              />
            </span>
            <p className={" text-base"} style={{color: !isWithMoney ? "#FFFFFF" : "#383838"}}>with point</p>
          </div>
        </div>
        <div className={"grid grid-cols-2 grid-rows-1 gap-1 gap-x-[30px] gap-y-6 mt-8"}>
          <div className={"bg-[white] py-2 pl-[10px] rounded-xl flex min-h-[64px] h-min"}>
            <div className={"min-w-[32px] flex items-center justify-center"}>
              {/*<Image src={ICONS.dollar} className={"cursor-pointer "} alt={"share icon"}/>*/}
              {isWithMoney ? <Lari color={"#3838384d"} classes={"scale-150"}/> : <Image
                  src={IMAGES.coin}
                  quality={100}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  width={30}
                  height={30}
                  alt={"coin icon"}
              />}
            </div>
            <div className={"flex flex-col ml-[10px]"}>
              <p className={"text-[#383838] lg:text-base text-sm"}>Voucher price</p>
              <div className={"flex flex-nowrap items-center"}>
                {
                  isWithMoney ?
                      <p className={"flex items-center lg:text-[18px] text-sm text-purple flex-nowrap whitespace-nowrap"}>
                        {_.get(voucher, '[0].entries[0].entryAmount', 0) * quantity}
                      </p> :
                      <p className={"lg:text-[18px] text-sm text-purple flex items-center flex-nowrap whitespace-nowrap"}>
                        <div className={"mr-2"}>
                        </div>
                        {_.get(voucher, '[0].entries[0].entryAmount', 0) * _.get(voucher, '[0].entries[0].multiplier', 0) * quantity}
                      </p>
                }
              </div>
            </div>
          </div>

          <div className={"flex justify-center items-center w-full h-[64px] bg-[white] rounded-xl px-5"}>
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
                  <p className={"text-[#383838] lg:text-base text-sm"}>Quantity</p>
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
          {/*<p className={"text-[#383838] text-[22px] font-bold mt-8"}>Room Type </p>*/}
          {/*<div className={"rounded-xl bg-[white] mt-4 py-4 px-2"}>Room for 2 persons (Monday to Friday)</div>*/}

          {/*options*/}
          <div className={"grid grid-cols-2 grid-rows-1 gap-1 gap-x-[30px] gap-y-6 mt-8"}>
            <div className={"col-span-2 ph:col-span-1 bg-[white] py-2 pl-5 rounded-xl flex h-min"}>
              <div className={"min-w-[14px] flex items-center"}>
                <Image src={ICONS.percent} className={"cursor-pointer"} layout={"fixed"} width={17} height={17}
                       alt={"percent icon"}/>
              </div>
              <div className={"flex flex-col ml-[16px]"}>
                <p className={"text-[#383838] lg:text-base text-sm"}>Saving</p>
                <div className={"flex flex-nowrap items-center"}>
                  <p className={"lg:text-[18px] text-base text-purple flex-nowrap whitespace-nowrap"}>-{Math.round(_.get(voucher, '[0].additionalInfo[0].percentage', 0))}%</p>
                  <p className={"ml-1 lg:text-base text-sm text-[#38383899] whitespace-nowrap flex items-center"}>
                    (<Lari color={"#3838384d"} classes={"mr-1"}/>{Math.round(getSave())} )</p>
                </div>
              </div>
            </div>
            <div className={"col-span-2 ph:col-span-1 bg-[white] py-2 pl-5 rounded-xl flex h-min"}>
              <div className={"min-w-[10px] flex items-center"}>
                <Lari color={"#3838384d"} classes={"scale-150"}/>
              </div>
              <div className={"flex flex-col ml-[16px]"}>
                <p className={"text-[#383838] lg:text-base text-sm"}>Price</p>
                <div className={"flex flex-nowrap items-center"}>
                  <p className={"lg:text-[18px] text-base text-purple flex-nowrap whitespace-nowrap flex items-center mr-1.5"}>
                    <Lari color={"#3838384d"}
                          classes={"mr-1"}/> {_.get(voucher, '[0].additionalInfo[0].servicePrice', 0)}</p>
                  <p className={"ml-1 lg:text-base text-sm  text-[#38383899] whitespace-nowrap line-through flex items-center"}>
                    <Lari color={"#3838384d"} classes={"mr-1"}/> {Math.round(getOldPrice())}</p>
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
                                    priority={true}
                                    className={"cursor-pointer"}
                                    alt={"cart icon"}/> :
                  <Image src={ICONS.heart}
                         quality={70}
                         blurDataURL={IMAGES.placeholder.src}
                         priority={true}
                         className={"cursor-pointer"}
                         alt={"cart icon"}
                  />}
            </div>
            <p className={"ml-3 text-base text-[#383838] whitespace-nowrap"}>save</p>
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

        <div className={"md:pb-0 pb-32"}>

          <div className={"flex flex-col"}>
            <div className={"flex md:hidden w-full h-[44px]"}>
              <div className={"container m-auto flex justify-between"}>
                <Link href={"/"}>
                  <div className={"flex cursor-pointer"}>
                    <Image
                        src={ICONS.arrowBack}
                        layout={"fixed"}
                        width={24}
                        height={24}
                    />
                    <p className={"ml-2 text-[#383838] text-base"}>Back</p>
                  </div>
                </Link>

                <div className={"flex items-center h-full "}>
                  {_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "").includes("https://") &&

											<div className={"cursor-pointer w-11 flex justify-center items-center cursor-pointer"}>
												<Link href={_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "")}
															target={"_blank"}>
													<div className={"flex justify-center items-center"}>
														<Image src={ICONS.fb} alt={"fb icon"}/>
													</div>
												</Link>
											</div>
                  }
                  {_.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "").includes("https://") &&
											<div className={"cursor-pointer w-11 flex justify-end pr-1 cursor-pointer"}>
												<Link href={_.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "")}
															target={"_blank"}>
													<div className={"flex justify-center items-center"}>
														<Image src={ICONS.insta} alt={"insta icon"}/>
													</div>
												</Link>
											</div>
                  }
                </div>

              </div>
            </div>
            {_.get(voucher, '[0].additionalInfo[0].attachments', []).length > 0 && <GalleryScroll data={voucher}/>}
            <div className={"block lg:hidden py-6 col-span-3 bg-[#F7F7F7]"}><RightSide/></div>
            <div className={"container flex w-full  gap-[30px] m-auto pt-8"}>
              {/*left side*/}

              <div className={"h-full "}>
                <Link href={`/company/${_.get(voucher, '[0].additionalInfo[0].provider.name', '')}`}>
                  <div
                      className={"flex justify-between w-full lg:p-6 p-4 rounded-xl items-center bg-[white] cursor-pointer"}>
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
                      <h2 className={"lg:text-[22px] text-base font-bold text-[#383838]"}>{_.get(voucher, '[0].additionalInfo[0].provider.name', '')}
                      </h2>
                      <p className={"text-[#38383899] mt-1.5"}>{_.get(voucher, '[0].additionalInfo[0].subTitles[0].description', '')}</p>
                    </div>
                    <div className={"mr-[9px]"}>
                      <Image src={ICONS.rightArrowDetails} alt={"arrow icon"}/>
                    </div>
                  </div>
                </Link>

                {/*info*/}
                <div className={"flex md:flex-row flex-col justify-between mt-[18px] divide-[#D9D9D933] divide-y-2 "}>
                  {/*phone number*/}
                  {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', '') &&
											<div className={"group pb-4  md:pb-0  flex items-center relative"}>
												<Phone classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', '')}</p>
                        {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts', 0).length > 1 && <div
														className={"md:flex hidden group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
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
                  <div className={"group md:py-0 py-4 flex md:flex-row flex-col items-start md:items-center relative"}>
                    <div className={"flex"}>
                      <Watch classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
                      <p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>Working
                        Hours</p>
                      <div
                          className={"md:flex hidden group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
                        {_.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', 0).length > 0 &&
														<Image src={ICONS.arrowDrop} alt={"dropdown icon"}/>}
                      </div>
                    </div>
                    {_.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', []).length > 0 && <div
												style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"}}
												className={"hidden md:block group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-10 absolute w-max bg-[white] p-6 top-[40px] space-y-5 rounded-xl opacity-0 transition duration-200 ease-in-out"}>
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
                    {/*mobile*/}
                    <div className={"pl-8 block md:hidden w-full mt-[18px] space-y-[15px]"}>
                      {
                        _.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', []).map((item: any, index: number) => {
                          return <div className={"flex justify-between"} key={index}>
                            <p className={"mr-6 text-[#383838b3]"}>{getWeekByNumber(item.dayId)}</p>
                            <p className={"text-[#383838]"}>{item.startHour} - {item.endHour}</p>
                          </div>
                        })
                      }
                    </div>
                    {/*mobile*/}

                  </div>


                  {/*working hours*/}

                  {/*location dropdown*/}
                  {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', '') &&
											<div className={"group pt-4 md:pt-0 flex items-center relative"}>
												<Location classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
												<p className={"ml-[11px] mr-2 group-hover:opacity-100 text-[#383838] group-hover:text-[#8338EC] transition duration-200 ease-in-out"}>
                          {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', '')}
												</p>
                        {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses', []).length > 1 && <div
														className={"md:flex hidden group-hover:rotate-180 rotate-0 transition duration-200 ease-in-out flex justify-center items-center"}>
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

                  {/*fb  insta*/}
                  {_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', null) &&
											<div className={"hidden space-x-[33px] md:flex items-center"}>
                        {_.get(voucher, '[0]?.additionalInfo[0].provider.facebookUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "").includes("https://") &&
														< div className={"cursor-pointer"}>
															<Link href={_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "")}
																		target={"_blank"}>
																<div>
																	<Image src={ICONS.fb} alt={"fb icon"}/>
																</div>
															</Link>
														</div>
                        }
                        {
                            _.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "").includes("https://") &&
														<div className={"cursor-pointer"}>
															<Link href={_.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "")}
																		target={"_blank"}>
																<div>
																	<Image src={ICONS.insta} alt={"insta icon"}/>
																</div>
															</Link>
														</div>
                        }
											</div>
                  }
                  {/*fb  insta*/}
                </div>
                {/*info*/}
                <Tabs defaultActiveKey="1" className={"tabDescription mt-[34px]"} items={items}/>

                {/*reviews*/}
                <div className={"mt-[34px] lg-mt-[100px]"}>
                  <h4 className={"text-[22px] font-bold text-[#383838] mb-4"}>Reviews</h4>
                  <div className={"flex flex-col lg:space-y-6 space-y-5"}>
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

              <div className={"hidden lg:block w-[450px] shrink-0"}><RightSide/></div>
            </div>

            {/*recommended*/}

            {/*recommended*/}

          </div>
          {vouchers.length > 0 && <div className={"flex w-full flex-col mt-[44px] md:mt-0 details"}>
						<div className={"ph:container pl-0px ph:p-auto ph:m-auto w-full"}>
							<h1 className={"text-[18px] pl-3 ph:pl-0  m-auto sm:text-[28px] text-[#383838] font-bold"}>Recommended</h1>
							<div className={"mt-4"}>
								<OfferSlider data={vouchers}/>
								<FreeScroll data={vouchers} miniHeight={true}/>

							</div>
						</div>
					</div>}

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

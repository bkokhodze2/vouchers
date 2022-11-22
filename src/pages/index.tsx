import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/header";
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Button from "../components/UI/button";
import Slider from "../components/UI/slider/main-slider";
import OfferSlider from "../components/UI/slider/offer-slider";
import Link from "next/link";
import OfferItem from "../components/blocks/offer-item";
import Footer from "../components/footer";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import {HashLoader} from "react-spinners";
import slider from "../../public/images/images/mainSlider.png";
import FreeScroll from "../components/UI/slider/free-scroll";
import CategorySlider from "../components/UI/slider/category-slider";

// import Background from "../../public/images/images/test.png.png"

const Home: NextPage = ({serverData}: any) => {
  const baseApi = process.env.baseApi;

  const [vouchers, setVouchers] = useState<[]>([]);
  const [vouchersAll, setVouchersAll] = useState<any>([]);
  const [categories, setCategories] = useState<[any]>([{}]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promo, setPromo] = useState<any>([]);


  useEffect(() => {

    axios
        .get(`${baseApi}/vouchers?contractId=662`)
        .then((res) => {
          setVouchers(res.data)
          setVouchersAll(res.data)
        });

    if (!!promo) {
      axios
          .get(`${baseApi}/vouchers?contractId=662&isPromo=1`)
          .then((res) => {
            setPromo(res.data)
          });
    }

    if (!!categories) {
      axios
          .get(`${baseApi}/providers/categories`)
          .then((res) => {
            setCategories(res.data)

          });
    }

  }, [])


  const nextPage = (page: number) => {
    setIsLoading(true)
    setPage((prevState) => prevState + 1);

    axios
        .get(`${baseApi}/vouchers?contractId=662&page=${page}&limit=16`)
        .then((res) => {
          setVouchersAll((prevState: []) => [...prevState, ...res.data])
          setIsLoading(false)

        });

  }

  return (
      <div className={""}>
        <Head>
          <title>pirveli.ge</title>
          <meta name="description" content="Generated by create next app"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          {/*<link rel="icon" href="/public/favicon.ico"/>*/}
        </Head>
        {/*""*/}
        <Header/>

        <main className={"flex flex-col "}>
          <div className={"w-full flex-col"}>
            <div
                className="flex flex-col md:grid grid-rows-2 md:grid-rows-1 md:max-h-[552px] mt-0 md:mt-2 lg:mt-6 grid-cols-4 md:container con m-auto grid-flow-col gap-[44px] md:gap-[16px] xl:gap-[32px]">

              {/*Become Partner*/}
              <div className={"order-2 md:order-1 container p-4 py-0 ph:p-4 md:p-0 m-auto col-span-4 md:col-span-1"}>
                <div
                    // order-last
                    className="relative min-h-[138px] md:min-h-unset bg-[white] py-0 md:py-4 lg:py-8 rounded-xl flex flex-row md:flex-col md:items-center overflow-hidden bg-no-repeat bg-top"
                >
                  <h2 className={"text-[#383838] font-bold text-[22px] text-center z-10 hidden md:flex"}>Become
                    Partner</h2>
                  <div className={"relative"}>
                    <div
                        className={"absolute hidden md:flex left-[50%] top-[50%] -translate-x-[50%] -translate-y-[92%] rounded-[50%] h-[554px] w-[554px] bg-[#F5CE5A] "}></div>
                    <div className={"hidden md:flex"}>
                      <Image
                          src={IMAGES.partner}
                          alt={"partner"}
                          blurDataURL={IMAGES.placeholder.src}
                          placeholder="blur"
                          width={312}
                          height={312}
                          quality={50}
                          priority={true}
                      />
                    </div>

                  </div>
                  <div className={"flex md:hidden max-w-[150px] w-full relative"}>
                    <Image
                        src={IMAGES.mobileBecome2}
                        alt={"partner"}
                        blurDataURL={IMAGES.placeholder.src}
                        placeholder="blur"
                        width={136}
                        height={136}
                        quality={90}
                        layout={"fill"}
                        priority={true}
                    />
                  </div>
                  <div className={"p-5 md:p-0"}>
                    <h2 className={"text-[#383838] font-bold text-[18px] md:text-[22px] z-10 flex md:hidden mb-4"}>Become
                      Partner</h2>
                    <p className={"w-full px-0 xl:px-6 text-start md:text-center leading-[23px] text-[#38383899] text-sm -mt-[14px] z-10"}>Increase
                      sales,
                      attract new
                      customers and double your income with us.</p>
                  </div>

                  <Button text={"Learn More"} bgColor={"#383838"} classes={"mt-[58px] z-10 hidden md:flex"}/>
                </div>
              </div>
              {/*Become Partner*/}

              <div className="order-1 md:order-2 col-span-3 flex flex-col max-w-[1140px] h-[300px] md:h-full">

                {/*slider*/}
                <div className={"flex flex-1 "}>
                  <Slider/>
                </div>
                {/*slider*/}

                {/*Advertisement*/}
                <div
                    className={"grid hidden md:grid grid-rows-1 gap-[44px] md:gap-[16px] xl:gap-[32px] grid-cols-3 mt-4 xl:mt-[30px] "}>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white] w-full"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white] w-full"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white] w-full"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                </div>
                {/*Advertisement*/}

              </div>

            </div>

          </div>
          {/*Special offers*/}
          {promo.length > 0 &&
							<div className={"flex flex-col mt-[44px] md:mt-[40px]"}>
								<div className={"ph:container con pl-0px ph:p-auto ph:m-auto w-full"}>
									<h1 className={"text-[18px] pl-3 ph:pl-0  m-auto sm:text-[28px] text-[#383838] font-bold"}>Special
										offers</h1>
									<div className={"mt-4"}>
										<OfferSlider data={promo} loop={false}/>
										<FreeScroll data={vouchers} miniHeight={true}/>
									</div>
								</div>
							</div>}

          <div className={"mt-10 container m-auto mt-[55px] w-full flex sm:hidden relative"}>
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
          {/*Special offers*/}


          {/*Popular offers*/}
          <div className={"w-full "}>
            <div className={"mt-10 sm:container con m-auto mt-[76px] mb-[84px] hidden sm:flex"}>
              <Image
                  src={IMAGES.banner}
                  quality={70}
                  blurDataURL={IMAGES.placeholder.src}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"banner"}/>
            </div>

            {/*Popular offers */}
            {vouchers.length > 0 && <div className={"flex flex-col mt-[44px] md:mt-0"}>
							<div className={"ph:container con pl-0px ph:p-auto ph:m-auto w-full"}>
								<h1 className={"text-[18px] pl-3 ph:pl-0  m-auto sm:text-[28px] text-[#383838] font-bold"}>Popular
									offers</h1>
								<div className={"mt-4"}>
									<OfferSlider data={vouchers}/>
									<FreeScroll data={vouchers} miniHeight={true}/>
								</div>
							</div>
						</div>}

          </div>
          {/*Popular offers*/}

          {/*categories*/}
          <div className={"w-full"}>
            <div className={"w-full container m-auto py-[40px] ph:flex hidden"}>
              <CategorySlider/>
            </div>
            <div
                className={"space-x-[8px] md:space-x-[30px] !w-full py-[44px] flex ph:hidden flex-row overflow-scroll container m-auto grid-row-1"}>

              {/*{categories?.filter(item => item.parentCategoryId === null).map((item, index) => {*/}
              {/*  return <Link href={"/category/4"}>*/}
              {/*    <div*/}
              {/*        className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>*/}
              {/*      <div className={"bg-purple w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>*/}
              {/*      <div className={"mt-1"}>*/}
              {/*        <Image src={IMAGES.bag} alt={"bag image"} width={174} height={174}/>*/}
              {/*      </div>*/}
              {/*      <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Tourism</h4>*/}
              {/*      <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>*/}
              {/*    </div>*/}
              {/*  </Link>*/}
              {/*})*/}
              {/*}*/}

              <Link href={"/category/2"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-purple w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.bag.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Tourism</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


              <Link href={"/category/3"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div
                      className={"bg-[#7B92DC] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.beauty.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>beauty</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


              <Link href={"/category/4"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div
                      className={"bg-[#F5CE5A] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.food.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>food</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


              <Link href={"/category/5"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div
                      className={"bg-[#F5CE5A] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.entertainment.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>entertainment</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


              <Link href={"/category/12"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div
                      className={"bg-[#56971F] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.pool.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>pool</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>

              <Link href={"/category/7"}>
                <div
                    className={"cursor-pointer flex justify-center flex-col bg-[white] w-full max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div
                      className={"bg-[#7B92DC] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
                  <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                    <img src={IMAGES.electronic.src}
                         placeholder="blur"
                         style={{
                           objectFit: "cover"
                         }}
                         className={"w-[106px] md:w-[174px] h-full z-50"}
                         loading={"lazy"}
                         alt={"bag image"}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>electronic</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>
            </div>

          </div>

          {/*categories*/}

          {/*New offers  */}
          <div
              className={"flex flex-col w-full pb-[98px] mt-[0px] sm:mt-[0px]"}>
            {vouchers.length > 0 && <div className={"container m-auto"}>
							<h1 className={"text-[18px] sm:text-[28px] text-[#383838] font-bold"}>New offers</h1>
							<div
									className={"mt-4 grid grid-flow-row-dense grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-5 md:gap-y-[42px] xl:gap-x-[30px]"}>
                {
                    !!vouchersAll?.length && vouchersAll?.map((item: any, index: any) => {
                      return <OfferItem data={item} key={index}/>
                    })
                }
							</div>

							<div className={"flex justify-center mt-[48px]"}>
								<div
										className={"bg-purple rounded-xl h-[48px] sm:w-min w-full px-10 flex justify-center items-center cursor-pointer"}
										style={{
                      transition: "1s"
                    }}
										onClick={() => !isLoading && nextPage(page + 1)}>

									<p className={"text-[16px] text-[white] font-normal whitespace-nowrap"}>{isLoading ? "loading" : "Show more"}</p>
                  {isLoading &&
											<PulseLoader size={5} color="#FFFFFF" speedMultiplier={0.7} className={"mt-1.5 ml-1.5 "}/>}
								</div>
							</div>

						</div>}
          </div>
          {/*New offers  */}

        </main>

        <Footer/>
      </div>
  )
}

export default Home


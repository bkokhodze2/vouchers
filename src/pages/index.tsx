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

// import Background from "../../public/images/images/test.png.png"

const Home: NextPage = ({serverData}: any) => {
  const baseApi = process.env.baseApi;

  const [vouchers, setVouchers] = useState<[]>([]);
  const [vouchersAll, setVouchersAll] = useState<any>([]);
  const [categories, setCategories] = useState<[any]>([{}]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {

    axios
        .get(`${baseApi}/vouchers?contractId=662`)
        .then((res) => {
          setVouchers(res.data)
          setVouchersAll(res.data)
        });

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
        .get(`${baseApi}/vouchers?contractId=662&page=${page}&limit=25`)
        .then((res) => {
          setVouchersAll((prevState: []) => [...prevState, ...res.data])
          setIsLoading(false)

        });

  }

  return (
      <div className={"bg-[#F5F6F8]"}>
        <Head>
          <title>pirveli.ge</title>
          <meta name="description" content="Generated by create next app"/>
          {/*<link rel="icon" href="/public/favicon.ico"/>*/}
        </Head>
        {/*""*/}
        <Header/>

        <main className={"flex flex-col "}>
          <div className={"w-full"}>
            <div className="grid grid-rows-1 max-h-[552px] mt-6 grid-cols-4 container m-auto grid-flow-col gap-[30px]">

              {/*Become Partner*/}
              <div
                  // order-last
                  className=" relative bg-[white] py-8 rounded-xl flex flex-col items-center overflow-hidden bg-no-repeat bg-top"
              >
                <h2 className={"text-[#383838] font-bold text-[22px] z-10"}>Become Partner</h2>
                <div className={"relative"}>
                  <div
                      className={"absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[92%] rounded-[50%] h-[554px] w-[554px] bg-[#F5CE5A] "}></div>
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
                <p className={"w-full px-6 text-center leading-[23px] text-[#38383899] text-sm -mt-[14px] z-10"}>Increase
                  sales,
                  attract new
                  customers and double your income with us.</p>
                <Button text={"Learn More"} classes={"mt-[58px] z-10"}/>
              </div>
              {/*Become Partner*/}

              <div className="col-span-4 flex flex-col max-w-[1140px]">

                {/*slider*/}
                <div className={"flex flex-1"}>
                  <Slider/>
                </div>
                {/*slider*/}

                {/*Advertisement*/}
                <div className={"grid grid-rows-1 gap-[30px] grid-cols-3 mt-[32px]"}>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white]"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white]"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                  <div className={"rounded-xl flex justify-center items-center h-[120px] bg-[white]"}>
                    <p className={"text-sm text-black"}>Advertsment</p>
                  </div>
                </div>
                {/*Advertisement*/}

              </div>

            </div>

          </div>
          {/*Special offers*/}
          {vouchers.length > 0 && <div className={"flex flex-col w-full mt-[84px]"}>
						<div className={"container m-auto "}>
							<h1 className={"text-[28px] text-[#383838] font-bold"}>Special offers</h1>
							<div className={"mt-4"}>
								<OfferSlider data={vouchers}/>
							</div>
						</div>
					</div>}
          {/*Special offers*/}

          {/*Popular offers*/}
          <div className={"w-full"}>
            <div className={"mt-10 container m-auto mt-[76px] mb-[84px]"}>
              <Image
                  src={IMAGES.banner}
                  quality={70}
                  blurDataURL={IMAGES.placeholder.src}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"banner"}/>
            </div>

            {/*Popular offers */}
            {vouchers.length > 0 && <div className={"flex flex-col"}>
							<div className={"container m-auto"}>
								<h1 className={"text-[28px] text-[#383838] font-bold"}>Popular offers</h1>
								<div className={"mt-4"}>
									<OfferSlider data={vouchers}/>
								</div>
							</div>
						</div>}

          </div>
          {/*Popular offers*/}

          {/*categories*/}
          <div className={"w-full "}>
            <div className={"space-x-[30px] flex flex-row overflow-scroll container m-auto py-[84px]"}>

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

              <Link href={"/category/4"}>
                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-purple w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image src={IMAGES.bag} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           loading={"lazy"} alt={"bag image"} width={174} height={174}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Tourism</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>

              <Link href={"/category/4"}>
                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-[#7B92DC] w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image src={IMAGES.beauty} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           loading={"lazy"} alt={"beauty image"} width={174} height={174}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>beauty</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>

              <Link href={"/category/4"}>

                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-[#F5CE5A] w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image
                        src={IMAGES.food}
                        quality={70}
                        blurDataURL={IMAGES.placeholder.src}
                        placeholder="blur"
                        loading={"lazy"}
                        alt={"food image"}
                        width={174}
                        height={174}
                    />
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Food</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>
              <Link href={"/category/4"}>
                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-purple w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image src={IMAGES.entertainment} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           loading={"lazy"} alt={"entertainment image"} width={174} height={174}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Entertainment</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


              <Link href={"/category/4"}>
                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-[#56971F] w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image src={IMAGES.pool} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           loading={"lazy"} alt={"pool image"} width={174} height={174}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Pool</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>
              <Link href={"/category/4"}>

                <div
                    className={"flex justify-center flex-col bg-[white] w-full max-w-[230px] min-w-[230px] max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
                  <div className={"bg-[#7B92DC] w-[400px] h-[400px] rounded-[50%] absolute -top-[110%] "}/>
                  <div className={"mt-1"}>
                    <Image src={IMAGES.electronic} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           placeholder="blur"
                           loading={"lazy"} alt={"electronic image"} width={174} height={174}/>
                  </div>
                  <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1"}>Electronic</h4>
                  <p className={"font-[400] z-10 text-base text-[#38383880] mt-2"}>203 offer</p>
                </div>
              </Link>


            </div>
          </div>

          {/*categories*/}


          {/*New offers  */}
          <div className={"flex flex-col w-full pb-[98px]"}>

            {vouchers.length > 0 && <div className={"container m-auto"}>
							<h1 className={"text-[28px] text-[#383838] font-bold"}>New offers</h1>
							<div className={"mt-4 grid grid-flow-row-dense grid-cols-4 gap-[30px]"}>

                {
                    !!vouchersAll?.length && vouchersAll?.map((item: any, index: any) => {
                      return <OfferItem data={item} key={index}/>
                    })
                }

							</div>

							<div className={"flex justify-center mt-[48px] "}>
								<div
										className={"bg-purple rounded-xl h-[48px] w-min px-10 flex justify-center items-center cursor-pointer"}
										style={{
                      transition: "1s"
                    }}
										onClick={() => !isLoading && nextPage(page + 1)}>

									<p className={"text-[16px] text-[white] font-normal whitespace-nowrap"}>{isLoading ? "loading" : "Show all"}</p>
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

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//   const response = await fetch(`${baseApi}/vouchers?contractId=662`);
//   // const response = await fetch(`https://vouchers.pirveli.ge/api/racoon-transactions/vouchers?contractId=662`);
//   const serverData = await response.json();
//
//
//   return {
//     props: {
//       serverData,
//     },
//   };
// }

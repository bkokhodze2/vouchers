import Layout from "../../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image";
import React, {useEffect, useState} from "react";
// @ts-ignore
import Location from "/public/images/icons/location";
// @ts-ignore
import Phone from "/public/images/icons/phone";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import _ from "lodash";
import OfferItem from "../../../components/blocks/offer-item";
import dayjs from "dayjs";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dateFormat = 'HH:mm:s';

export default function Company() {
  const baseApi = process.env.baseApi;
  const Router = useRouter();
  const [voucher, setVoucher] = useState<any>([]);
  const [images, setImages] = useState<any>({
    main: "",
    cover: ""
  });


  useEffect(() => {
    setImages({
      main: _.get(voucher, '[0].additionalInfo[0].provider.providerAttachments', []).find((e: any) => {
        return e.isMain === 1
      }),
      cover: _.get(voucher, '[0].additionalInfo[0].provider.providerAttachments', []).find((e: any) => {
        return e.isCover === 1
      })
    })
  }, [voucher])


  // @ts-ignore
  let slug = Router?.query.slug?.replaceAll('-', ' ');

  useEffect(() => {
    if (slug) {
      axios.get(`${baseApi}/vouchers?contractId=662&providerName=${slug}&isValid=true`).then((res) => {
        setVoucher(res.data)
      })
    }

    // let b = _.get(voucher, '[0].additionalInfo[0].provider.providerAttachments', []).find((e: any) => {
    //   return e.isMain === 1
    // })
    //
    // let cover = _.get(voucher, '[0].additionalInfo[0].provider.providerAttachments', []).find((e: any) => {
    //   return e.isCover === 1
    // })

  }, [slug])


  const getWeekByNumber = (index: number) => {
    return weekDays[index - 1]
  }


  return (
      <>
        <Head>
          <title>company page</title>
          <meta name="description" content="Company"/>
        </Head>

        <div className={""}>
          <div
              className={"lg:pt-6 pt-0 pb-[100px] flex flex-col lg:flex-row container m-auto w-full grid-flow-col gap-[0px] lg:gap-[30px]"}>
            <div className={"flex  w-full h-[44px] lg:hidden block"}>
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
                  {
                    <div className={"cursor-pointer w-11 flex justify-center items-center cursor-pointer"}>
                      <Link href={_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "")}
                            target={"_blank"}>
                        <div className={"flex justify-center items-center"}>
                          <Image src={ICONS.fb} alt={"fb icon"}/>
                        </div>
                      </Link>
                    </div>
                  }
                  {
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
            {/*company info*/}
            <div className={"rounded-xl ph:min-w-[360px]"}>

              <div className={"sticky top-[130px] max-h-[calc(100vh_-_2rem)] overflow-scroll rounded-xl hidebar"}>

                <div className={"h-[160px] w-full relative bg-[#d9d9d933] rounded-t-xl"}>
                  {images?.cover?.path ? <img src={images?.cover?.path}
                                              loading={"lazy"}
                                              style={{objectFit: "cover", height: "160px", width: "100%"}}
                                              className={"rounded-t-xl"}
                                              alt={"company image"}
                  /> : <Image src={IMAGES.company}
                              quality={80}
                              blurDataURL={IMAGES.placeholder.src}
                              loading={"lazy"}
                              style={{objectFit: "cover"}}
                              layout={"fill"}
                              className={"rounded-t-xl"}
                              alt={"company image"}
                  />
                  }

                  <div className={"flex justify-center items-center w-full z-10 absolute -bottom-[40px]"}>
                    {images?.main?.path ? <img
                        src={images?.main?.path}
                        alt={"company logo"}
                        className={"w-[104px] h-[104px] rounded-[16px] object-cover"}
                        style={{
                          zIndex: 10
                        }}
                    /> : <Image src={IMAGES.detailsImg}
                                quality={80}
                                blurDataURL={IMAGES.placeholder.src}
                                placeholder="blur"
                                loading={"lazy"}
                                width={104}
                                height={104}
                                className={"z-10"}
                                alt={"company logo"}
                    />}

                  </div>

                </div>
                <div className={"p-4 pt-[60px] ph:px-6 ph:pb-4 bg-[#d9d9d933] rounded-b-xl"}>
                  <p className={"ph:text-[22px] text-[18px] font-bold text-[#383838] text-center aveSofBold"}>{_.get(voucher, '[0].additionalInfo[0].provider.name', "")}</p>
                  <div className={"flex space-x-[33px] items-center justify-center mt-6 lg:flex hidden"}>

                    <div className={"flex space-x-[33px] items-center "}>
                      {_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "").includes("https://") &&
													<div className={"cursor-pointer"}>
														<Link href={_.get(voucher, '[0].additionalInfo[0].provider.facebookUrl', "")}
														      target={"_blank"}>
															<div>
																<Image
																		src={ICONS.fb}
																		quality={60}
																		blurDataURL={IMAGES.placeholder.src}
																		loading={"lazy"}
																		alt={"fb icon"}
																/>
															</div>
														</Link>
													</div>
                      }
                      {_.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', null) && _.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "").includes("https://") &&
													<div className={"cursor-pointer"}>
														<Link href={_.get(voucher, '[0].additionalInfo[0].provider.instagramUrl', "")}
														      target={"_blank"}>
															<div>
																<Image
																		src={ICONS.insta}
																		quality={60}
																		blurDataURL={IMAGES.placeholder.src}
																		loading={"lazy"}
																		alt={"insta icon"}
																/>
															</div>
														</Link>
													</div>
                      }

                    </div>
                  </div>

                  <div
                      className={" mt-[71px] w-full lg:mt-[28px] bg-[white] px-6 rounded-xl divide-y divide-[#d9d9d94d]"}>
                    {_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', "") &&
												<div className={"flex py-[18px]"}>
													<Location classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
													<p className={"ml-2 text-base text-[#383838] aveSofRegular"}>{_.get(voucher, '[0].additionalInfo[0].provider.providerAddresses[0].value', "")}</p>
												</div>}

                    {_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', "") &&
												<div className={"flex py-[18px]"}>
													<Phone classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
													<a href="tel:+995 599 99 99 63"
													   className={"ml-2 text-base text-[#383838] aveSofRegular"}>{_.get(voucher, '[0].additionalInfo[0].provider.providerContacts[0].value', "")}</a>
												</div>}
                  </div>

                  <div
                      className={"w-full mt-6 bg-[white] p-6 top-[40px] space-y-5 rounded-xl transition duration-200 ease-in-out"}>

                    {
                      _.get(voucher, '[0].additionalInfo[0].provider.providerWorkingHours', []).map((item: any, index: number) => {
                        return <div className={"flex justify-between"} key={index}>
                          <p className={"mr-6 text-[#383838b3] aveSofRegular"}>{getWeekByNumber(item.dayId)}</p>
                          <p className={"text-[#383838] aveSofRegular"}>{dayjs(item.startHour).format(dateFormat).toString()} - {dayjs(item.endHour).format(dateFormat).toString()}</p>
                        </div>
                      })
                    }

                  </div>

                </div>
              </div>


            </div>
            {/*company info*/}

            {/*offers list*/}

            <div
                className={"mt-[44px] lg:mt-0 grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[30px] gap-y-[40px]"}>
              {
                voucher.map((item: any, index: number) => {
                  return <OfferItem data={item} key={index}/>
                })
              }

            </div>
            {/*offers list*/}

          </div>
        </div>
      </>
  )
}


Company.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

// export async function getServerSideProps({query}: any) {
//   const baseApi = process.env.baseApi;
//
//   let slug = query.slug?.replaceAll('-', ' ');
//
//   const responseVoucher = await fetch(`${baseApi}/vouchers?contractId=662&providerName=${slug}`);
//   // const responseVoucher = await fetch(`https://vouchers.pirveli.ge/api/racoon-transactions/vouchers?contractId=662&providerName=${slug}`);
//   const serverVoucher = await responseVoucher.json();
//
//   // let serverData = [1, 2, 3];
//
//   return {
//     props: {
//       serverVoucher,
//     },
//   };
// }

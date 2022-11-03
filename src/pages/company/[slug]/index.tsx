import Layout from "../../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import OfferItem from "../../../components/blocks/offer-item";
import {detailsImg} from "../../../../public/images/images";
import Location from "../../../../public/images/icons/location";
import Phone from "../../../../public/images/icons/phone";
import Link from "next/link";
import quantity from "../../../components/UI/quantity";
import {useRouter} from "next/router";
import axios from "axios";


export default function Company() {
  const baseApi = process.env.baseApi;
  const Router = useRouter();
  const [voucher, setVoucher] = useState<any>([]);

  // @ts-ignore
  let slug = Router?.query.slug?.replaceAll('-', ' ');

  useEffect(() => {
    if (slug) {
      axios.get(`${baseApi}/vouchers?contractId=662&providerName=${slug}`).then((res) => {
        setVoucher(res.data)
      })
    }

  }, [slug])


  return (
      <>
        <Head>
          <title>company page</title>
          <meta name="description" content="Company"/>
        </Head>

        <div className={"bg-[#F5F6F8]"}>
          <div className={"grid grid-rows-1 pt-6 pb-[100px] grid-cols-4 container m-auto grid-flow-col gap-[30px]"}>

            {/*company info*/}
            <div className={"rounded-xl"}>

              <div className={"sticky top-[130px] max-h-[calc(100vh_-_2rem)] overflow-scroll rounded-xl"}>
                <div className={"h-[160px] w-full relative bg-[#d9d9d933] rounded-t-xl "}>
                  <Image src={IMAGES.company}
                         quality={80}
                         blurDataURL={IMAGES.company.src}
                         placeholder="blur"
                         loading={"lazy"}
                         style={{objectFit: "cover"}}
                         layout={"fill"}
                         className={"rounded-t-xl"}
                         alt={"company image"}
                  />

                  <div className={"flex justify-center items-center w-full z-10 absolute -bottom-[40px]"}>
                    <Image src={IMAGES.detailsImg}
                           quality={80}
                           blurDataURL={IMAGES.detailsImg.src}
                           placeholder="blur"
                           loading={"lazy"}
                           width={104}
                           height={104}
                           className={"z-10"}
                           alt={"company logo"}

                    />
                  </div>
                </div>
                <div className={"pt-[60px] px-6 pb-4 bg-[#d9d9d933] rounded-b-xl"}>
                  <p className={"text-[22px] font-bold text-[#383838] text-center"}>{voucher[0]?.additionalInfo[0]?.provider.name}</p>
                  <div className={"flex space-x-[33px] items-center justify-center mt-6"}>

                    <div className={"flex space-x-[33px] items-center"}>
                      {voucher[0]?.additionalInfo[0]?.provider.facebookUrl && <div className={"cursor-pointer"}>
												<Link href={voucher[0]?.additionalInfo[0]?.provider.facebookUrl}
															target={"_blank"}>
													<Image
															src={ICONS.fb}
															quality={60}
															blurDataURL={ICONS.fb}
															placeholder="blur"
															loading={"lazy"}
															alt={"fb icon"}

													/>
												</Link>
											</div>
                      }
                      {
                          voucher[0]?.additionalInfo[0]?.provider.instagramUrl &&
													<div className={"cursor-pointer"}>
														<Link href={voucher[0]?.additionalInfo[0]?.provider.instagramUrl} target={"_blank"}>
															<Image
																	src={ICONS.insta}
																	quality={60}
																	blurDataURL={ICONS.insta}
																	placeholder="blur"
																	loading={"lazy"}
																	alt={"insta icon"}
															/>
														</Link>
													</div>
                      }

                    </div>
                  </div>

                  <div className={"w-full mt-[28px] bg-[white] px-6 rounded-xl divide-y divide-[#d9d9d94d]"}>
                    {voucher[0]?.additionalInfo[0]?.provider?.providerAddresses[0]?.value &&
												<div className={"flex py-[18px]"}>
													<Location classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
													<p className={"ml-2 text-base text-[#383838]"}>{voucher[0]?.additionalInfo[0]?.provider?.providerAddresses[0]?.value}</p>
												</div>}

                    {voucher[0]?.additionalInfo[0]?.provider?.providerContacts[0]?.value &&
												<div className={"flex py-[18px]"}>
													<Phone classes={"group-hover:stroke-[#8338EC] stroke-[#383838]"}/>
													<a href="tel:+995 599 99 99 63"
														 className={"ml-2 text-base text-[#383838]"}>{voucher[0]?.additionalInfo[0]?.provider?.providerContacts[0]?.value}</a>
												</div>}
                  </div>

                  <div
                      className={"w-full mt-6 bg-[white] p-6 top-[40px] space-y-5 rounded-xl transition duration-200 ease-in-out"}>

                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>Monday</p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>Monda s sy</p>
                      <p className={"text-[#383838] text-base"}>10:00 - 21:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>dsds sd</p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>sd s gs</p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>Mond sfsaay</p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>Mon sfsfs day</p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>
                    <div className={"flex justify-between"}>
                      <p className={"mr-6 text-[#383838b3] text-base"}>f ssff s f </p>
                      <p className={"text-[#383838] text-base"}>09:00 - 22:00</p>
                    </div>

                  </div>

                </div>
              </div>


            </div>
            {/*company info*/}

            {/*offers list*/}
            <div className={"col-span-3"}>
              <div className={"grid grid-flow-row-dense grid-cols-3 gap-[30px] gap-y-[40px]"}>

                {
                  voucher.map((item: any, index: number) => {
                    return <OfferItem data={item} key={index}/>
                  })
                }

              </div>
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

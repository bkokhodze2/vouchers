import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import React, {useEffect, useState} from "react";
// @ts-ignore
import Lari from "/public/images/icons/lari";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../../components/slices/cartSlice";
import dynamic from "next/dynamic";
import _ from "lodash";
import Image from "next/image";
import {useRouter} from "next/router";
import Button from "../../components/UI/button";
import {notification} from "antd";


const CartItem = dynamic(
    () => import('../../components/blocks/cart/cart-item'),
    {ssr: false}
)

// ----------- bug cart?.cartItems?.length idzleva Hydration failed errors

export default function Cart({serverData, productCount}: any) {
  const baseApi = process.env.baseApi;
  const Router = useRouter();

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [payType, setPayType] = useState<string>("");
  const [errorAnim, setErrorAnim] = useState<boolean>(false);

  const getCount = (count: number) => {
  }

  useEffect(() => {
    dispatch(getTotals({}));
  }, [cart, dispatch]);


  const shake = () => {

    if (payType.length === 0) {
      setErrorAnim(true)
      setTimeout(() => {
        setErrorAnim(false)
      }, 1000)
    }

  }

  const pay = () => {

    let arr = cart.cartItems.filter((e: any) => e.isPoint === false);

    if (payType === "bog") {
      let bogObj = {
        "user_id": null,
        "contract_id": null,
        "party_id": null,
        "bog_order_request_dto": {
          "intent": "AUTHORIZE",
          "items":
              arr.map((e: any) => {
                return {
                  "amount": _.get(e, '[0].entries[0].entryAmount', 1),
                  "description": _.get(e, '[0].additionalInfo[0].provider.name', ""),
                  "quantity": _.get(e, 'cartQuantity', 1),
                  "product_id": _.get(e, '[0].additionalInfo[0].genericTransactionTypeId', 1)
                }
              })
          ,
          "locale": "ka",
          "shop_order_id": "123456",
          "redirect_url": "https://vouchers.pirveli.com",
          "show_shop_order_id_on_extract": true,
          "capture_method": "AUTOMATIC",
          "purchase_units": [
            {
              "amount": {
                "currency_code": "GEL",
                "value": cart.cartTotalPrice
              }
            }
          ]
        }
      }
      axios.post(`https://vouchers.pirveli.com/api/bog/orders`, bogObj).then((res) => {
        let link = res.data.links[1].href;
        typeof window !== 'undefined' && window.open(link, '_blank');

      })
    } else if (payType === "tbc") {
      let tbcObj = {
        "user_id": null,
        "contract_id": null,
        "party_id": null,
        "items": arr.map((e: any) => {
          return {
            "amount": _.get(e, '[0].entries[0].entryAmount', 1),
            "description": _.get(e, '[0].additionalInfo[0].provider.name', ""),
            "quantity": _.get(e, 'cartQuantity', 1),
            "product_id": _.get(e, '[0].additionalInfo[0].genericTransactionTypeId', 1)
          }
        }),
        "tbc_payment_request_dto": {
          "amount": {
            "currency": "GEL",
            "total": cart.cartTotalPrice,
            "subTotal": 0,
            "tax": 0,
            "shipping": 0
          },
          "returnurl": "https://vouchers.pirveli.com/success",
          "userIpAddress": "127.0.0.1",
          "methods": [5],
          "expirationMinutes": "5",
          "callbackUrl": "https://banking-tbc.pirveli.ge/api/tbc/payments/callback",
          "preAuth": false,
          "language": "EN",
          "merchantPaymentId": "1",
          "saveCard": false
        }
      }
      axios.post(`https://vouchers.pirveli.com/api/tbc/payments`, tbcObj).then((res) => {
        let link = res.data.links[1].uri;
        typeof window !== 'undefined' && window.open(link, '_blank');

      })
    } else if (payType === "") {
      shake()
    }

  }

  const payWithPoints = () => {

    if (cart?.totalPoint > 0) {
      let arr = cart.cartItems.filter((e: any) => e.isPoint);

      let obj = {
        "fullAmountOfPoints": cart?.totalPoint,
        "items": arr.map((e: any) => {
          return {
            "productName": _.get(e, '[0].additionalInfo[0].provider.name', ""),
            "itemPrice": _.get(e, '[0].entries[0].entryAmount', 1) / _.get(e, '[0].entries[0].multiplier', 0),
            "quantity": _.get(e, 'cartQuantity', 1),
            "voucherId": _.get(e, '[0].additionalInfo[0].genericTransactionTypeId', 1)
          }
        })
      }

      // _.get(voucher, '[0].entries[0].entryAmount', 0) * _.get(voucher, '[0].entries[0].multiplier', 0)
      axios.post(`${baseApi}/vouchers/buy-with-points`, obj).then((res) => {

        notification['success']({
          message: 'თქვენ წარმატებით შეიძინეთ ვაუჩერი',
        });

        // arr.map((e: any) => {
        //   removeFromCart(e);
        // })

        Router.push("/")

      }).catch((res) => {
        notification['error']({
          message: 'თქვენს ანგარიშზე არ არის საკმარისი მონეტები',
        });
      })
    }

  }


  return (
      <>
        <Head>
          <title>cart page</title>
          <meta name="description" content="cart"/>
        </Head>

        <div className={""}>
          <div
              className={"min-h-[60vh] mt-0 md:mt-6 ph:container con ph:m-auto mb-[100px] flex flex-col xl:flex-row w-full gap-4 2xl:gap-[30px]"}>

            {/*cart list*/}
            <div className={"flex flex-col w-full"}>
              {/*head*/}
              <div className={"hidden md:flex items-center"}>
                <p className={"text-[#383838] text-[28px] font-bold relative after:content-[''] after:h-[20px] after:top-[12px] after:bg-[#38383833] after:rounded-[2px] after:ml-4 after:absolute after:w-[1px] after:text-red-500 aveSofBold"}>
                  ჩემი კალათა</p>
                <p className={"text-[#38383899] text-base ml-[25px] aveSofRegular"}>{cart?.productCount} პროდუქტი</p>
              </div>
              {/*head*/}

              <div className={"flex flex-col space-y-[16px] ph:space-y-[25px] mt-4 "}>
                {cart?.cartItems?.map((item: any, index: number) => {
                  return <CartItem data={item} getCount={getCount} key={index}/>
                })}

                {cart?.cartItems?.length === 0 && <div
										className={"mt-9 m-auto w-full max-w-[490px] flex justify-center items-center flex flex-col "}>
									<div className={"max-w-[250px]"}>
										<Image src={IMAGES.notFound}
										       quality={60}
										       blurDataURL={IMAGES.placeholder.src}
										       placeholder="blur"
										       loading={"lazy"}
										       alt={"not found image"}
										       style={{objectFit: "cover"}}/>
									</div>
									<p className={"!uppercase mt-10 text-[#383838] text-[28px] font-bold aveSofBold"}>კალათა ცარიელია</p>
									<div onClick={() => Router.push('/')}>
										<Button bgColor={"#383838"} textColor={"white"} text={"უკან დაბრუნება"}
										        classes={"mt-6 aveSofRegular"}/>
									</div>

								</div>}

              </div>

            </div>
            {/*cart list*/}

            {/*cart info*/}
            {cart?.cartItems?.length > 0 &&
								<div className={"h-auto ph:min-w-[340px] xl:min-w-[360px] shrink-0 px-[16px] ph:px-0"}>
									<h5 className={"text-[#383838] text-[28px] font-bold hidden ph:block aveSofBold"}>შეკვეთა</h5>

									<div
											className={"sticky top-[130px] max-h-[628¬px] pb-[90px] md:pb:0 overflow-scroll rounded-xl hidebar"}>

										<div className={"rounded-xl bg-[white] ph:px-6 mt-4 ph:pt-[30px] ph:pb-[54px] p-4"}>
											<h5 className={"text-[#383838] text-[18px] font-bold block ph:hidden mb-[16px] aveSofBold"}>შეკვეთა</h5>
											<div className={"flex items-center w-full justify-between "}>
												<p className={"ph:text-[22px] text-base text-[#38383899] aveSofRegular"}>ვაუჩერის რაოდენობა</p>
												<p className={"ph:text-[22px] text-base text-[#38383899] font-[500] aveSofMedium"}>{cart?.cartTotalQuantity}</p>
											</div>

											<div className={"h-[1px] w-full bg-[#38383833] rounded-xl mt-6 mb-[30px]"}/>

											<div className={"flex justify-between"}>
												<p className={"text-[#383838] ph:text-[28px] text-[18px] font-bold aveSofBold"}>ჯამური ფასი</p>
												<div className={"flex items-center"}>
													<Lari color={"#E35A43"} height={18} width={18}/>
													<p className={"ph:text-[22px] text-[18px] text-[#E35A43] aveSofMedium"}>{cart?.cartTotalPrice}</p>
												</div>
											</div>

											<div className={"flex justify-between"}>
												<p className={"text-[#383838] ph:text-[28px] text-[18px] font-bold aveSofBold"}>ჯამური
													ქულები</p>
												<div className={"flex items-center"}>
													<p className={"z-10 text-[20px] text-[#E35A43] font-bold transition ml-[10px] mr-1.5"}>
														<Image
																src={IMAGES.coin}
																quality={100}
																blurDataURL={IMAGES.placeholder.src}
																loading={"lazy"}
																width={16}
																height={16}
																alt={"coin icon"}
														/>
													</p>
													<p className={"ph:text-[22px] text-[18px] text-[#E35A43] aveSofMedium"}>{cart?.totalPoint}</p>
												</div>
											</div>

										</div>
										<div className={"items-end flex justify-center overflow-hidden"}
										     style={{
                           height: payType.length === 0 ? "30px" : "0px",
                           opacity: payType.length === 0 ? 1 : 0,
                           transition: "0.3s linear all"
                         }}
										>
											<p
													className={`animate__animated animate__fast ${errorAnim ? "animate__shakeX" : ""}`}
													style={{
                            color: errorAnim ? "#ff4d4f" : "#383838",
                            transition: ".2s linear all"
                          }}
											>აირჩიეთ
												გადახდის
												მეთოდი</p>
										</div>
										<div
												className={`grid grid-rows-1 grid-cols-2 h-[48px] gap-x-3 mt-6`}>
											<div onClick={() => setPayType("bog")}
											     style={{
                             border: payType === "bog" ? "1px solid #8338EC" : "1px solid transparent"
                           }}
											     className={"w-full bg-[white] flex justify-center items-center rounded-xl cursor-pointer"}>
												<Image
														src={ICONS.bog}
														quality={70}
														loading={"lazy"}
														alt={"coin icon"}

												/>
											</div>
											<div onClick={() => setPayType("tbc")}
											     style={{
                             border: payType === "tbc" ? "1px solid #8338EC" : "1px solid transparent"
                           }}
											     className={"w-full bg-[white] flex justify-center items-center rounded-xl cursor-pointer"}>
												<Image
														src={ICONS.tbc}
														quality={70}
														loading={"lazy"}
														alt={"coin icon"}

												/>
											</div>
										</div>
										<div
												onClick={() => pay()}
												style={{
                          backgroundColor: payType ? "#8338EC" : "gray",
                        }}
												className={"cursor-pointer w-full h-12 mt-6 rounded-xl flex justify-center items-center"}>
											<p className={"text-base font-[500] text-base text-[white] aveSofMedium"}>ყიდვა</p>
										</div>
										<p className={"text-center mt-3"}>ან</p>
										<div
												onClick={() => payWithPoints()}
												className={"cursor-pointer w-full bg-[#DB0060] h-12 mt-3 rounded-xl flex justify-center items-center"}
												style={{
                          backgroundColor: cart?.totalPoint === 0 ? "gray" : "#DB0060"
                        }}
										>
											<p className={"text-base font-[500] text-base text-[white] aveSofMedium"}>ქულებით ყიდვა</p>
										</div>

									</div>

								</div>}
            {/*cart info*/}

          </div>
        </div>
      </>
  )
}


Cart.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

export async function getStaticProps({}) {
  return {
    props: {}, // will be passed to the page component as props
  }
}



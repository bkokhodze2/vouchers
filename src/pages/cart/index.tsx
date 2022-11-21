import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useEffect, useState} from "react";
import Lari from "../../../public/images/icons/lari";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
  getTotals,
} from "../../components/slices/cartSlice";
import dynamic from "next/dynamic";
import _ from "lodash";
import Image from "next/image";

// import CartItem from "../../components/blocks/cart/cart-item";

const CartItem = dynamic(
    () => import('../../components/blocks/cart/cart-item'),
    {ssr: false}
)

export default function Cart({serverData, productCount}: any) {
  const baseApi = process.env.baseApi;

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [payType, setPayType] = useState<string>("bog");


  const getCount = (count: number) => {
  }

  useEffect(() => {
    dispatch(getTotals({}));
  }, [cart, dispatch]);


  const pay = () => {

    let arr = cart.cartItems.filter((e: any) => e.isPoint === false);

    let bogObj = {
      "user_id": 1,
      "contract_id": 572,
      "party_id": -1234567,
      "bog_order_request_dto": {
        "intent": "AUTHORIZE",
        "items":
            arr.map((e: any) => {
              return {
                "amount": _.get(e, '[0].entries[0].entryAmount', 1),
                "description": _.get(e, 'additionalInfo[0].provider.name', ""),
                "quantity": _.get(e, 'cartQuantity', 1),
                "product_id": _.get(e, '[0].additionalInfo[0].genericTransactionTypeId', 1)
              }
            })
        ,
        "locale": "ka",
        "shop_order_id": "123456",
        "redirect_url": "https://bog-banking.pirveli.ge/callback/statusChange",
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

    let tbcObj = {
      "user_id": 1,
      "contract_id": 572,
      "party_id": -1234567,
      "items": arr.map((e: any) => {
        return {
          "amount": _.get(e, '[0].entries[0].entryAmount', 1),
          "description": _.get(e, '[0].title', ""),
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
        "returnurl": "https://banking-tbc.pirveli.ge/v1/tpay/payments/callback",
        "userIpAddress": "127.0.0.1",
        "methods": [5],
        "expirationMinutes": "5",
        "callbackUrl": "https://banking-tbc.pirveli.ge/v1/tpay/payments/callback",
        "preAuth": false,
        "language": "EN",
        "merchantPaymentId": "1",
        "saveCard": false
      }
    }


    if (payType === "bog") {
      axios.post(`https://vouchers.pirveli.ge/api/bog/orders`, bogObj).then((res) => {
        let link = res.data.links[1].href;
        typeof window !== 'undefined' && window.open(link, '_blank');

      })
    } else {
      axios.post(`https://vouchers.pirveli.ge/api/tbc/payments`, tbcObj).then((res) => {
        let link = res.data.links[1].uri;
        typeof window !== 'undefined' && window.open(link, '_blank');

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
              className={"min-h-[60vh] mt-0 md:mt-6 ph:container con ph:m-auto mb-[100px] flex flex-col xl:flex-row w-full gap-[30px]"}>

            {/*cart list*/}
            <div className={"flex flex-col w-full"}>
              {/*head*/}
              <div className={"hidden md:flex items-center"}>
                <p className={"text-[#383838] text-[28px] font-bold relative after:content-[''] after:h-[20px] after:top-[12px] after:bg-[#38383833] after:rounded-[2px] after:ml-4 after:absolute after:w-[1px] after:text-red-500"}>
                  My cart</p>
                <p className={"text-[#38383899] text-base ml-[25px]"}>{cart?.productCount} products</p>
              </div>
              {/*head*/}

              <div className={"flex flex-col space-y-[16px] ph:space-y-[25px] mt-0 md:mt-4 "}>
                {cart?.cartItems?.map((item: any, index: number) => {
                  return <CartItem data={item} getCount={getCount} key={index}/>
                })}

              </div>

            </div>
            {/*cart list*/}

            {/*cart info*/}
            <div className={"h-auto ph:min-w-[340px] xl:min-w-[360px] shrink-0 px-[16px] ph:px-0"}>
              <h5 className={"text-[#383838] text-[28px] font-bold hidden ph:block"}>Order</h5>

              <div className={"sticky top-[130px] max-h-[600px] pb-[90px] md:pb:0 overflow-scroll rounded-xl"}>

                <div className={"rounded-xl bg-[white] ph:px-6 mt-4 ph:pt-[30px] ph:pb-[54px] p-4"}>
                  <h5 className={"text-[#383838] text-[18px] font-bold block ph:hidden mb-[16px]"}>Order</h5>
                  <div className={"flex items-center w-full justify-between "}>
                    <p className={"ph:text-[22px] text-base text-[#38383899]"}>Number of vouchers</p>
                    <p className={"ph:text-[22px] text-base text-[#38383899] font-[500]"}>{cart?.cartTotalQuantity}</p>
                  </div>

                  <div className={"h-[1px] w-full bg-[#38383833] rounded-xl mt-6 mb-[30px]"}/>

                  <div className={"flex justify-between"}>
                    <p className={"text-[#383838] ph:text-[28px] text-[18px] font-bold "}>Total Price</p>
                    <div className={"flex items-center"}>
                      <Lari color={"#E35A43"} height={18} width={18}/>
                      <p className={"ph:text-[22px] text-[18px] text-[#E35A43]"}>{cart?.cartTotalPrice}</p>
                    </div>
                  </div>

                  <div className={"flex justify-between"}>
                    <p className={"text-[#383838] ph:text-[28px] text-[18px] font-bold"}>Total Points</p>
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
                      <p className={"ph:text-[22px] text-[18px] text-[#E35A43]"}>{cart?.totalPoint}</p>
                    </div>
                  </div>

                </div>
                <div className={"grid grid-rows-1 grid-cols-2 h-[48px] gap-x-3 mt-6"}>
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
                      backgroundColor: payType ? "#8338EC" : "gray"
                    }}
                    className={"cursor-pointer w-full h-12 mt-6 rounded-xl flex justify-center items-center"}>
                  <p className={"text-base font-[500] text-base text-[white]"}>Buy</p>
                </div>

              </div>

            </div>
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



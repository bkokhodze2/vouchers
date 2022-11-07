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

const CartItem = dynamic(
    () => import('../../components/blocks/cart/cart-item'),
    {ssr: false}
)

export default function Cart({serverData, productCount}: any) {
  const baseApi = process.env.baseApi;

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const getCount = (count: number) => {
  }

  useEffect(() => {
    dispatch(getTotals({}));
  }, [cart, dispatch]);


  const pay = () => {
    console.log("eee", cart)

    let arr = cart.cartItems.filter((e: any) => e.isPoint === false);

    let obj = {
      "user_id": 1,
      "contract_id": 572,
      "party_id": -1234567,
      "bog_order_request_dto": {
        "intent": "AUTHORIZE",
        "items":
            arr.map((e: any) => {

              console.log("_.get(e, 'cartQuantity', 1)", _.get(e, 'cartQuantity', 1))

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

    console.log("obj", obj)

    axios.post(`https://vouchers.pirveli.ge/api/bog/orders`, obj).then((res) => {
      let link = res.data.links[1].href;

      typeof window !== 'undefined' && window.open(link, '_blank');

    })
  }


  return (
      <>
        <Head>
          <title>cart page</title>
          <meta name="description" content="cart"/>
        </Head>

        <div className={"bg-[white] flex flex-col flex-1"}>
          <div
              className={"min-h-[60vh] grid grid-rows-1 mt-6 mb-[100px] grid-cols-4 container m-auto grid-flow-col gap-[30px]"}>

            {/*cart list*/}
            <div className={"col-span-3"}>
              {/*head*/}
              <div className={"flex items-center"}>
                <p className={"text-[#383838] text-[28px] font-bold relative after:content-[''] after:h-[20px] after:top-[12px] after:bg-[#38383833] after:rounded-[2px] after:ml-4 after:absolute after:w-[1px] after:text-red-500"}>
                  My cart</p>
                <p className={"text-[#38383899] text-base ml-[25px]"}>{cart?.productCount} products</p>
              </div>
              {/*head*/}

              <div className={"flex flex-col space-y-[25px] mt-4"}>
                {cart?.cartItems?.map((item: any, index: number) => {
                  return <CartItem data={item} getCount={getCount} key={index}/>
                })}

              </div>

            </div>
            {/*cart list*/}

            {/*cart info*/}
            <div className={"h-full"}>
              <h5 className={"text-[#383838] text-[28px] font-bold "}>Order</h5>

              <div className={"sticky top-[130px] max-h-[500px] overflow-scroll rounded-xl"}>
                <div className={"rounded-xl bg-[#F7F7F7] px-6 mt-4 pt-[30px] pb-[54px]"}>

                  <div className={"flex items-center w-full justify-between"}>
                    <p className={"text-[22px] text-[#38383899]"}>Voucher prices</p>
                    <p className={"text-[22px] text-[#38383899] font-[500] "}>199.98</p>
                  </div>

                  <div className={"flex items-center w-full justify-between mt-6"}>
                    <p className={"text-[22px] text-[#38383899]"}>Number of vouchers</p>
                    <p className={"text-[22px] text-[#38383899] font-[500]"}>{cart?.cartTotalQuantity}</p>
                  </div>

                  <div className={"h-[1px] w-full bg-[#38383833] rounded-xl mt-12 mb-[30px]"}/>

                  <div className={"flex justify-between"}>
                    <p className={"text-[#383838] text-[28px] font-bold "}>Total Price</p>
                    <div className={"flex items-center"}>
                      <Lari color={"#E35A43"} height={18} width={18}/>
                      <p className={"text-[22px] text-[#E35A43]"}>{cart?.cartTotalPrice}</p>
                    </div>
                  </div>

                  <div className={"flex justify-between"}>
                    <p className={"text-[#383838] text-[28px] font-bold "}>Total Points</p>
                    <div className={"flex items-center"}>
                      <p className={"z-10 text-[20px] text-[#E35A43] font-bold transition ml-[10px] pb-[2px] mr-1.5"}>p</p>
                      <p className={"text-[22px] text-[#E35A43]"}>{cart?.totalPoint}</p>
                    </div>
                  </div>


                </div>
                <div
                    onClick={() => pay()}
                    className={"cursor-pointer w-full h-12 mt-6 rounded-xl bg-purple flex justify-center items-center"}>
                  <p className={"text-base font-[500] text-base text-[white]"}>Buy</p></div>
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



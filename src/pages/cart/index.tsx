import Layout from "../../components/layouts/user-layout"
import Head from 'next/head'
// @ts-ignore
import {IMAGES, ICONS} from "public/images";
import React, {useEffect, useState} from "react";
import Lari from "../../../public/images/icons/lari";
import Quantity from "../../components/UI/quantity";

// import CartItem from "../../components/blocks/cart/cart-item";

const CartItem = dynamic(
    () => import('../../components/blocks/cart/cart-item'),
    {ssr: false}
)

import {useDispatch, useSelector} from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../components/slices/cartSlice";
import dynamic from "next/dynamic";

export default function Cart({serverData}: any) {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  console.log("cart", cart)

  const getCount = (count: number) => {
  }

  useEffect(() => {
    dispatch(getTotals({}));
  }, [cart, dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart({}));
  };


  return (
      <>
        <Head>
          <title>details page</title>
          <meta name="description" content="Company"/>
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
                <p className={"text-[#38383899] text-base ml-[25px]"}>{cart?.cartItems?.length} products</p>
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

              <div className={"sticky top-[130px] max-h-[383px] overflow-scroll rounded-xl"}>
                <div className={"rounded-xl bg-[#F7F7F7] px-6 mt-4 pt-[30px] pb-[54px]"}>

                  <div className={"flex items-center w-full justify-between"}>
                    <p className={"text-[22px] text-[#38383899]"}>Voucher prices</p>
                    <p className={"text-[22px] text-[#38383899] font-[500] "}>199.98</p>
                  </div>

                  <div className={"flex items-center w-full justify-between mt-6"}>
                    <p className={"text-[22px] text-[#38383899]"}>Number of vouchers</p>
                    <p className={"text-[22px] text-[#38383899] font-[500]"}>{cart.cartTotalQuantity}</p>
                  </div>

                  <div className={"h-[1px] w-full bg-[#38383833] rounded-xl mt-12 mb-[30px]"}/>

                  <div className={"flex justify-between"}>
                    <p className={"text-[#383838] text-[28px] font-bold "}>Total</p>
                    <div className={"flex items-center"}>
                      <Lari color={"#E35A43"} height={18} width={18}/>
                      <p className={"text-[22px] text-[#E35A43]"}>{cart.cartTotalPrice}</p>
                    </div>
                  </div>
                </div>
                <div
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

export async function getServerSideProps({query}: any) {
  const baseApi = process.env.baseApi;


  // const response = await fetch(`${baseApi}/company/${query.slug}`);

  // const data = await response.json();
  // let serverData = data.data;
  let serverData = [1, 2, 3];

  return {
    props: {
      serverData,
    },
  };
}

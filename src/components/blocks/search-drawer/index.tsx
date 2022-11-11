import React, {useEffect, useState} from "react"
import Rate from "antd/lib/rate";
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"

import Link from "next/link";
import {ecomerce, logOut, menuPercent, orders, settings, whoWeAre} from "../../../../public/images/icons";

interface Isearch {
  isOpenMenu: boolean
}

interface INavItem {
  text: string
  bg?: string
  iconSize?: number
  color?: string
  icon: any
}

const SearchDrawer = ({isOpenMenu}: Isearch) => {

  const NavItem = ({text, icon, iconSize = 15, bg = "#D9D9D933", color = "white"}: INavItem) => {
    return <div className={"w-full h-[48px] p-4 flex items-center bg-[#F5CE5A] rounded-[8px] cursor-pointer "}
                style={{
                  backgroundColor: bg
                }}
    >
      <Image src={icon} width={iconSize} height={iconSize} layout={"fixed"}/>
      <p className={" text-base ml-3"}
         style={{
           color: color
         }}
      >{text}</p>
    </div>
  }

  return (
      <div className={"fixed top-[80px] bottom-[83px] z-50 bg-[white]  w-full"}
           style={{
             transition: "all 0.2s ease-in-out 0s",
             left: isOpenMenu ? "0%" : "100%"
           }}
      >

        <div className={"w-full p-4 overflow-y-scroll flex flex-col justify-between"}
             style={{
               height: "calc(100vh - 163px)"
             }}
        >

        </div>
      </div>
  )
}

export default SearchDrawer;

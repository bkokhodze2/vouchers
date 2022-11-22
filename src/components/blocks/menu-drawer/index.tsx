import React, {useEffect, useState} from "react"
import {Rate} from "antd";
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"

import Link from "next/link";
import {
  advertisement,
  ecomerce,
  logOut,
  menuPercent,
  orders,
  settings,
  whoWeAre
} from "../../../../public/images/icons";

interface IMenu {
  isOpenMenu: boolean
}

interface INavItem {
  text: string
  bg?: string
  iconSize?: number
  color?: string
  icon: any
}

const MenuDrawer = ({isOpenMenu}: IMenu) => {

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

        <div className={"w-full p-4 overflow-y-scroll"}
             style={{
               height: "calc(100vh - 163px)"
             }}
        >
          {/*// profile*/}
          <div className={"flex justify-between p-3 pr-6 bg-[#D9D9D933] rounded-[8px] items-center"}>
            <div className={"flex items-center"}>
              <Image src={IMAGES.avatar} width={36} height={36} layout={"fixed"}/>
              <div className={"flex flex-col ml-3"}>
                <p className={"text-[#383838] text-sm"}>Vano Tvauri</p>
                <div className={"flex"}>
                  <Image src={IMAGES.coin} width={16} height={16} layout={"fixed"}/>
                  <p className={"text-[#00000066] text-sm ml-2"}>2,945 Point</p>
                </div>
              </div>
            </div>
            <Image className={"cursor-pointer"} src={ICONS.logOut} width={18} height={18}/>
          </div>
          {/*// profile*/}

          <div className={"mt-3"}>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.orders} text={"Orders"} iconSize={17} color={"#383838"}/>
              {/*<NavItem icon={ICONS.settings} text={"Settings"} color={"#383838"}/>*/}
              <NavItem icon={ICONS.leaderboard} iconSize={20} text={"Leaderboard"} color={"#383838"}/>
              <NavItem icon={ICONS.tickets} text={"tickets"} color={"#383838"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880]"}>Navigatioon</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.ecomerce} text={"E-commerce"} bg={"#F5CE5A"}/>
              <NavItem icon={ICONS.medical} text={"Medical Card"} bg={"#7B92DC"}/>
              <NavItem icon={ICONS.lotto} iconSize={20} text={"Lotto"} bg={"#56971F"}/>
              <NavItem icon={ICONS.menuPercent} text={"Discounts"} bg={"#E35A43"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880]"}>Company</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.whoWeAre} iconSize={18} text={"Who we are"} color={"#383838"}/>
              <NavItem icon={ICONS.faq} iconSize={18} text={"FAQ"} color={"#383838"}/>
              <NavItem icon={ICONS.contactUs} iconSize={18} text={"Contact us"} color={"#383838"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880]"}>User</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.flash} iconSize={18} text={"How it works"} color={"#383838"}/>
              <NavItem icon={ICONS.tc} iconSize={24} text={"T&C"} color={"#383838"}/>
              <NavItem icon={ICONS.gift} iconSize={18} text={"Bonus points"} color={"#383838"}/>
              <NavItem icon={ICONS.privacy} iconSize={24} text={"Privacy Policy"} color={"#383838"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880]"}>For business</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.advertisement} iconSize={18} text={"Advertisement"} color={"#383838"}/>
              <NavItem icon={ICONS.partnership} iconSize={18} text={"Partnership"} color={"#383838"}/>
            </div>
          </div>


        </div>
      </div>
  )
}

export default MenuDrawer;

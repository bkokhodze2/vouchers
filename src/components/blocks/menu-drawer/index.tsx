import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import axios from "axios";

interface IMenu {
  isOpenMenu: boolean
}

interface INavItem {
  text: string
  bg?: string
  iconSize?: number
  color?: string
  icon: any
  url?: string
}

const MenuDrawer = ({isOpenMenu}: IMenu) => {
  const baseApi = process.env.baseApi;

  const [points, setPoints] = useState<number>(0);
  const userInfo = useSelector((state: any) => state.userInfo.userInfo);
  const Router = useRouter();

  useEffect(() => {
    axios
        .get(`${baseApi}/vouchers/get-user-points`)
        .then((res) => {
          setPoints(res.data.amountOfPoints)
        });
  }, [])

  const getChosenAvatar = () => {

    switch (parseInt(userInfo?.avatar?.path)) {
      case 1:
        return IMAGES.avatar1.src
      case 2:
        return IMAGES.avatar2.src
      case 3:
        return IMAGES.avatar3.src
      case 4:
        return IMAGES.avatar4.src
      case 5:
        return IMAGES.avatar5.src
      case 6:
        return IMAGES.avatar6.src
      default :
        return IMAGES.avatar1.src
    }

  }

  const NavItem = ({text, icon, iconSize = 15, bg = "#D9D9D933", color = "white", url = "/"}: INavItem) => {
    return <div className={"w-full h-[48px] p-4 flex items-center bg-[#F5CE5A] rounded-[8px] cursor-pointer "}
                onClick={() => Router.push(url)}
                style={{
                  backgroundColor: bg
                }}
    >
      <Image src={icon} width={iconSize} height={iconSize} layout={"fixed"}/>
      <p className={" text-base ml-3 aveSofRegular"}
         style={{
           color: color
         }}
      >{text}</p>
    </div>
  }

  return (
      <div className={"fixed top-[106px] bottom-[83px] z-50 bg-[white]  w-full"}
           style={{
             transition: "all 0.2s ease-in-out 0s",
             left: isOpenMenu ? "0%" : "100%"
           }}
      >

        <div className={"w-full p-4 overflow-y-scroll"}
             style={{
               height: "calc(100vh - 183px)"
             }}
        >
          {/*// profile*/}
          <div className={"flex justify-between p-3 pr-6 bg-[#D9D9D933] rounded-[8px] items-center"}>
            <div className={"flex items-center"}>
              <div
                  className={"group min-w-[36px] h-[36px] relative flex  items-center justify-center rounded-[50%] pb-[5px] cursor-pointer"}
                  style={{
                    transition: "0.5s",
                    backgroundColor: "#" + userInfo?.avatar?.code
                  }}>

                <img src={getChosenAvatar()}
                     alt={"avatar"}
                     style={{objectFit: "cover", height: "100%", width: "auto"}}/>
              </div>


              <div className={"flex flex-col ml-3"}>
                <p className={"text-[#383838] text-sm aveSofMedium"}>{userInfo?.details?.firstName} {userInfo?.details?.lastName}</p>
                <div className={"flex items-center"}>
                  <Image src={IMAGES.coin} width={16} height={16} layout={"fixed"}/>
                  <p className={"text-[#00000066] text-sm ml-2 aveSofRegular"}>{points} Point</p>
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
            <h5 className={"text-[#38383880] aveSofRegular"}>Navigatioon</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.ecomerce} text={"მაღაზია"} url={'https://shop.pirveli.com'} bg={"#F5CE5A"}/>
              <NavItem icon={ICONS.medical} text={"მედიქალი"} url={'https://medical.pirveli.com'} bg={"#7B92DC"}/>
              <NavItem icon={ICONS.lotto} iconSize={20} url={'https://win.pirveli.com'} text={"გათამაშება"}
                       bg={"#56971F"}/>
              <NavItem icon={ICONS.menuPercent} text={"Discounts"} bg={"#E35A43"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880] aveSofRegular"}>Company</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.whoWeAre} iconSize={18} text={"Who we are"} color={"#383838"}/>
              <NavItem icon={ICONS.faq} iconSize={18} text={"FAQ"} color={"#383838"}/>
              <NavItem icon={ICONS.contactUs} iconSize={18} text={"Contact us"} color={"#383838"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880] aveSofRegular"}>User</h5>
            <div className={" grid grid-cols-2 gap-3 mt-3"}>
              <NavItem icon={ICONS.flash} iconSize={18} text={"How it works"} color={"#383838"}/>
              <NavItem icon={ICONS.tc} iconSize={24} text={"T&C"} color={"#383838"}/>
              <NavItem icon={ICONS.gift} iconSize={18} text={"Bonus points"} color={"#383838"}/>
              <NavItem icon={ICONS.privacy} iconSize={24} text={"Privacy Policy"} color={"#383838"}/>
            </div>
          </div>

          <div className={"mt-8"}>
            <h5 className={"text-[#38383880] aveSofRegular"}>For business</h5>
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

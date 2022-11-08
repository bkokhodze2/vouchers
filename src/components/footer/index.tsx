import React, {useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image"
import BecomeOurUser from "../blocks/become-our-user";
import {footer} from "../../../public/images/images";
import {IMAGES} from "../../../public/images";
// import footer from "../../../public/images/images/footer.png";
const Footer: React.FC = () => {

  return (
      <footer className={"w-full hidden md:flex w-full relative pt-[55px]"}>
        <div className={"container m-auto relative"}>
          <div className={"pr-[50%]"}>
            <BecomeOurUser/>
            {/*navigation*/}
            <div className={" mt-[100px] mb-8 bg-[#D9D9D94D] h-0.5"}></div>
            <div className={"grid grid-cols-3 gap-8"}>
              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px]"}>Company</h6>
                <p className={"text-[#383838] text-base cursor-pointer"}>Who we are</p>
                <p className={"text-[#383838] text-base"}>FAQ</p>
                <p className={"text-[#383838] text-base"}>Contact us</p>
              </div>
              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px]"}>For users</h6>
                <p className={"text-[#383838] text-base"}>How it works</p>
                <p className={"text-[#383838] text-base"}>Bonus points</p>
                <p className={"text-[#383838] text-base"}>Terms & Conditions</p>
                <p className={"text-[#383838] text-base"}>Privacy Policy</p>
              </div>
              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px]"}>For Buisness</h6>
                <p className={"text-[#383838] text-base"}>Advertisment</p>
                <p className={"text-[#383838] text-base"}>Become a partner</p>
              </div>
            </div>
            <div className={"flex flex-col mb-5"}>
              <div className={"flex items-center space-x-[34px]"}>
                <div>
                  <Image src={ICONS.fb} quality={70}
                         blurDataURL={IMAGES.placeholder.src}
                         loading={"lazy"} alt={"facebook icon"}/>
                </div>
                <div>
                  <Image src={ICONS.insta}
                         quality={70}
                         blurDataURL={IMAGES.placeholder.src}
                         loading={"lazy"}
                         alt={"instagram icon"}/>
                </div>
              </div>
              <p className={"text-[#38383880] mt-8"}>Copyright © 2022 our website. All rights reserved.</p>
            </div>
            {/*navigation*/}
          </div>

        </div>
        <div className={"absolute right-0 bottom-0 max-w-[850px] w-[50%] flex items-end"}>
          {/*width={750} height={650}*/}
          <Image src={IMAGES.footer}
                 quality={80}
                 blurDataURL={IMAGES.placeholder.src}
                 placeholder="blur"
                 loading={"lazy"}
                 alt={"footer.image"} width={850} height={620}/>
        </div>
      </footer>
  )
}

export default Footer;

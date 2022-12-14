import React from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image"
import BecomeOurUser from "../blocks/become-our-user";
// @ts-ignore
import {footer} from "/public/images/images";
// @ts-ignore
import {IMAGES} from "/public/images";
import Link from "next/link";

const Footer: React.FC = () => {

  return (
      <footer className={"w-full hidden md:flex w-full relative pt-[55px]"}>
        <div className={"container m-auto relative"}>
          <div className={"pr-[10%]"}>
            <BecomeOurUser/>
            {/*navigation*/}
            <div className={" mt-[100px] mb-8 bg-[#D9D9D94D] h-0.5"}></div>
            <div className={"grid grid-cols-5 gap-2"}>
              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px] cursor-pointer aveSofMedium"}>პირველი</h6>
                <div>
                  <Link href={"/#"}>
                    <a className={"mt-3 text-[#383838] text-base cursor-pointer aveSofRegular"}>ჩვენს
                      შესახებ</a>
                  </Link>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"mt-3 text-[#383838] text-base cursor-pointer aveSofRegular"}>გახდი ჩვენი
                      პარტნიორი</a>
                  </Link>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>მიმდინარე
                      ვაკანსიები</a>
                  </Link>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ბლოგი</a>
                  </Link>
                </div>
              </div>

              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px] cursor-pointer aveSofMedium"}>ჩვენი სერვისები</h6>

                <div>
                  <a href={'https://shop.pirveli.com'} target={"_blank"}
                     className={"mt-3 text-[#383838] text-base cursor-pointer aveSofRegular"}>მაღაზია</a>
                </div>
                <div>
                  <a href={'https://medical.pirveli.com'} target={"_blank"}
                     className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ჯანდაცვა</a>
                </div>
                <div>
                  <a href={'https://vouchers.pirveli.com'} target={"_blank"}
                     className={"mt-3 text-[#383838] text-base cursor-pointer aveSofRegular"}>ვაუჩერები</a>
                </div>
                <div>
                  <a href={'https://s3.pirveli.com/v1/api/getFile?id=6555'} target={"_blank"}
                     className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>გათამაშება</a>
                </div>
                <div>
                  <a href={'https://s3.pirveli.com/v1/api/getFile?id=6556'} target={"_blank"}
                     className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>გართობა</a>
                </div>
              </div>


              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px] cursor-pointer aveSofMedium"}>წესები და პირობები</h6>

                <div>
                  <a className={"h-full"} href={"https://s3.pirveli.com/v1/api/getFile?id=7129"} target={"_blank"}
                     rel="noopener noreferrer">
                    <span
                        className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>Sale.pirveli-ის წესები</span>
                  </a>
                </div>

                <div>
                  <a className={"h-full"} href={"https://s3.pirveli.com/v1/api/getFile?id=6574"} target={"_blank"}
                     rel="noopener noreferrer">
                    <span
                        className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ზოგადი წესები</span>
                  </a>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ხშირად დასმული კითხვები</a>
                  </Link>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>კონფიდენციალურობის
                      პოლიტიკა</a>
                  </Link>
                </div>
              </div>

              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px] cursor-pointer aveSofMedium"}>კონტაქტი</h6>
                <div>
                  <a className={"h-full"} href={"#"}>
                    <span
                        className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ტელეფონი</span>
                  </a>
                </div>

                <div>
                  <a className={"h-full"} href={"#"}>
                    <span
                        className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>ელ. ფოსტა</span>
                  </a>
                </div>
                <div>
                  <Link href={"/#"}>
                    <a className={"text-[#383838] text-base cursor-pointer aveSofRegular"}>მისამართი</a>
                  </Link>
                </div>
              </div>

              <div className={"space-y-3"}>
                <h6 className={"text-[#38383899] text-[18px] cursor-pointer aveSofMedium"}>შემოგვიერთდი</h6>
                <div className={"flex items-center"}>
                  <a href={"https://www.facebook.com/profile.php?id=100088325187616"} target={"_blank"}
                     className={"flex items-center"}>
                    <Image src={ICONS.footerFb} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           loading={"lazy"} alt={"facebook icon"}/>
                    <p className={"ml-1"}>Facebook</p>
                  </a>
                </div>
                {/*<div className={"flex items-center"}>*/}
                {/*  <a href={"#"} target={"_blank"}*/}
                {/*     className={"flex items-center"}>*/}
                {/*    <Image src={ICONS.footerTk} quality={70}*/}
                {/*           blurDataURL={IMAGES.placeholder.src}*/}
                {/*           loading={"lazy"} alt={"facebook icon"}/>*/}
                {/*    <p className={"ml-1"}>TikTok</p>*/}
                {/*  </a>*/}
                {/*</div>*/}

                <div className={"flex items-center"}>
                  <a href={"https://www.instagram.com/pirveli_pirveli/"} target={"_blank"}
                     className={"flex items-center"}>
                    <Image src={ICONS.footerIn} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           loading={"lazy"} alt={"facebook icon"}/>
                    <p className={"ml-1"}>Instagram</p>
                  </a>
                </div>

                <div className={"flex items-center"}>
                  <a href={"#"} target={"_blank"}
                     className={"flex items-center"}>
                    <Image src={ICONS.footerYo} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           loading={"lazy"} alt={"Youtube icon"}/>
                    <p className={"ml-1"}>Youtube</p>
                  </a>
                </div>

                <div className={"flex items-center"}>
                  <a href={"https://www.linkedin.com/company/88047011"} target={"_blank"}
                     className={"flex items-center"}>
                    <Image src={ICONS.footerYo} quality={70}
                           blurDataURL={IMAGES.placeholder.src}
                           loading={"lazy"} alt={"Youtube icon"}/>
                    <p className={"ml-1"}>LinkedIn</p>
                  </a>
                </div>

              </div>
            </div>
            <div className={"flex flex-col mb-5"}>
              {/*<div className={"flex items-center space-x-[34px]"}>*/}
              {/*  <div className={"cursor-pointer"}>*/}
              {/*    <Image src={ICONS.fb} quality={70}*/}
              {/*           blurDataURL={IMAGES.placeholder.src}*/}
              {/*           loading={"lazy"} alt={"facebook icon"}/>*/}
              {/*  </div>*/}
              {/*  <div className={"cursor-pointer"}>*/}
              {/*    <Image src={ICONS.insta}*/}
              {/*           quality={70}*/}
              {/*           blurDataURL={IMAGES.placeholder.src}*/}
              {/*           loading={"lazy"}*/}
              {/*           alt={"instagram icon"}/>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <p className={"text-[#38383880] mt-8 aveSofRegular"}>Copyright © 2022 our website. All rights
                reserved.</p>
            </div>
            {/*navigation*/}
          </div>

        </div>
        <div className={"absolute right-0 bottom-0 max-w-[850px] w-[20%] flex items-end"}>
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

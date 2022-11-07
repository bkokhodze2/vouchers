import React, {useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image"
import Button from "../../UI/button";
import {useRouter} from "next/router";


const BecomeOurUser = () => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);

  const Router = useRouter();

  return (
      <div>
        <h3 className={"text-[28px] font-bold"}>Become our user</h3>
        <p className={"max-w-[622px] mt-4 text-[#38383899] leading-[29px] text-base"}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
        <div className={"flex space-x-6 mt-6"}>
          <Button text={"Join with us"} bgColor={"#8338EC"}/>
          {/*{Router.route !== "/" && <Button text={"Partnership"} bgColor={"#383838"}/>}*/}
        </div>
      </div>

  )
}

export default BecomeOurUser;

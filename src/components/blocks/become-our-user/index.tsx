import React, {useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import {useRouter} from "next/router";


const BecomeOurUser = () => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);

  const Router = useRouter();

  return (
      <div>
        <h3 className={"text-[28px] font-bold aveSofBold"}>გახდი ჩვენი მერჩანტი</h3>
        <p className={"max-w-[622px] mt-4 text-[#38383899] leading-[29px] text-base aveSofRegular"}>
          თუკი თანამშრომლობით ხარ დაინტერესებული, მოგვწერე დეტალები შენი ბიზნეს
          საქმიანობის შესახებ და ჩვენ თავად დაგიკავშირდებით.
        </p>
        <div className={"flex space-x-6 mt-6"}>

          <a className={"h-[48px] bg-purple text-[white] rounded-xl w-min px-10 flex justify-center items-center cursor-pointer rounded-xl w-min px-10 flex justify-center items-center cursor-pointer"}
             href="mailto:Partner@pirveli.com">შემოგვიერთდი</a>

          {/*<Button text={"შემოგვიერთდი"} bgColor={"#8338EC"} classes={"aveSofRegular"}/>*/}
          {/*{Router.route !== "/" && <Button text={"Partnership"} bgColor={"#383838"}/>}*/}
        </div>
      </div>

  )
}

export default BecomeOurUser;

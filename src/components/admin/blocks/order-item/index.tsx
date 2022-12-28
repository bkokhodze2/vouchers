import React, {useState} from 'react';
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import dayjs from "dayjs";
import Button from "../../../UI/button";
import {Modal} from "antd";
import axios from "axios";
import {ExclamationCircleOutlined} from '@ant-design/icons';

const OrderItem = ({data, btn, setRefresh, evaluated, setIsModalOpen}: any) => {

  const [isEvaluated, setIsEvaluated] = useState<boolean>(evaluated);
  const dateFormat = 'DD.MM.YYYY';
  console.log("data", data, btn)

  const confirm = (id: number) => {

    Modal.confirm({
      title: 'შეტყობინება',
      icon: <ExclamationCircleOutlined/>,
      content: 'ნადმვილად გსურთ შეკვეთის სტარტუსის შეცვლა',
      okText: 'შეცვლა',
      cancelText: 'გაუქმება',
      className: "confirm",
      onOk: () => changeStatus(id)
    });

  };

  const changeStatus = (id: number) => {
    axios.post('axios shemcrlii').then((res) => {
      setRefresh(true)
      console.log("res")
    }).catch((e) => {
      console.log('e', e)
    })
  }

  return <div
      className={"md:p-6 p-4  flex flex-col ph:flex-row md:flex-col md:gap-0 gap-[18px] bg-[#F7F7F7] rounded-0 md:rounded-2xl"}>
    <div
        className={"md:order-1 order-2 w-full ph:w-[50%] md:w-full flex mb-0 md:mb-[24px] gap-[15px] md:gap-[0px] flex-col md:flex-row md:justify-between"}>
      <div className={"flex flex-row md:flex-col items-center md:items-start xl:w-[200px]"}>
        <p className={"text-[#38383899] "}>შეკვეთის ID</p>
        <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>1234</span>
      </div>
      <div className={"flex flex-row md:flex-col items-center md:items-start "}>
        <p className={"text-[#38383899] "}>დამატების თარიღი</p>
        <span
            className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>{dayjs(data?.transactionDate).format(dateFormat).toString()}</span>
      </div>

      <div className={"flex flex-row md:flex-col items-center md:items-start "}>
        <p className={"text-[#38383899] "}>ღირებულება</p>
        <span className={"text-[#383838] md:text-base text-sm ml-[6px] md:ml-0"}>{data?.priceInGel}</span>
      </div>

    </div>

    <div className={"md:order-2 order-1 w-full ph:w-[50%] md:w-full flex flex-col md:flex-row"}>

      <div
          className={"w-full flex max-w-full min-w-full min-h-full ph:max-w-[150px] ph:max-h-[200px] ph:min-h-[114px] md:max-w-[240px] md:min-w-[240px] md:max-h-[150px] md:mr-[30px]"}>
        <img src={data.attachmentDTO.path ? data.attachmentDTO.path : IMAGES.offerItem.src}
             placeholder="blur"
             alt={"product image"}
             className={"rounded-xl"}
             style={{objectFit: "cover"}}
        />
      </div>

      <div className={"flex flex-col md:flex-row justify-between items-start md:items-center w-full"}>
        <div className={"flex flex-col"}>
          <h2 className={"text-[#383838] font-bold md:text-[22px] text-base mt-4 md:mt-0"}>{data?.title}</h2>
          <p className={"text-base mt-2 text-[#38383899] max-w[464px] hidden md:flex"}>სზერხდტც ს სა საფყგვ სუბჰინჯომკ
            დად ასუდოჰასიუდ ამფი პაფდჯ ას ს ა</p>
        </div>

        {btn && <div className={""} onClick={() => confirm(1)}>
					<Button classes={"hidden md:flex"} bgColor={"#DB0060"} text={"გამოყენებული"}
					        textColor={"white"}/>
				</div>}

      </div>
    </div>

  </div>
};


export default OrderItem;
import {Button, Result} from 'antd';
import {useRouter} from 'next/router'

export default function FourOhFour() {
  const router = useRouter()
  return <>
    <Result
        status="404"
        title="404 not found"
        subTitle="გვერდი ,რომელსაც თქვენ ეწვიეთ არ არსებობს !"
        extra={<Button className={"text-[gray]"} type="primary" onClick={() => router.back()}>უკან დაბრუნება</Button>}
    />
  </>
}
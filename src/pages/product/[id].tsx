import  { useRouter } from 'next/router'
import { stringify } from 'querystring';

export default function Product() {
    const {query} = useRouter();
  return (
    <div>Product: {stringify(query)}</div>
  )
}

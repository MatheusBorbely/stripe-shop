import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import  { useRouter } from 'next/router'
import Stripe from 'stripe';

interface ProductProps{
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
  }
}
export default function Product({product}: ProductProps) {
  const {isFallback} = useRouter();

  if (isFallback) {
    return <p> Loading ...</p>
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={520} height={480}/>
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>
          Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths =async () => {
  return {
    paths: [
      {
        params: {id: 'prod_NpWfk6pgSpWsDr'}
      },
    ],
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const priceStripe  = product.default_price as Stripe.Price;
  const price = priceStripe.unit_amount ? priceStripe.unit_amount / 100 : 0;
  const formatPrice = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  return {
    props: {
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formatPrice,
        description: product.description
      }
    },
    revalidate: (60 * 60) * 1 // 1 HOUR
  }
};

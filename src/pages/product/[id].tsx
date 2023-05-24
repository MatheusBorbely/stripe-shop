import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import  { useRouter } from 'next/router'

import axios from 'axios';
import { stripe } from '../../lib/stripe';
import Stripe from 'stripe';

import { ImageContainer, 
        ProductContainer, 
        ProductDetails } from '../../styles/pages/product';
interface ProductProps{
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string
  }
}
export default function Product({product}: ProductProps) {
  const [isCreateCheckout, setIsCreateCheckout] = useState(false);

  async function hanldleClickBuyProduct() {
      try {
          setIsCreateCheckout(true);
         
          const response = await axios.post('/api/checkout', {
              priceId: product.defaultPriceId,
          });

          const { checkoutUrl } = response.data;

          window.location.href = checkoutUrl;
      } catch (err) {
          setIsCreateCheckout(false);
          alert('Falha: ' + err);
      }
  }

  const {isFallback} = useRouter();

  if (isFallback) {
    return <p> Loading ...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Stripe Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt={product.name} width={520} height={480}/>
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={hanldleClickBuyProduct} disabled={isCreateCheckout}>
            Comprar Agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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
  console.log(product)
  return {
    props: {
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formatPrice,
        description: product.description,
        defaultPriceId: priceStripe.id,
      }
    },
    revalidate: (60 * 60) * 1 // 1 HOUR
  }
};

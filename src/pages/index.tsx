import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

import { MainContainer, CardProduct } from '@/styles/pages/home';


interface TypeProduct {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: TypeProduct) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.8,
      spacing: 48,

    }
  })

  return (
    <>
      <Head>
        <title>Stripe Shop</title>
      </Head>
      <MainContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <CardProduct className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
                <footer>
                  <h2>{ product.name }</h2>
                  <span>{ product.price }</span>
                </footer>
              </CardProduct>
            </Link>
          );
        })}
      </MainContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  
  const products = response.data.map((product) => {
    const priceStripe = product.default_price as Stripe.Price;
    const price = priceStripe.unit_amount ? priceStripe.unit_amount / 100 : 0;
    const formatPrice = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatPrice,
    }
  });

  return {
    props: {
      products
    },
    revalidate: (60 * 60) * 1 // 1 HOUR
  }
};


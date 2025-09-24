'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { CartItem } from '@/types'
import useCartStore from '@/store/cartStore'
import { useRouter } from 'next/navigation'

interface BuyNowBtnProps {
  product: CartItem
}

const BuyNowBtn: React.FC<BuyNowBtnProps> = ({ product }) => {
  const { addToCart } = useCartStore()
  const router = useRouter()

  const handleBuyNow = () => {
    addToCart(product)
    router.push('/checkout')
  }

  return (
    <Button
      onClick={handleBuyNow}
      className="
        w-full
        px-4
        py-3
        sm:px-6 sm:py-4
        md:px-8 md:py-6
        rounded-full
        text-base
        sm:text-lg
        md:text-xl
        flex
        items-center
        justify-center
        gap-2
        sm:gap-3
        md:gap-4
        bg-gradient-to-r from-blue-500 to-blue-800
        hover:from-blue-600 hover:to-blue-900
        hover:ring-2
        text-white
        transition-all
        duration-300
      "
    >
      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 animate-pulse" />
      Buy Now
    </Button>
  )
}

export default BuyNowBtn

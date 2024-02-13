'use client'

import sumsung from '@/assets/images/sumsung.svg'
import { Badge } from '@/components/ui/badge'
import Typography from '@/components/ui/typography'
import { Rating } from '@mui/material'
import { Lightning } from '@phosphor-icons/react'
import Image from 'next/image'

export default function SmallCard({
  id,
  name,
  rating,
  price,
}: {
  id: number
  name: string
  rating: number
  price: number
}) {
  return (
    <div className="flex flex-col max-w-[350px] w-full bg-card rounded-lg p-4 lg:gap-4 gap-2 hover:border-primary hover:border lg:hover:border-2">
      <div className="relative">
        <Badge className="absolute py-1 px-3 flex flex-row gap-1">
          <Lightning size={16} weight="fill" className="text-white" />
          <Typography fontWeight="regular">Recommend</Typography>
        </Badge>
        <div className="flex lg:w-full lg:h-[300px] min-w-[142px] justify-center">
          <Image src={sumsung} alt=" picture" width={0} height={0} />
        </div>
      </div>
      <div className="flex flex-col gap-1 lg:gap-4 w-fit items-start">
        <div className="lg:gap-2 gap-1">
          <Typography variant="h6" fontWeight="bold" className="lg:h4 line-clamp-1">
            {name}
          </Typography>
          <div className="flex flex-row gap-0.5 ">
            <Rating
              name="read-only"
              value={rating}
              max={5}
              readOnly
              className="flex md:hidden lg:flex"
              sx={{
                '& .MuiRating-iconEmpty': {
                  color: '#999999',
                },
              }}
            />
            <Rating
              name="read-only"
              value={rating}
              max={5}
              size="small"
              readOnly
              className="lg:hidden md:flex hidden"
              sx={{
                '& .MuiRating-iconEmpty': {
                  color: '#999999',
                },
              }}
            />
            <Typography variant="h5" className="text-light pt-0.5 lg:h5 md:tiny">
              {rating.toFixed(1)}
            </Typography>
          </div>
        </div>
        <Typography variant="h6" className="lg:h4">
          {price}฿/วัน
        </Typography>
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { useUserToken } from '@/providers/User'
import { addDays } from 'date-fns'

import { Renting_status_Input, useQuery } from '../../../../../gqty'
import { ExpensesCardButton, PaymentCard, PaymentCardContainer } from './PaymentCard'

// real
export default function ExpensesContainer() {
  const query = useQuery({
    fetchPolicy: 'cache-and-network',
  })

  const { userId } = useUserToken()

  const toPay = query
    .Rentings({
      where: {
        status: { equals: Renting_status_Input.WAIT_PAID },
      },
    })
    ?.docs?.filter((renting) => renting?.rentedBy?.user?.id === Number(userId))
    ?.map((renting) => ({
      ...renting,
    }))
    .filter((renting) => renting?.id !== undefined)

  const handlePay = async (
    productId: number | undefined,
    totalPrice: number,
    rentingId: number | undefined
  ) => {
    const result = await fetch('http://localhost:3001/api/stripe/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        option: 'item',
        productId,
        totalPrice,
        rentingId,
      }),
    })

    const stripeData = await result.json()

    useEffect(() => {
      if (stripeData.id) {
        window.location.href = stripeData.url
      }
    }, [stripeData.id])
  }

  if (query.$state.isLoading || query.$state.error) {
    return (
      <div className="flex justify-center">
        <Spinner className="self-center" />
      </div>
    )
  }

  if (toPay?.length === 0) {
    return <div className="flex justify-center">No assets to pay</div>
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {toPay?.map((renting) => (
        <PaymentCard>
          <PaymentCardContainer
            title={renting.rentedTo?.item?.name ?? ''}
            assetFrom={renting.rentedTo?.user?.firstName ?? ''}
            thumbnail={
              renting.rentedTo?.item?.image?.length
                ? renting.rentedTo?.item?.image[0].url ?? ''
                : ''
            }
            startDate={new Date(renting.startDate ?? new Date())}
            endDate={new Date(renting.endDate ?? new Date())}
            insuranceFee={Number(renting.insuranceFee)}
            deliveryFee={Number(renting.deliveryFee)}
            rentalFee={Number(renting.rentalFee)}
            totalFee={
              Number(renting.insuranceFee) + Number(renting.deliveryFee) + Number(renting.rentalFee)
            }
          />
          <ExpensesCardButton
            onClick={() =>
              handlePay(
                renting.rentedTo?.item?.id as number,
                Number(renting.insuranceFee) +
                  Number(renting.deliveryFee) +
                  Number(renting.rentalFee),
                renting.id as number
              )
            }
            dueDate={addDays(new Date(renting.createdAt ?? new Date()), 5)}
          />
        </PaymentCard>
      ))}
    </div>
  )
}

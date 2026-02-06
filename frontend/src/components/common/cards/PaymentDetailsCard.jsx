import { correctDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React from 'react'

const PaymentDetailsCard = ({ data }) => {
    return (
        <>
            <p>Fecha</p> <p>{correctDate(data?.paymentDate)}</p>
            <p>Forma de pago</p> <p>{data?.paymentType}</p>
            {data?.fees !== '-' && <><p>Cuotas</p> <p>{data?.fees || '-'}</p></>}
            {(data?.mpDetails && data?.mpDetails !== '-') && <><p>Cuenta de MP</p> <p>{data?.mpDetails || '-'}</p></>}
            <p>Monto</p> <p>{numberToCurrency(data?.amount)} <i className='text-sm text-gray-500'>{data?.currency || '-'}</i></p>
            {(data?.percentage && data?.percentage !== '-') && <><p>Seña</p><p>%{data?.percentage || '-'}</p></>}
        </>
    )
}

export default PaymentDetailsCard
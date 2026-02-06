import React, { useMemo } from 'react'
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, Filler, CategoryScale, Tooltip } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import useLedgerChartMonth from '@/hooks/useLedgerChartMonth'
import Loading from '@/components/common/misc/Loading'
import { numberToCurrency } from '@/utils/formUtils'

const IncomeChart = ({ Month, Year }) => {
    const { chart, error, isLoading } = useLedgerChartMonth(Month, Year)

    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, Filler, CategoryScale, Tooltip);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        elements: {
            point: {
                hitRadius: 10
            }
        },
        layout: {
            padding: 5
        },
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                enabled: true,
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        const value = context.formattedValue
                        return `$${value}`;
                    }
                },
            }
        },
        // events: ['click'],
        // hover: {
        //     mode: 'nearest'
        // },
        // onClick: function (event, element) {
        //     cardFinder(element[0]?.index)
        // }
    };

    const dataSet = useMemo(() => {
        if (chart?.dailyBalance) {
            const dataset = {
                labels: new Array(new Date(Year, Month + 1, 0).getDate()).fill(`/${Month + 1}`).map((e, i) => i + 1 + e),
                datasets: [
                    {
                        type: 'line',
                        label: 'PEN',
                        data: chart.dailyBalance.map(e => e.total || null),
                        pointBorderWidth: 5,
                        tension: 0.2,
                        fill: true,
                        borderWidth: 2,
                        backgroundColor: '#2563eb10',
                        borderColor: '#2563eb',
                        pointBackgroundColor: '#2563eb',
                    }
                ],
            }
            return dataset
        } else {
            return null
        }
    }, [Month, Year, chart])

    return (
        <div>
            {error && <p className='text-lg'>{error?.message || 'Hubo un error'}</p>}
            {isLoading &&
                <span className='absolute w-full top-0 -mb-2'>
                    <Loading />
                </span>
            }
            {chart?.balance &&
                <div className='stats-container grid grid-cols-3 px-2'>
                    <p>Pérdidas</p>
                    <p>{numberToCurrency(chart?.balance?.expense)}</p>
                    <p className='place-self-end w-full'>Total</p>
                    <div className={`text-lg font-semibold mt-2 ${chart?.balance?.total < 0 ? 'text-rose-500' : chart?.balance?.total > 0 ? 'text-emerald-500' : ''}`}>{numberToCurrency(chart?.balance?.total)}</div>
                </div>
            }

            <p className='mt-4 text-xl'>Balances diarios</p>
            {dataSet &&
                <div className='chart-container fade-in'>
                    <Chart data={dataSet} options={options} />
                </div>}
        </div>
    )
}

export default IncomeChart
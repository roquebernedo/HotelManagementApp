import { textSort } from '@/utils/sorter'
import React, { useMemo, useState } from 'react'
import ClientMiniCard from '../common/cards/ClientMiniCard'
import PageController from '../common/misc/PageController'

const ClientList = ({ data, sortKey }) => {
    const EPP = 10 // Elements Per Page
    const [page, setPage] = useState(1)
    const sorted = useMemo(() => {
        setPage(() => 1)
        return data.sort(textSort)
    }, [data])
    const pageContent = useMemo(() => sorted.slice(EPP * (page - 1), EPP * page), [sorted, page])

    const changePage = (arg) => {
        arg === '-' && setPage(page => page > 1 ? page - 1 : page)
        arg === '+' && setPage(page => page + 1)
    }

    return (
        <>
            {data &&
                <div className='pb-12 relative fade-in'>
                    {!!pageContent?.length
                        ? <section>
                            {pageContent.map(e => (
                                <ClientMiniCard data={e} key={e.id} sortKey={sortKey} />
                            ))}
                        </section>
                        : <p>Sin resultados para la búsqueda</p>}

                    <PageController page={page} changePage={changePage} elements={data.length} EPP={EPP} />
                </div>}
        </>
    )
}

export default ClientList
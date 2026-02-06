import React, { useState } from 'react'
import ClientList from '@/components/clients/ClientList'
import useClients from '@/hooks/useClients'
import { useNavigate } from 'react-router-dom'
import { fuzzySearch } from '@/utils/fuzzySearch'
import SearchInput from '../common/misc/SearchInput'
import Loading from '../common/misc/Loading'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { isMobile } from '@/utils/isMobile'

const Clients = () => {
    const navigate = useNavigate()
    const { clients, isLoading } = useClients()
    const [filtered, setFiltered] = useState(false)
    const [sortKey, setSortKey] = useState('name')
    const mobile = isMobile()

    const filter = (key, pattern, onlyCompany) => {
        setSortKey(() => key)
        console.log(key)
        console.log(pattern)
        console.log(onlyCompany)
        if (pattern) {
            const list = onlyCompany
                ? clients.filter(c => c.company)
                : clients
            const newList = fuzzySearch(list, [key], pattern)
            setFiltered(() => newList)
        } else {
            onlyCompany
                ? setFiltered(() => clients.filter(c => c.company))
                : setFiltered(() => false)
        }
    }

    return (
        <div className='relative flex flex-col w-full full-h'>
            <section className={`flex  justify-between ${mobile ? 'ml-8' : 'mb-4'}`}>
                <h1 className={`${mobile ? 'text-3xl' : ''}`}>Clientes</h1>
                <button className='btn-primary txt-n-icon justify-center'
                    onClick={() => navigate('/clients/create')}>
                    <MdPersonAddAlt1 />
                    <p>{mobile ? 'Registrar' : 'Registrar Cliente'}</p>
                </button>
            </section>

            <SearchInput filter={filter} />

            {isLoading &&
                <span className='w-full items-start top-0'>
                    <Loading />
                </span>}

            <section className='full-h overflow-y-auto'>
                <ClientList data={filtered || clients} sortKey={sortKey} />
            </section>
        </div >
    )
}

export default Clients
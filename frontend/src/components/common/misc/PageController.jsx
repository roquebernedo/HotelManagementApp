import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const PageController = ({ page, changePage, elements, EPP }) => {
    return (
        <section className='pages'>
            <button disabled={page <= 1}
                className='btn-icon mx-4'
                onClick={() => changePage('-')}>
                <MdChevronLeft />
            </button>

            <p className='select-none text-xl'>{page} / {Math.ceil(elements / EPP)}</p>

            <button disabled={page >= Math.ceil(elements / EPP)}
                className='btn-icon mx-4'
                onClick={() => changePage('+')}>
                <MdChevronRight />
            </button>
        </section>
    )
}

export default PageController
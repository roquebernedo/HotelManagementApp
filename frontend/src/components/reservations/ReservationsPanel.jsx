import React from 'react'
import useRooms from '@/hooks/useRooms'
// import usePanelController from '@/hooks/usePanelController'
import usePanelControllerV2 from '@/hooks/usePanelControllerV2'
import { correctDate, dayName } from '@/utils/formatDate'
import ReservCard from './panelComponents/ReservCard'
// import Tile from './panelComponents/Tile'
import TileV2 from './panelComponents/TileV2'
import { isMobile } from '@/utils/isMobile'
import { MdBungalow, MdGroups } from 'react-icons/md'

const ReservationsPanel = ({ create, creating, blueprint: { dates, template } }) => {
    const { rooms } = useRooms()
    const mobile = isMobile()
    console.log(template)
    const { selectMode, creatingMode, cDown, cUp, mEnter, frontier, length } = usePanelControllerV2(create, creating)
    console.log(selectMode)
    console.log(creatingMode)
    console.log(cDown)
    console.log(cUp)
    console.log(mEnter)
    console.log(frontier)
    console.log(length)
    console.log(create)
    return (
        <section className='flex w-full overflow-x-auto'>
            <div className={`tc ${mobile ? 'w-12' : ''}`}>
                <div className={`flex justify-center ${mobile ? 'w-12 px-1' : 'w-44 px-4'} rounded-tl-xl border-t border-slate-700`}>
                    <p>{mobile ? <MdBungalow className='text-2xl' /> : 'Cabañas'}</p>
                </div>
                {Object.entries(template).map(c => (
                    <div key={c[0]} className={`ellipsis ${mobile ? 'w-12 px-1' : 'w-44 px-4'}`}>
                        {mobile
                            ? <p>{rooms.find(cab => cab.id === c[0])?.identifier}</p>
                            : <div className='txt-n-icon w-full justify-center capitalize'>
                                {rooms.find(cab => cab.id === c[0])?.name}
                                <p className='txt-n-icon w-full text-gray-400 gap-1 ml-2'>
                                    <MdGroups />
                                    {rooms.find(cab => cab.id === c[0])?.capacity}
                                </p>
                            </div>}
                    </div>
                ))}
            </div>

            <div className={creatingMode ? 'pointer-events-none' : ''}>
                <div className='tr bg-neutral-200 dark:bg-slate-900 border-t border-slate-700'>
                    {dates.map(d => (
                        <div key={d} className={`bg-neutral-200 dark:bg-slate-800/30 flex-col px-4 ${d.getDate() === 1 ? 'bg-blue-500/20' : ''}`}>
                            <p className='capitalize'>{dayName(d)}</p>
                            <p className='dark:text-gray-400'>{correctDate(d)}</p>
                        </div>
                    ))}
                </div>

                {Object.entries(template).map(c => (
                    <div key={c[0]} id={c[0]} className='tr select-none'
                        onMouseEnter={frontier}>

                        {c[1].map((tile, i) => {
                            
                            // console.log(tile.reserv)
                            return(
                            <div key={c[0] + tile.date} className={`${tile.date.getDate() === 1 ? 'bg-blue-500/10' : ''}`}
                                onMouseDown={() => cDown(c[0], tile.date)}
                                onMouseUp={() => cUp()}>

                                {tile?.reserv?.checkin && <ReservCard data={tile.reserv} />}

                                {/* <Tile mode={selectMode} creating={creatingMode} disabled={tile?.reserv && !tile?.reserv?.checkin} cb={() => mEnter(tile.date)} /> */}
                                {/* <Tile mode={selectMode} creating={creatingMode} disabled={tile?.reserv} cb={() => mEnter(tile.date)} /> */}

                                <TileV2 mode={selectMode} creating={creatingMode} disabled={tile?.reserv && !tile?.reserv?.checkin} cb={() => mEnter(tile.date)} length={length} />

                            </div>)
                        })}

                    </div>
                ))}
            </div>
        </section>
    )
}

export default ReservationsPanel
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'

export default function Loading () {
    return (
        <div className="h-svh w-full flex flex-row mt-60 justify-center gap-3">
            <Ring2
                size="20"
                stroke="3"
                strokeLength="0.3"
                bgOpacity="0.15"
                speed="1.75"
                color="var(--muted-foreground)" 
            />
            <p className='text-muted-foreground'>Loading...</p>
        </div>
    )
}
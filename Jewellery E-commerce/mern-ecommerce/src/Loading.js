import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
    return  (
        <div className='flex items-center justify-center'>
            <ColorRing
                visible={true}
                height="60"
                width="60"
                ariaLabel="color-ring-loading"  
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#db2777', '#be185d', '#9d174d', '#831843', '#832729']}
            />
        </div>
    )
}

export default Loading

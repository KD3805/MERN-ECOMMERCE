import React from 'react'
import Circles from 'react-loader-spinner'

const Loading = () => {
    return  (
        <div className='flex items-center h-full justify-center'>
            <Circles
                visible={true}
                height="60"
                width="60"
                ariaLabel="color-ring-loading"  
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                // colors={['#db2777', '#be185d', '#9d174d', '#831843', '#832729']}
                color={'#db2777'}
            />
        </div>
    )
}

export default Loading

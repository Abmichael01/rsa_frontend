import React from 'react'

const Loader = () => {
    return (
        <div>
            <div class="flex justify-center items-center">
                <div class="relative inline-flex">
                    <div class="w-6 h-6 bg-white rounded-full"></div>
                    <div class="w-6 h-6 bg-primary-300 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div class="w-6 h-6 bg-primary-200 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader

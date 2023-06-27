import React from 'react'

const RatingBar = ({averageRating}) => {
    const rating = ((averageRating * 10).toFixed(2)) + "%";
    return (
        <div className='w-1/4 h-3 bg-gray-400 inline-block'><div style={{
                height: "100%", 
                background: "rgb(34 197 94)", 
                width: rating,
                }}>
            </div>
        </div>
    )
}

export default RatingBar
import React from 'react';

const PublicationCard = () => {
  return (
    <div className="flex flex-col bg-orange-dark p-4 rounded-md gap-3 text-white w-full min-w-80">
      <div className=" font-semibold">
        Applications opened for "Generative AI and Web3" project
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <button className="bg-white text-orange-primary border w-5/12 border-white px-2 py-1 flex flex-row gap-1 items-center justify-center text-md font-bold rounded-md">
            
            READ
        </button>
      </div>
    </div>
  )
}

export default PublicationCard

import React from 'react';
import { Link } from 'react-router-dom';

const PublicationCard = (props) => {
  const publication = props.publication;
  return (
    <div className="flex flex-col bg-orange-dark p-4 rounded-md gap-3 text-white w-full min-w-80">
      <div className=" font-semibold">
        {publication.title}
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <Link to={publication.link} className="bg-white text-orange-primary border w-5/12 border-white px-2 py-1 flex flex-row gap-1 items-center justify-center text-md font-bold rounded-md">
          READ
        </Link>
      </div>
    </div>
  )
}

export default PublicationCard

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getADetails = () => {
    getAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getADetails();
  }, [firebaseKey]);

  return (
    <div className="text-white ms-5 details">
      <h5>
        Author Name: {authorDetails.first_name} {authorDetails.last_name}
        <br />
        Author Email: {authorDetails.email}
      </h5>
      {authorDetails.books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getADetails} />
      ))}
    </div>
  );
}

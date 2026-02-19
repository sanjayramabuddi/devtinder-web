import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, imageURL, gender, age } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageURL} alt={firstName} className="h-70" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{gender + " - " + age}</p>
        <div className="card-actions flex justify-center">
          <button className="btn btn-primary">Not Interested</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

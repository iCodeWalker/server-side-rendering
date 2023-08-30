import React from "react";

const UserProfile = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
};
export default UserProfile;

// This function runs for every incoming request
// Only executes on server after deployment
// Not statically pre-generated
export async function getServerSideProps() {
  return {
    props: {
      username: "Vaibhav",
    },
  };
}

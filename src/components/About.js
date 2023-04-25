import React from 'react';



const About = (props) => {

    console.log("username= ",props.username);
  return (
    <div>

      This is About {props.username}
      database = {props.database}
      password = {props.password}
    </div>
  );
}

export default About;

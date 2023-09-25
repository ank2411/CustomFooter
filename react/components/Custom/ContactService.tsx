import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import Axios

const ContactService = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://testinfo--trika.myvtex.com/testdata"
        );

        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
        // setContactData(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Contact Details using Endpoint</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contactData.length ? (
            contactData.map((item: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Subject}</td>
                <td>{item.Message}</td>
              </tr>
            ))
          ) : (
            <div>No contact data available</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactService;
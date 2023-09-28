import React, { useEffect, useState } from "react";
import style from "./contactServiceStyles.css"

const ContactService = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/testdata");
      console.log(response.ok, "+++++++++++");

      if (response.ok) {
        const data = await response.json();
        console.log(data, "-----------");

        setContactData(data);
      } else {
        throw new Error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.boxContainer}>
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

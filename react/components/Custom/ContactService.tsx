import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const ContactService = () => {
  const [contactData, setContactData] = useState([]);
  const [, setErr] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://testinfo--trika.myvtex.com/testdata"
      );

      if (response.status === 200) {
        console.log(contactData, "Data fetched successfully",response.data);
        return setContactData(response.data);
      } else {
        setErr("Failed to receive contact details due to some error");
        console.log("Failed to receive contact details due to some error");
      }
    } catch (err) {
      setErr("Failed to receive contact details due to a network error");
      console.error(err);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          { contactData.length ? (
            contactData.map((item: any, index: any) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>{item.subject}</td>
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

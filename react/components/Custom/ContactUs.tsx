import React, { useEffect, useState } from "react";
import style from "./contactUsStyles.css";
import { useLazyQuery } from "react-apollo";
import documents from "./graphql/getContact.graphql";

const ContactUs = () => {
  const [contact, setContact] = useState<any>([]);
  const [pageNo, setPageNo] = useState(1);
  const [err, setErr] = useState<any>(null);
  const [getContact, { data, error }] = useLazyQuery(documents, {
    variables: {
      acronym: "AF",
      fields: ["firstName", "lastName", "age", "subject"],
      schema: "conForm",
      page: pageNo,
      pageSize: 10,
    },
    notifyOnNetworkStatusChange: true,
    ssr: false,
  });

  useEffect(() => {
    getContact({
      variables: {
        acronym: "AF",
        fields: ["firstName", "lastName", "age", "subject"],
        schema: "conForm",
        page: pageNo,
        pageSize: 10,
      },
    });
    if (data) {
      setContact(data.documents);
      console.log("data", data);
      setErr(null);
    }
  }, [pageNo, data]);

  console.log(error);

  return (
    <div className={style.box}>
      <h2>Contact Data</h2>
      <table className={style.contactContainer}>
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
          {console.log(contact)}
          {contact ? (
            contact.map((item: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    item.fields.find((field: any) => field.key === "firstName")
                      .value
                  }
                </td>
                <td>
                  {
                    item.fields.find((field: any) => field.key === "lastName")
                      .value
                  }
                </td>
                <td>
                  {item.fields.find((field: any) => field.key === "age").value}
                </td>
                <td>
                  {
                    item.fields.find((field: any) => field.key === "subject")
                      .value
                  }
                </td>
              </tr>
            ))
          ) : (
            <>{err}</>
          )}
        </tbody>
      </table>
      <div className={style.pgBtn}>
        <button
          onClick={() => {
            {
              setPageNo(pageNo + 1);
            }
          }}
        >
          See More
        </button>
        <button
          onClick={() => {
            {
              setPageNo(pageNo - 1);
            }
          }}
        >
          See Less
        </button>
      </div>
    </div>
  );
};

export default ContactUs;

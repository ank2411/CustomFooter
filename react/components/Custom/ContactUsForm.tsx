import React, { useRef, useState } from "react";
import { useMutation } from "react-apollo";
import uploadFile from "../Custom/graphql/uploadFile.graphql";
import ReCAPTCHA from "react-google-recaptcha";
import createDocument from "../Custom/graphql/postContact.graphql";
import style from "./contactUsFormStyles.css";

const ContactUsForm = () => {
  const [show, setShow] = useState(false);
  const [upload] = useMutation(uploadFile);
  const captchaRef = useRef(null);
  const [save] = useMutation(createDocument);
  const [contact, setContact] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
    UploadFile: null,
  });

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleFileChange = async (event: any) => {
    const { files } = event.target;
    const { data } = await upload({
      variables: { file: files[0] },
    });
    setContact({
      ...contact,
      UploadFile: data.uploadFile.fileUrl,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(contact);
    const object: any = {
      fields: Object.entries(contact).map(([key, value]) => ({ key, value })),
    };
    try {
      const data = await save({
        variables: {
          document: object,
          schema: "CONTACTUS",
          dataEntity: "CONTACTUS",
          account: "trika",
          acronymn: "AA",
        },
      });
      if (data) {
        setContact({
          Name: "",
          Email: "",
          Subject: "",
          Message: "",
          UploadFile: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.contact}>
      {!show && (
        <button className={style.btncontact} onClick={open}>
          Contact Us
        </button>
      )}
      {show && (
        <div>
          <form className={style.formcontainer} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                name="Name"
                className={style.form}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="Email"
                className={style.form}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Subject">Subject</label>
              <input
                type="text"
                name="Subject"
                className={style.textarea}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Message">Message</label>
              <input
                type="text"
                name="Message"
                className={style.textarea}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Upload File</label>
              <input
                type="file"
                name="UploadFile"
                className={style.upload}
                onChange={handleFileChange}
              />
            </div>
            <div>
              {
                <ReCAPTCHA
                  sitekey="6LeTcR0oAAAAAB5xaZpLwKKDjRfNKh62u2QgTOEx"
                  ref={captchaRef}
                />
              }
            </div>
            <div className={style.submit}>
              <button type="submit" value="submit">
                Submit
              </button>
              <button type="button" onClick={close}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactUsForm;

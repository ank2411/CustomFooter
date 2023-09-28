import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import uploadFile from "../Custom/graphql/uploadFile.graphql";
import ReCAPTCHA from "react-google-recaptcha";
import createDocument from "../Custom/graphql/postContact.graphql";
import style from "./contactUsFormStyles.css";
import getAppSettings from "../Custom/graphql/getCaptcha.graphql";
const ContactUsForm = () => {
  const [show, setShow] = useState(false);
  const [upload] = useMutation(uploadFile);
  const [save] = useMutation(createDocument);
  const [token, setToken] = useState("");
  const [recap, setrecap] = useState<any>();
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as any;
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
      fields: Object.keys(contact).map((key: string) => ({
        key,
        value: contact[key as keyof typeof contact],
      })),
    };
    try {
      console.log(object, "-------");

      const data = await save({
        variables: {
          document: object,
          schema: "CONTACTUS",
          dataEntity: "CONTACTUS",
          account: "trika",
          acronym: "AA",
        },
      });
      console.log("!!!!!!!!!!", data);
      if (data !== undefined) {
        setContact({
          Name: "",
          Email: "",
          Subject: "",
          Message: "",
          UploadFile: null,
        });
      }
      console.log("]]]]]]]]]]]");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecaptchaChange = (value: any) => {
    if (value) {
      console.log(value);
      setToken(value);
    }
  };
  const { data: appSettingsData } = useQuery(getAppSettings, {
    variables: {
      version: process.env.VTEX_APP_VERSION,
    },
    ssr: false,
  });

  useEffect(() => {
    const settings =
      appSettingsData &&
      JSON.parse(appSettingsData?.publicSettingsForApp?.message || "");

    setrecap(settings?.recaptchaKey);
    console.log("first", settings?.recaptchaKey, appSettingsData, recap);
  }, [appSettingsData]);
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
                value={contact.Name}
                className={style.form}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="Email"
                value={contact.Email}
                className={style.form}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Subject">Subject</label>
              <input
                type="text"
                name="Subject"
                value={contact.Subject}
                className={style.textarea}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Message">Message</label>
              <input
                type="text"
                name="Message"
                value={contact.Message}
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
              <ReCAPTCHA
                onChange={handleRecaptchaChange}
                sitekey={recap}
              />
            </div>
            <div className={style.submit}>
              <button type="submit" disabled={!token && !token.length}>
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

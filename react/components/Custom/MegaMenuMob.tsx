import React, { useState, useEffect } from "react";
import style from "./megaMenuStyles.css";

export type Item = {
  heading: string;
  secondLevel: Array<{
    displayMenu: string;
    href: string;
    secondLevelMenu: Array<{ third: string; href: string }>;
  }>;
};

const MegaMenuMob: StorefrontFunctionComponent = ({
  megaMenu,
}: {
  megaMenu: Item;
}) => {
  const [menu, setMenu] = useState<any>();
  const [select, setSelect] = useState<any>();
  const [second, setSecond] = useState<any>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMenu(megaMenu);
  }, [megaMenu]);

  const goBack = () => {
    if (second != null) {
      setSecond(null);
    } else if (select != null) {
      setSelect(null);
    } else {
      setShow(false);
    }
  };

  return (
    <div className={style.headerm}>
      <div
        className={style.button}
        style={{ display: show ? "none" : "block" }}
        onClick={() => setShow(!show)}
      >
        &#9776;{""}
      </div>

      {show && (
        <React.Fragment>
          <div className={style.navContainer}>
            <div
              className={style.back}
              onClick={() => {
                goBack();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <p>Go Back</p>
            </div>
            <div
              className={style.button2}
              onClick={() => {
                setShow(false);
                setSelect("");
                setSecond("");
              }}
            >
              &times;
            </div>
          </div>
          {menu?.map((user: Item, index: number) => (
            <div style={{ width: "100%" }}>
              <div className={style.heading}>
                <h4 key={index} onClick={() => setSelect(user.heading)}>
                  {user.heading}
                </h4>
                {select !== user.heading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                )}
              </div>

              {select === user.heading && (
                <div className={style.menucontainer}>
                  <div key={index} className={style.menusubcontainer}>
                    <div style={{ width: "100%" }}>
                      {user.secondLevel?.map((item) => (
                        <>
                          <ul className={style.first}>
                            <li
                              onClick={() => setSecond(item?.displayMenu)}
                              className={style.drop}
                            >
                              <a href={item.href}>{item?.displayMenu}</a>
                              {second !== item?.displayMenu && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 320 512"
                                >
                                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                </svg>
                              )}
                            </li>
                          </ul>
                          {second !== item?.displayMenu && <hr />}

                          {second === item?.displayMenu &&
                            item.secondLevelMenu && (
                              <div className={style.subMenu}>
                                {item.secondLevelMenu.map(
                                  (subItem, subIndex) => (
                                    <div key={subIndex}>
                                      <a href={subItem.href}>
                                        {subItem?.third}
                                      </a>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {select !== user.heading && <hr />}
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

MegaMenuMob.schema = {
  title: "MegaMenu Mobile",
  description: " Mobile",
  type: "object",
  properties: {
    megaMenu: {
      type: "array",
      items: {
        properties: {
          heading: {
            title: "Menu Display Name",
            type: "string",
          },
          secondLevel: {
            type: "array",
            items: {
              properties: {
                displayMenu: {
                  type: "string",
                  title: "Menu Item ",
                },
                href: {
                  type: "string",
                  default: "#",
                  title: "Menu Link",
                },
                secondLevelMenu: {
                  type: "array",
                  title: "Sub Menu",
                  items: {
                    properties: {
                      third: {
                        type: "string",
                        title: "Third Menu   ",
                      },
                      href: {
                        type: "string",
                        default: "#",
                        title: "Menu Link",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default MegaMenuMob;

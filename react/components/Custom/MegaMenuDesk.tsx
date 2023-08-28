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

interface Menu {
  index: null | number;
  menu: Array<{
    third: string;
    href: string;
  }>;
}

const MegaMenuDesk: StorefrontFunctionComponent = ({megaMenu}: { megaMenu: Item;}) => {
  const [menu, setMenu] = useState<any>();
  const [select, setSelect] = useState<any>();
  const [second, setSecond] = useState<any>();
  const [secondLevel, setSecondLevel] = useState<Menu>({
    index: null,
    menu: [
      {
        third: "",
        href: "",
      },
    ],
  });
  useEffect(() => {
    setMenu(megaMenu);
  }, [megaMenu]);

  const handleFirstClick = (index: number) => {
    if (select == index) {
      setSelect(null);
     
    } else {
      setSelect(index);
    }
    setSecondLevel({ index: null, menu: [] });
  };

  const handleSecondClick = (
    index: number,
    menu: Array<{
      third: string;
      href: string;
    }>
  ) => {
    if (second == index) {
      setSecond(null);
      setSecondLevel({ index: null, menu: [] });
    } else {
      setSecond(index);
      setSecondLevel({ index: index, menu: menu });
    }
  };

  return (
    <div className={style.header}>
      {menu?.map((user: Item, index: number) => (
        <>
          <div className={style.bg}>
            <div onClick={() => handleFirstClick(index)}>
              <h4 key={index}>{user.heading}</h4>
            </div>
          </div>

          {select == index && user.secondLevel &&  user.secondLevel.length > 0  && (
            <div className={style.menucontainer}>
              <div key={index} className={style.menusubcontainer}>
                <div>
                {user.secondLevel?.map((item, index) => (
                  <ul className={style.first}>
                    <li onClick={() => handleSecondClick(index, item.secondLevelMenu) }
                      className={style.drop}
                    >
                      <a href={item.href}>{item?.displayMenu}</a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </li>
                  </ul>
                ))}
                </div>

                {second == secondLevel.index && secondLevel.menu && (
                  <div className={style.subMenu}>
                    {secondLevel.menu.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        <a href={subItem.href}>{subItem?.third}</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

MegaMenuDesk.schema = {
  title: "MegaMenu Desktop",
  description: " Desktop",
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

export default MegaMenuDesk;

import $ from "jquery";
import { useState } from "react";
import MasterlayoutContext from "./layoutContext";

const MasterLayoutState = (props) => {
  /// /////////////    Side Bar Secondary  Controle Function and States start here  //////////////////////////
  const [subMenuRecive, setsubMenuRecive] = useState("");
  const [titleSubmenu, setTitleSubmenu] = useState("");
  const [HasparentState, setHasparentState] = useState("");
  const [successMessageSupport, setsuccessMessageSupport] = useState("");

  const subMenueClickReciver = (
    titleberd = "",
    hasparent = false,
    displayMenuCondition = ""
  ) => {
    setHasparentState(hasparent);
    setsubMenuRecive(displayMenuCondition);
    setTitleSubmenu(titleberd);

    if (HasparentState) {
      const bodyObjcet = $("body");

      bodyObjcet.find(".menue-drawrCustom").show();

      bodyObjcet.find(".header").css({ left: "315px" });

      bodyObjcet.find(".content").css({ "margin-left": "245px" });
      $(".fsatollenav").attr("style", "display: block !important");
    } else {
      const bodyObjcet = $("body");

      bodyObjcet.find(".menue-drawrCustom").hide();
      bodyObjcet.find(".header").css({ left: "65px" });
      bodyObjcet.find(".content").css({ "margin-left": "0px" });
    }
  };
  /// /////////////    Side Bar Secondary  Controle Function and States End here  //////////////////////////

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <MasterlayoutContext.Provider
      value={{
        HasparentState,
        subMenuRecive,
        titleSubmenu,
        subMenueClickReciver,
        successMessageSupport,
        setsuccessMessageSupport,
      }}
    >
      {props.children}
    </MasterlayoutContext.Provider>
  );
};
export default MasterLayoutState;

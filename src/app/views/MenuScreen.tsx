import { getRules } from "../../api/db/read";
import { Rules } from "../../api/db/utils";
import { useState, useEffect } from "react";

const MenuScreen = () => {
  const [rules, setRules] = useState<Rules>([]);

  useEffect(() => {
    getRules(setRules);
  }, []);

  useEffect(() => {
    if (rules) {
      console.log(rules);
    }
  }, [rules]);
 return <div className="menu-screen">
   <h1>Menu Screen</h1>
  </div>;
};

export default MenuScreen;

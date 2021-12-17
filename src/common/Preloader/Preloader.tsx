import React from "react";
import preloader from "../../assets/valentines-icegif-5.gif";

export let Preloader = () => {
    const divContent = {
        backgroundImage: `url(${preloader})`,
    };
    return <div><img src={preloader}/></div>
}
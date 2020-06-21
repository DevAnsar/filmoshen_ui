import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faCompass,
//     faMapMarkerAlt,
//     faUser,
//     faShoppingCart,
//     faArchive,
//     faSign
// } from "@fortawesome/free-solid-svg-icons";

const navButtons = [
    {
        label: "فیلم های نشان شده",
        path: "/account",
        // icon: <FontAwesomeIcon icon={faArchive} />
        icon: 'fa-bookmark'
    },
    {
        label: "موزیک های نشان شده",
        path: "/account/music",
        // icon: <FontAwesomeIcon icon={faArchive} />
        icon: 'fa-bookmark'
    },
    {
        label: "فیلم های دیده شده",
        path: "/account/history",
        // icon: <FontAwesomeIcon icon={faMapMarkerAlt} />
        icon: ' fa-eye'
    },
    {
        label: "خرید اشتراک",
        path: "/packagelist",
        // icon: <FontAwesomeIcon icon={faShoppingCart} />
        icon: 'fa-clipboard'
    },
    {
        label: "ویرایش پروفایل",
        path: "/account/profile/edit",
        // icon: <FontAwesomeIcon icon={faUser} />
        icon: 'fa-user'
    },
    {
        label: "سوابق پرداخت",
        path: "/account/mypayments",
        // icon: <FontAwesomeIcon icon={faUser} />
        icon: 'fa-credit-card'
    },
    {
        label: "خروج",
        path: "/logout",
        // icon: <FontAwesomeIcon icon={faSign} />
        icon: 'fa-sad-tear'
    }
];

export default navButtons;
import Link from "next/link";
import {withRouter} from "next/router";
// import "./NavButton.scss";

const NavButton = props => (


        <Link href={props.path}>
            <a>
                <div className={` mt-3 w-100 f7 p-2 account_tab_item ${props.router.pathname === props.path ? "active" : ""} `} style={{}}>
                    {/*<div className="Icon">{props.icon}</div>*/}
                    <i className={`far  ml-1 ${props.icon}`}/>
                    <span className="Label">{props.label}</span>
                </div>
            </a>
        </Link>


);

export default withRouter(NavButton);
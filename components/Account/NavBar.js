// import "./NavBar.scss";
import NavButton from "./NavButton";

const NavBar = props => (

    <>
        {
            console.log('user',props.user)
        }
        <div className='avatar'>
            <img src={'/img/account.png'} className="img-fluid d-block mx-auto img-account"/>
        </div>

        <p className="text-center pt-2">{props.user.name}</p>
        <p className="text-center pt-2">
            {` اشتراک:`}
            {props.user.subscribe_days}
            {` روز`}
            </p>

        <div className="account_tab mt-3">
            {props.navButtons.map(button => (
                <NavButton
                    key={button.path}
                    path={button.path}
                    label={button.label}
                    icon={button.icon}
                />
            ))}

        </div>
    </>
);

export default NavBar;
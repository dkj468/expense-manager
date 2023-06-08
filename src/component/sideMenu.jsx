import { NavLink } from "react-router-dom";
import classes from "./sideMenu.module.css";

const SideMenu = () => {
    return (
        <nav className={classes.sidemenu}>
            <div className={classes['menu-wrapper']}>
                <NavLink to="/" className={classes.item}>Dashboard</NavLink>
                <NavLink to="/" className={classes.item}>Expenses</NavLink>
                <NavLink to="/" className={classes.item}>Expense Accounts</NavLink>
                <NavLink to="/" className={classes.item}>Expense Category</NavLink>
                <NavLink to="/" className={classes.item}>Profile</NavLink>
                <NavLink to="/" className={classes.item + ' ' + classes['last-item']}>Logout</NavLink>

                {/* <li><a>Dashboard</a></li>
                <li><a>Expenses</a></li>
                <li><a>Expense Account</a></li>
                <li>Expense Category</li>
                <li>Profile</li>
                <li>Logout</li> */}

            </div>
        </nav>
    )
}

export default SideMenu;
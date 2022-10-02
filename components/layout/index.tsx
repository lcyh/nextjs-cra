import { FC, PropsWithChildren } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, NavBar } from "../navbar/index";
import styles from "./styles.module.scss";

export interface ILayoutProps {
    navbarData: INavBarProps;
    footerData: IFooterProps;
}
type layoutProps = PropsWithChildren<ILayoutProps>

export const Layout: FC<layoutProps> = ({
    navbarData,
    footerData,
    children,
}) => {
    return (
        <div className={styles.layout}>
            <NavBar {...navbarData} />
            <main className={styles.main}>{children}</main>
            <Footer {...footerData} />
        </div>
    )
}
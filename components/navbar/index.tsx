import { FC, useContext } from 'react'
import Image from 'next/image'
import logoLight from '@/public/logo_light.png'
import styles from './styles.module.scss'
import { ThemeContext } from '@/stores/theme'
import { Themes } from '@/constants/enum'
export interface INavBarProps {

}

export const NavBar: FC<INavBarProps> = ({ }) => {
    const { setTheme } = useContext(ThemeContext)
    return (
        <div className={styles.navBar}>
            <a href="http://localhost:3000/">
                <div className={styles.logoIcon}></div>
            </a>
            <div className={styles.themeArea}>
                <div
                    className={styles.themeIcon}
                    onClick={
                        () => {
                            if (localStorage.getItem('theme') === Themes.light) {
                                setTheme(Themes.dark)
                            } else {
                                setTheme(Themes.light)
                            }
                        }
                    }
                >
                </div>
            </div>
        </div>
    );
};
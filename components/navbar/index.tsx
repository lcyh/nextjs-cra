import { FC, useContext, useRef } from 'react'
import Image from 'next/image'
import logoLight from '@/public/logo_light.png'
import styles from './styles.module.scss'
import { ThemeContext } from '@/stores/theme'
import { UserAgentContext } from '@/stores/userAgent'
import { Environment, Themes } from '@/constants/enum'
import { IPopupRef, Popup } from '../popup'
export interface INavBarProps { }

export const NavBar: FC<INavBarProps> = ({ }) => {
    const { setTheme } = useContext(ThemeContext)
    const { userAgent } = useContext(UserAgentContext)
    const popupRef = useRef<IPopupRef>(null);
    return (
        <div className={styles.navBar}>
            <a href="http://localhost:3000/">
                <div className={styles.logoIcon}></div>
            </a>
            <div
                className={styles.popupText}
                onClick={(): void => {
                    popupRef.current?.open();
                }}
            >
                弹窗示范
            </div>
            <div className={styles.themeArea}>
                {
                    userAgent === Environment.pc && (
                        <span className={styles.text}>当前是PC端样式</span>
                    )
                }
                {
                    userAgent === Environment.ipad && (
                        <span className={styles.text}>当前是Ipad端样式</span>
                    )
                }
                {
                    userAgent === Environment.mobile && (
                        <span className={styles.text}>当前是移动端样式</span>
                    )
                }
            </div>
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
                <Popup ref={popupRef}>
                    <div>这是一个弹窗</div>
                </Popup>
            </div>
        </div>
    );
};
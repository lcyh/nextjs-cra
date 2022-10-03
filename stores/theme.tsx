import React, { FC, useState, useEffect, createContext, PropsWithChildren } from "react";
import { Themes } from "@/constants/enum";

export interface IThemeContextProps {
    theme: Themes,
    setTheme: (value: Themes) => void
}
export const ThemeContext = createContext({} as IThemeContextProps)

type IProps = PropsWithChildren

export const ThemeContextProvider: FC<IProps> = ({ children }) => {
    // 监听本地缓存来同步不同页面间的主题
    const [theme, setTheme] = useState<Themes>(Themes.light);
    useEffect(() => {
        const checkTheme = () => {
            const item = (localStorage.getItem("theme") as Themes) || Themes.light;
            setTheme(item)
            document.getElementsByTagName("html")[0].dataset.theme = item;
        }
        checkTheme()
        window.addEventListener("storage", checkTheme);
        return (): void => {
            window.removeEventListener("storage", checkTheme);
        };
    }, [])
    return <ThemeContext.Provider value={{
        theme,
        setTheme: (currentTheme) => {
            setTheme(currentTheme);
            localStorage.setItem('theme', currentTheme)
            document.getElementsByTagName('html')[0].dataset.theme = currentTheme
        }
    }}>
        {children}
    </ThemeContext.Provider>
}
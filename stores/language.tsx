import React, { FC, useState, createContext, useContext, useEffect } from "react";
import { Language } from '@/constants/enum'
interface ILanguageContextProps {
    language: Language;
    setLanguage: (language: Language) => void;
}
export const LanguageContext = createContext<ILanguageContextProps>({} as ILanguageContextProps);

type IProps = {
    children: JSX.Element
}
export const LanguageContextProvider: FC<IProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(Language.ch)
    useEffect(() => {
        const checkLanguage = () => {
            const item = (localStorage.getItem('language') as Language) || Language.ch;
            setLanguage(item);
        }
        checkLanguage()
        window.addEventListener('storage', checkLanguage)
        return () => {
            window.removeEventListener('storage', checkLanguage)
        }
    }, [])
    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: (language) => {
                setLanguage(language);
                localStorage.setItem('language', language)
            }
        }}>
            {children}
        </LanguageContext.Provider>
    )
}
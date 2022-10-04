import React, { FC, useEffect, useContext, createContext, useState } from 'react'
import { Environment } from '@/constants/enum'

export interface IUserAgentContextProps {
    userAgent: Environment
}
export const UserAgentContext = createContext<IUserAgentContextProps>({} as IUserAgentContextProps)

interface IProps {
    children: JSX.Element
}
export const UserAgentProvider: FC<IProps> = ({ children }) => {
    const [userAgent, setUserAgent] = useState<Environment>(Environment.none) // 服务器渲染初始化渲染未必是预期效果，none缓冲切换视觉)
    // 监听本地缓存来同步不同页面间的主题（当前页面无法监听到，直接在顶部栏进行了类的切换)
    const bodyWidth = typeof document !== 'undefined' && document.body.offsetWidth
    useEffect(() => {
        const checkUserAgent = () => {
            const width = document.body.offsetWidth;
            if (width < 768) {
                setUserAgent(Environment.mobile)
            } else if (width >= 768 && width < 1200) {
                setUserAgent(Environment.ipad)
            } else if (width >= 1200) {
                setUserAgent(Environment.pc)
            } else {
                setUserAgent(Environment.none) // 增加none类型来缓冲默认类型样式切换时的视觉突变
            }
        }
        checkUserAgent();
        window.addEventListener('resize', checkUserAgent);// 监听屏幕宽度变化，及时适配当前页面样式
        return () => {
            window.removeEventListener('resize', checkUserAgent)
        }
    }, [bodyWidth])
    return (
        <UserAgentContext.Provider value={{ userAgent }}>
            {children}
        </UserAgentContext.Provider>
    )
}
import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo, useContext } from 'react'
import styles from "./styles.module.scss";
import cName from 'classnames';
import ReactDOM from 'react-dom';
import { UserAgentContext } from '@/stores/userAgent';
import { Environment } from '@/constants/enum';

export interface IPopupRef {
    open: () => void
}
interface IProps {
    children: JSX.Element
}
export const Popup = forwardRef<IPopupRef, IProps>((props, ref) => {
    const { children } = props
    const [visible, setVisible] = useState(false);
    const [enter, setEnter] = useState(false);
    const [leave, setLeave] = useState(false);
    const { userAgent } = useContext(UserAgentContext)
    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setEnter(true);
                setVisible(true);
                setTimeout((): void => {
                    setEnter(false);
                }, 300);
            }
        }
    })
    const maskClass = useMemo(() => {
        return userAgent === Environment.mobile ? "forbidScroll" : 'pcForbidScroll'
    }, [userAgent])
    useEffect(() => {
        document.body.className = visible ? maskClass : "";
        let timer;
        if (visible) {
            setEnter(true)
            timer = setTimeout(() => {
                setEnter(false)
            }, 300);
        } else {
            setLeave(true)
            timer = setTimeout(() => {
                setLeave(false)
            }, 300);
        }
        return () => {
            clearTimeout(timer)
        }
    }, [visible, maskClass]);

    const renderDom = visible ? (
        <div className={cName({
            [styles.popup]: true,
            [styles.enter]: enter,
            [styles.leave]: leave,
        })}>
            <div className={styles.mask} />
            <div className={styles.popupContent}>
                <div
                    className={styles.closeBtn}
                    onClick={(): void => {
                        setVisible(false);
                    }}
                />
                {children}
            </div>
        </div>
    ) : <></>;
    return typeof document !== "undefined"
        ? ReactDOM.createPortal(renderDom, document.body)
        : renderDom;
})
Popup.displayName = 'Popup'
// function ForwardRef(props, ref) {
//     return <Popup {...props} forwardRef={ref} />
// }

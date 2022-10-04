import type { NextPage } from 'next'
import { useContext, useRef, useEffect, useState } from 'react';
import cName from "classnames";
import styles from './index.module.scss'
import { ThemeContext } from '@/stores/theme';
import { Pagination } from '@douyinfe/semi-ui'
import axios from 'axios';
import { CMSDOMAIN, LOCALDOMAIN } from '@/utils';

interface IArticleItem {
    label: string;
    info: string;
    link: string;
    articleId: number
}

interface IProps {
    title: string;
    description: string;
    articles: IContentProps
}
type IContentProps = {
    list: IArticleItem[];
    total: number
}
// 首页 - 默认的 index.tsx
const Home: NextPage<IProps> = ({ title, description, articles }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { theme } = useContext(ThemeContext);
    const [content, setContent] = useState<IContentProps>(articles as IContentProps)
    useEffect(() => {
        mainRef.current?.classList.remove(styles.withAnimation)
        window.requestAnimationFrame(() => {
            mainRef.current?.classList.add(styles.withAnimation)
        })
    }, [theme])
    return (
        <div className={styles.container}>
            <main className={cName([styles.main, styles.withAnimation])} ref={mainRef}>
                <h1 className={styles.title}>{title}</h1>

                <p className={styles.description}>{description}</p>

                <div className={styles.grid}>
                    {content?.list?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.card}
                                onClick={(): void => {
                                    window.open(
                                        item.link,
                                        "blank",
                                        "noopener=yes,noreferrer=yes"
                                    );
                                }}
                            >
                                <h2>{item.label} &rarr;</h2>
                                <p>{item.info}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.paginationArea}>
                    <Pagination
                        total={content?.total}
                        pageSize={6}
                        onPageChange={(pageNo) => {
                            axios.post(`${LOCALDOMAIN}/api/articleIntro`,
                                {
                                    pageNo,
                                    pageSize: 6,
                                }).then(({ data }) => {
                                    setContent({
                                        list: data.list.map((item: IArticleItem) => {
                                            return {
                                                ...item,
                                                link: `${LOCALDOMAIN}/article/${item.articleId}`
                                            }
                                        }),
                                        total: data.total,
                                    })
                                })
                        }
                        }
                    />
                </div>
            </main>
        </div>
    );
};
Home.getInitialProps = async (context) => {
    const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/home`)
    const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/articleIntro`,
        {
            pageNo: 1,
            pageSize: 6,
        })
    return {
        title: homeData.title,
        description: homeData.description,
        articles: {
            list: articleData.list.map((item: IArticleItem) => {
                return {
                    ...item,
                    link: `${LOCALDOMAIN}/article/${item.articleId}`
                }
            }),
            total: articleData.total,
        },
    };
};
export default Home

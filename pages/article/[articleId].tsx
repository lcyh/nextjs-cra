import { LOCALDOMAIN } from "@/utils";
import axios from "axios";
import { NextPage } from "next";
import styles from './styles.module.scss'
import showdown from 'showdown'
/**
 * Nextjs 的文件约定式路由
 ./pages/home/index.tsx => /home
 ./pages/demo/[id].tsx => /demo/:id
 */
interface IProps {
    title: string,
    author: string,
    description: string,
    createTime: string,
    content: string,
}
const Article: NextPage<IProps> = ({
    title,
    author,
    description,
    createTime,
    content,
}) => {
    const converter = new showdown.Converter()
    return (
        <div className={styles.article}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>
                作者：{author} | 创建时间: {createTime}
            </div>
            <div className={styles.description}>{description}</div>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
        </div>
    );
};
Article.getInitialProps = async (context) => {
    const { articleId } = context.query;
    const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
        params: { articleId }
    })
    return data
};

export default Article;
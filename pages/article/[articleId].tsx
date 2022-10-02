import { NextPage } from "next";

/**
 * Nextjs 的文件约定式路由
 ./pages/home/index.tsx => /home
 ./pages/demo/[id].tsx => /demo/:id
 */
interface IProps {
    articleId: number;
}
const Article: NextPage<IProps> = ({ articleId }) => {
    return (
        <div>
            <h1>文章{articleId}</h1>
        </div>
    );
};
Article.getInitialProps = (context) => {
    const { articleId } = context.query;
    return {
        articleId: Number(articleId),
    };
};

export default Article;
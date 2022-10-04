// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CMSDOMAIN } from "@/utils";
type Data = {
  title: string;
  description: string;
};

const getArticleInfoData = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { articleId } = req.query;
  axios.get(`${CMSDOMAIN}/api/article-infos/${articleId}`).then((result) => {
    const data = result.data;
    res.status(200).json(data);
  });
};

export default getArticleInfoData;

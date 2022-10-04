// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CMSDOMAIN } from "@/utils";
import nextConnect from "next-connect";

type Data = {
  title: string;
  description: string;
};

const getHomeData = nextConnect().get(
  (req: NextApiRequest, res: NextApiResponse<Data>) => {
    axios.get(`${CMSDOMAIN}/api/homes`).then((result) => {
      const { title, description } = result.data;
      res.status(200).json({ title, description });
    });
  }
);

export default getHomeData;

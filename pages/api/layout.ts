import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ILayoutProps } from "../../components/layout";
import { CMSDOMAIN } from "@/utils";
import { isEmpty } from "lodash";
import nextConnect from "next-connect";

// 调用 http://localhost:3000/api/layout
//BFF 将 cms数据座层过滤包装 axios
const getLayoutData = nextConnect()
  // .use(any middleware)
  .get((req: NextApiRequest, res: NextApiResponse<ILayoutProps>) => {
    axios.get(`${CMSDOMAIN}/api/layouts`).then((result) => {
      const {
        copy_right,
        link_lists,
        public_number,
        qr_code,
        qr_code_image,
        site_number,
        title,
      } = result.data || {};

      res.status(200).json({
        navbarData: {},
        footerData: {
          title,
          linkList: link_lists?.data?.map((item: any) => {
            return {
              title: item.title,
              list: item?.links?.data?.map((_item: any) => {
                return {
                  label: _item.label,
                  link: isEmpty(_item.link) ? "" : _item.link,
                };
              }),
            };
          }),
          qrCode: {
            image: `${CMSDOMAIN}${qr_code_image.data.url}`,
            text: qr_code,
          },
          copyRight: copy_right,
          siteNumber: site_number,
          publicNumber: public_number,
        },
      });
    });
  });

export default getLayoutData;

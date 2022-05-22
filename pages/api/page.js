const {Client} = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(req, res) {
  const {id: blockId} = req.query;

  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  res.status(200).json(response);
}

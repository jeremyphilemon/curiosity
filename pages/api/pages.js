const {Client} = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(req, res) {
  const databaseId = 'f540057b355a4e9e89d68bd507903337';

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'date',
        direction: 'ascending',
      },
    ],
  });

  res.status(200).json(response);
}

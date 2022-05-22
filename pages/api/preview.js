const handler = async (req, res) => {
  res.setPreviewData({});
  res.status(200).json({message: 'preview mode enabled'});
};

export default handler;

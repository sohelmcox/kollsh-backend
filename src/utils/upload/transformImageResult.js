const transformImageResult = (data) => {
  const {
    asset_id,
    public_id,
    width,
    height,
    folder,
    resource_type,
    format,
    bytes: size,
    secure_url: url,
  } = data;
  return {
    asset_id,
    public_id,
    width,
    height,
    folder,
    resource_type,
    format,
    size,
    url,
  };
};

module.exports = transformImageResult;

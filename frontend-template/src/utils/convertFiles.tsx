const convertFiles = async (fileList: any) => {
  return await Promise.all(
    fileList.map(async (file: any) => {
      return { name: file.name, content: await toBase64(file) };
    })
  );
};

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error: any) => reject(error);
  });

export default convertFiles;

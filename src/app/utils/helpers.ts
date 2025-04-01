const handleDownload = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;


export { handleDownload, strictEmailRegex };

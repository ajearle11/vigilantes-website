const useNavigateToUrl = (url: string, newTab: boolean = true) => {
  return (e: React.MouseEvent<HTMLButtonElement> |  React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (newTab) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };
};

export default useNavigateToUrl;

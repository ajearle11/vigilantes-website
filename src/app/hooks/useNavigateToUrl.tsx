const useNavigateToUrl = (url: string, newTab: boolean = true) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      newTab ? window.open(url, "_blank") : (window.location.href = url);
    };
  };
  
  export default useNavigateToUrl;
  
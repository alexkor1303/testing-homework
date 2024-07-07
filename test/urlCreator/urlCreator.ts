export const urlFullPath = (page: string) => {
  let url = "";
  const basename = "http://localhost:3000/hw/store";
  const bugID = "10";

  url += basename + page;

  !!bugID && (url += `?bug_id=${bugID}`);

  return url;
};
//1,2,9
//1,2,3,4 в юнитах,5,6,7,8,10
// const btnSizeClass = process.env.BUG_ID !== '9' ? 'btn-lg' : 'btn-sm'; (каталог)

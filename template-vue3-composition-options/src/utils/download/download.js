export const download = ({ url, filename }) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = filename;
  a.target = '_blank';
  a.click();
  a.remove();
};

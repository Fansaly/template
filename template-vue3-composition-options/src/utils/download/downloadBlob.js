export const downloadBlob = ({ blob, filename }) => {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
};

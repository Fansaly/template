export const downloadBlob = ({ blob, filename }: { blob: Blob; filename: string }) => {
  if ((window.navigator as any).msSaveBlob) {
    (window.navigator as any).msSaveBlob(blob, filename);
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

export const handleFilterOpening = (id, studentArray) => {
  return studentArray.map((item) =>
    item.id === id ? { ...item, open: !item.open } : item
  );
};

export const calculateGrades = (gradesArray) => {
  if (!gradesArray || gradesArray.length === 0) return 0;
  let sum = 0;

  for (var i = 0; i < gradesArray?.length; i++) {
    sum += parseInt(gradesArray[i], 10);
  }

  const avg = sum / gradesArray.length;
  return avg.toFixed(2);
};

export const addTag = (id, tagName, studentArray) => {
  return studentArray.map((item) =>
    item.id === id ? { ...item, tags: [...item.tags, tagName] } : item
  );
};

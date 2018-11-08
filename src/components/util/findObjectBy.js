export default function findObjectBy(myObject, myCriteria) {
  return myObject.filter(obj =>
    Object.keys(myCriteria).every(c => obj[c] == myCriteria[c])
  );
}

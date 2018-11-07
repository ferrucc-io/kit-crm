export default function findObjectBy(my_object, my_criteria) {
  return my_object.filter(obj =>
    Object.keys(my_criteria).every(c => obj[c] == my_criteria[c])
  );
}

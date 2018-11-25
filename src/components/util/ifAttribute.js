export default function ifAttribute(attribute) {
  if (attribute == '' || attribute === undefined || attribute === null) {
    return false;
  }
  return true;
}

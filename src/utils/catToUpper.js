export default function catToUpper(cat) {
  return cat.length === 2
    ? cat.toUpperCase()
    : cat.charAt(0).toUpperCase() + cat.slice(1);
}

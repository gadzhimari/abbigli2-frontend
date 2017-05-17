export default (name, object) => {
  if (!object[name]) return () => null;

  return object[name];
};
